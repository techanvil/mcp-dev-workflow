import { filterNodesByType } from "../utils/common.js";

export class FigmaAssetsModule {
  constructor(auth) {
    this.auth = auth;
  }

  /**
   * Get Figma assets tools for MCP server
   */
  getTools() {
    return [
      {
        name: "export_figma_assets",
        description:
          "Export assets (images, icons, components) from a Figma file",
        inputSchema: {
          type: "object",
          properties: {
            file_key: {
              type: "string",
              description: "Figma file key or URL",
            },
            node_ids: {
              type: "array",
              items: { type: "string" },
              description:
                "Specific node IDs to export (optional - if not provided, will find exportable assets)",
            },
            format: {
              type: "string",
              enum: ["jpg", "png", "svg", "pdf"],
              description: "Export format",
              default: "png",
            },
            scale: {
              type: "number",
              enum: [1, 2, 3, 4],
              description: "Export scale factor",
              default: 1,
            },
            asset_type: {
              type: "string",
              enum: ["components", "icons", "images", "frames"],
              description: "Type of assets to export",
              default: "components",
            },
            max_assets: {
              type: "number",
              description: "Maximum number of assets to export",
              default: 10,
            },
          },
          required: ["file_key"],
        },
      },
    ];
  }

  /**
   * Export assets from a Figma file
   */
  async exportAssets(args) {
    const {
      file_key,
      node_ids,
      format = "png",
      scale = 1,
      asset_type = "components",
      max_assets = 10,
    } = args;
    const fileKey = this.auth.extractFileKey(file_key);

    try {
      let targetNodeIds = node_ids;

      // If no specific node IDs provided, find assets to export
      if (!targetNodeIds || targetNodeIds.length === 0) {
        targetNodeIds = await this.findExportableAssets(
          fileKey,
          asset_type,
          max_assets
        );
      }

      if (targetNodeIds.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `# Asset Export

No ${asset_type} found to export in this file.`,
            },
          ],
        };
      }

      // Limit the number of assets to prevent overwhelming requests
      const limitedNodeIds = targetNodeIds.slice(0, max_assets);

      // Get export URLs from Figma
      const exportResponse = await this.auth.makeRequest(
        `/images/${fileKey}?ids=${limitedNodeIds.join(
          ","
        )}&format=${format}&scale=${scale}`
      );

      if (
        !exportResponse.images ||
        Object.keys(exportResponse.images).length === 0
      ) {
        return {
          content: [
            {
              type: "text",
              text: `# Asset Export

Failed to generate export URLs. The assets might not be exportable or there was an API error.`,
            },
          ],
        };
      }

      // Get node information for context
      const nodeResponse = await this.auth.makeRequest(
        `/files/${fileKey}/nodes?ids=${limitedNodeIds.join(",")}`
      );
      const nodes = nodeResponse.nodes || {};

      let content = `# Figma Asset Export

Successfully generated export URLs for ${
        Object.keys(exportResponse.images).length
      } asset(s):

**Format:** ${format.toUpperCase()}
**Scale:** ${scale}x
**Type:** ${asset_type}

## Assets

`;

      Object.entries(exportResponse.images).forEach(
        ([nodeId, imageUrl], index) => {
          const node = nodes[nodeId]?.document;
          const nodeName = node?.name || `Asset ${index + 1}`;

          content += `### ${index + 1}. ${nodeName}

**Node ID:** ${nodeId}
**Type:** ${node?.type || "Unknown"}
`;

          if (node?.absoluteBoundingBox) {
            const box = node.absoluteBoundingBox;
            content += `**Size:** ${Math.round(box.width)} × ${Math.round(
              box.height
            )}\n`;
          }

          if (imageUrl) {
            content += `**Download URL:** [${nodeName}.${format}](${imageUrl})

> **Note:** Download URLs are temporary and expire after a short time. Save the assets immediately.

`;
          } else {
            content += `**Status:** Export failed for this asset\n\n`;
          }

          content += "---\n\n";
        }
      );

      content += `## Usage Instructions

1. **Download immediately:** The URLs above are temporary and will expire
2. **Save locally:** Right-click the download links and save the files
3. **Batch download:** Use a download manager for multiple assets
4. **File naming:** Use the suggested filenames for consistency

## Export Details

- **Total assets processed:** ${limitedNodeIds.length}
- **Successful exports:** ${
        Object.keys(exportResponse.images).filter(
          (id) => exportResponse.images[id]
        ).length
      }
- **Failed exports:** ${
        Object.keys(exportResponse.images).filter(
          (id) => !exportResponse.images[id]
        ).length
      }
`;

      return {
        content: [
          {
            type: "text",
            text: content,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to export Figma assets: ${error.message}`);
    }
  }

  /**
   * Find exportable assets in a Figma file based on type
   */
  async findExportableAssets(fileKey, assetType, maxAssets) {
    try {
      const fileResponse = await this.auth.makeRequest(`/files/${fileKey}`);
      const document = fileResponse.document;

      if (!document.children) {
        return [];
      }

      let candidates = [];

      switch (assetType) {
        case "components":
          candidates = [
            ...filterNodesByType(document.children, "COMPONENT"),
            ...filterNodesByType(document.children, "COMPONENT_SET"),
          ];
          break;

        case "icons":
          // Look for small components or frames that might be icons
          const allNodes = this.getAllNodes(document.children);
          candidates = allNodes.filter((node) => {
            if (node.type === "COMPONENT" || node.type === "FRAME") {
              const box = node.absoluteBoundingBox;
              if (box && box.width <= 100 && box.height <= 100) {
                // Likely an icon based on size
                return true;
              }
            }
            return false;
          });
          break;

        case "images":
          // Look for nodes with image fills
          const imageNodes = this.getAllNodes(document.children);
          candidates = imageNodes.filter((node) => {
            if (node.fills && Array.isArray(node.fills)) {
              return node.fills.some((fill) => fill.type === "IMAGE");
            }
            return false;
          });
          break;

        case "frames":
          candidates = filterNodesByType(document.children, "FRAME");
          break;

        default:
          // Default to components
          candidates = [
            ...filterNodesByType(document.children, "COMPONENT"),
            ...filterNodesByType(document.children, "FRAME"),
          ];
      }

      // Sort by name and take the first maxAssets
      candidates.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

      return candidates.slice(0, maxAssets).map((node) => node.id);
    } catch (error) {
      console.error("Error finding exportable assets:", error.message);
      return [];
    }
  }

  /**
   * Get all nodes recursively from a tree
   */
  getAllNodes(nodes) {
    const result = [];

    function traverse(nodeList) {
      if (!Array.isArray(nodeList)) return;

      nodeList.forEach((node) => {
        result.push(node);
        if (node.children) {
          traverse(node.children);
        }
      });
    }

    traverse(nodes);
    return result;
  }
}
