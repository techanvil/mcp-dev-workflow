import { formatDate, searchNodes } from "../utils/common.js";

export class FigmaFilesModule {
  constructor(auth) {
    this.auth = auth;
  }

  /**
   * Get Figma files tools for MCP server
   */
  getTools() {
    return [
      {
        name: "get_figma_file",
        description: "Get details and content of a Figma file",
        inputSchema: {
          type: "object",
          properties: {
            file_key: {
              type: "string",
              description: "Figma file key or URL",
            },
            include_document: {
              type: "boolean",
              description: "Include document structure in response",
              default: true,
            },
            depth: {
              type: "number",
              description: "Maximum depth to traverse in document tree",
              default: 3,
            },
          },
          required: ["file_key"],
        },
      },
      {
        name: "get_figma_comments",
        description: "Get comments from a Figma file",
        inputSchema: {
          type: "object",
          properties: {
            file_key: {
              type: "string",
              description: "Figma file key or URL",
            },
          },
          required: ["file_key"],
        },
      },
      {
        name: "search_figma_layers",
        description: "Search for layers or frames within a Figma file",
        inputSchema: {
          type: "object",
          properties: {
            file_key: {
              type: "string",
              description: "Figma file key or URL",
            },
            search_term: {
              type: "string",
              description: "Term to search for in layer names and text content",
            },
            node_type: {
              type: "string",
              description: "Filter by specific node type (optional)",
              enum: [
                "FRAME",
                "GROUP",
                "TEXT",
                "RECTANGLE",
                "ELLIPSE",
                "COMPONENT",
                "INSTANCE",
              ],
            },
            case_sensitive: {
              type: "boolean",
              description: "Whether search should be case sensitive",
              default: false,
            },
          },
          required: ["file_key", "search_term"],
        },
      },
    ];
  }

  /**
   * Get Figma file details and content
   */
  async getFile(args) {
    const { file_key, include_document = true, depth = 3 } = args;
    const fileKey = this.auth.extractFileKey(file_key);

    try {
      // Get file metadata
      const fileResponse = await this.auth.makeRequest(`/files/${fileKey}`);
      const file = fileResponse.document;

      let content = `# Figma File: ${fileResponse.name}

**File Key:** ${fileKey}
**Last Modified:** ${formatDate(fileResponse.lastModified)}
**Version:** ${fileResponse.version}
**Thumbnail:** ${fileResponse.thumbnailUrl || "Not available"}

## File Information
- **Pages:** ${file.children?.length || 0}
- **Role:** ${fileResponse.role || "viewer"}
- **Editor Type:** ${fileResponse.editorType || "design"}
`;

      if (include_document && file.children) {
        content += "\n## Document Structure\n\n";
        content += this.formatDocumentStructure(file.children, depth);
      }

      return {
        content: [
          {
            type: "text",
            text: content,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get Figma file: ${error.message}`);
    }
  }

  /**
   * Get comments from a Figma file
   */
  async getComments(args) {
    const { file_key } = args;
    const fileKey = this.auth.extractFileKey(file_key);

    try {
      const response = await this.auth.makeRequest(
        `/files/${fileKey}/comments`
      );
      const comments = response.comments || [];

      if (comments.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `# Comments for Figma File

No comments found in this file.`,
            },
          ],
        };
      }

      let content = `# Comments for Figma File

Found ${comments.length} comment(s):

`;

      comments.forEach((comment, index) => {
        content += `## Comment ${index + 1}
**Author:** ${comment.user.handle}
**Created:** ${formatDate(comment.created_at)}
**Message:** ${comment.message}
`;

        if (comment.client_meta && comment.client_meta.node_id) {
          content += `**Node:** ${comment.client_meta.node_id}\n`;
        }

        if (comment.client_meta && comment.client_meta.node_offset) {
          const offset = comment.client_meta.node_offset;
          content += `**Position:** x: ${offset.x}, y: ${offset.y}\n`;
        }

        content += "\n---\n\n";
      });

      return {
        content: [
          {
            type: "text",
            text: content,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get Figma comments: ${error.message}`);
    }
  }

  /**
   * Search for layers within a Figma file
   */
  async searchLayers(args) {
    const { file_key, search_term, node_type, case_sensitive = false } = args;
    const fileKey = this.auth.extractFileKey(file_key);

    try {
      const fileResponse = await this.auth.makeRequest(`/files/${fileKey}`);
      const document = fileResponse.document;

      if (!document.children) {
        return {
          content: [
            {
              type: "text",
              text: "No content found in the Figma file.",
            },
          ],
        };
      }

      // Search through all nodes
      const results = searchNodes(document.children, search_term, {
        includeType: true,
        includeText: true,
        caseSensitive,
      });

      // Filter by node type if specified
      const filteredResults = node_type
        ? results.filter((node) => node.type === node_type)
        : results;

      if (filteredResults.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `# Search Results

No layers found matching "${search_term}"${
                node_type ? ` of type ${node_type}` : ""
              }.`,
            },
          ],
        };
      }

      let content = `# Search Results for "${search_term}"

Found ${filteredResults.length} matching layer(s)${
        node_type ? ` of type ${node_type}` : ""
      }:

`;

      filteredResults.forEach((node, index) => {
        content += `## ${index + 1}. ${node.name || node.type}
**Type:** ${node.type}
**Path:** ${node.path.join(" → ")}
`;

        if (node.characters) {
          content += `**Text Content:** "${node.characters.substring(0, 100)}${
            node.characters.length > 100 ? "..." : ""
          }"\n`;
        }

        if (node.absoluteBoundingBox) {
          const box = node.absoluteBoundingBox;
          content += `**Position:** x: ${box.x}, y: ${box.y}\n`;
          content += `**Size:** ${box.width} × ${box.height}\n`;
        }

        if (node.fills && node.fills.length > 0) {
          const fills = node.fills.filter((fill) => fill.visible !== false);
          if (fills.length > 0) {
            content += `**Fills:** ${fills.length} fill(s)\n`;
          }
        }

        content += "\n---\n\n";
      });

      return {
        content: [
          {
            type: "text",
            text: content,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to search Figma layers: ${error.message}`);
    }
  }

  /**
   * Format document structure for display
   */
  formatDocumentStructure(nodes, maxDepth, currentDepth = 0) {
    if (currentDepth >= maxDepth) {
      return "";
    }

    let structure = "";
    const indent = "  ".repeat(currentDepth);

    nodes.forEach((node) => {
      structure += `${indent}- **${node.name || node.type}** (${node.type})`;

      if (node.absoluteBoundingBox) {
        const box = node.absoluteBoundingBox;
        structure += ` - ${Math.round(box.width)}×${Math.round(box.height)}`;
      }

      if (node.characters) {
        structure += ` - "${node.characters.substring(0, 50)}${
          node.characters.length > 50 ? "..." : ""
        }"`;
      }

      structure += "\n";

      if (
        node.children &&
        node.children.length > 0 &&
        currentDepth < maxDepth - 1
      ) {
        structure += this.formatDocumentStructure(
          node.children,
          maxDepth,
          currentDepth + 1
        );
      }
    });

    return structure;
  }
}
