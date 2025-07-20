import { google } from "googleapis";
import { GoogleWorkspaceAuth } from "../utils/auth.js";

export class GoogleDocsModule {
  constructor(auth) {
    this.auth = auth;
    this.docs = null;
  }

  async initialize() {
    const authClient = await this.auth.getAuth();
    this.docs = google.docs({ version: "v1", auth: authClient });
  }

  /**
   * Get Google Docs tools for MCP server
   */
  getTools() {
    return [
      {
        name: "get_google_doc",
        description: "Read and extract content from a Google Doc",
        inputSchema: {
          type: "object",
          properties: {
            document_id: {
              type: "string",
              description: "Google Docs document ID or URL",
            },
            format: {
              type: "string",
              enum: ["plain", "markdown", "structured"],
              description: "Output format for the document content",
              default: "structured",
            },
          },
          required: ["document_id"],
        },
      },
      {
        name: "get_google_doc_metadata",
        description: "Get metadata and properties of a Google Doc",
        inputSchema: {
          type: "object",
          properties: {
            document_id: {
              type: "string",
              description: "Google Docs document ID or URL",
            },
          },
          required: ["document_id"],
        },
      },
      {
        name: "search_google_doc",
        description: "Search for text within a Google Doc",
        inputSchema: {
          type: "object",
          properties: {
            document_id: {
              type: "string",
              description: "Google Docs document ID or URL",
            },
            search_text: {
              type: "string",
              description: "Text to search for in the document",
            },
            context_lines: {
              type: "number",
              description:
                "Number of lines of context to include around matches",
              default: 2,
            },
          },
          required: ["document_id", "search_text"],
        },
      },
    ];
  }

  /**
   * Get a Google Doc's content
   */
  async getDocument({ document_id, format = "structured" }) {
    if (!this.docs) {
      await this.initialize();
    }

    try {
      const docId = GoogleWorkspaceAuth.extractDocumentId(document_id);
      const response = await this.docs.documents.get({
        documentId: docId,
      });

      const document = response.data;
      const content = this.extractContent(document, format);

      return {
        content: [
          {
            type: "text",
            text: `# ${document.title || "Untitled Document"}

**Document ID:** ${docId}
**Last Modified:** ${new Date(document.revisionId).toLocaleDateString()}
**URL:** https://docs.google.com/document/d/${docId}/

## Content

${content}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get document: ${error.message}`);
    }
  }

  /**
   * Get document metadata
   */
  async getDocumentMetadata({ document_id }) {
    if (!this.docs) {
      await this.initialize();
    }

    try {
      const docId = GoogleWorkspaceAuth.extractDocumentId(document_id);
      const response = await this.docs.documents.get({
        documentId: docId,
        fields: "title,documentId,revisionId,documentStyle",
      });

      const document = response.data;

      return {
        content: [
          {
            type: "text",
            text: `# Document Metadata

**Title:** ${document.title || "Untitled Document"}
**Document ID:** ${docId}
**Revision ID:** ${document.revisionId}
**URL:** https://docs.google.com/document/d/${docId}/

## Document Style
- **Page Size:** ${
              document.documentStyle?.pageSize?.width?.magnitude || "Unknown"
            } x ${
              document.documentStyle?.pageSize?.height?.magnitude || "Unknown"
            } ${document.documentStyle?.pageSize?.width?.unit || ""}
- **Margins:** Top: ${
              document.documentStyle?.marginTop?.magnitude || 0
            }, Bottom: ${document.documentStyle?.marginBottom?.magnitude || 0}

## Properties
- **Created:** ${new Date(document.revisionId).toLocaleDateString()}
- **Document Type:** Google Docs
- **Access:** Read-only via API`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get document metadata: ${error.message}`);
    }
  }

  /**
   * Search within a Google Doc
   */
  async searchDocument({ document_id, search_text, context_lines = 2 }) {
    if (!this.docs) {
      await this.initialize();
    }

    try {
      const docId = GoogleWorkspaceAuth.extractDocumentId(document_id);
      const response = await this.docs.documents.get({
        documentId: docId,
      });

      const document = response.data;
      const content = this.extractContent(document, "plain");
      const lines = content.split("\n");
      const matches = [];

      // Search for matches
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].toLowerCase().includes(search_text.toLowerCase())) {
          const start = Math.max(0, i - context_lines);
          const end = Math.min(lines.length, i + context_lines + 1);
          const contextLines = lines.slice(start, end);

          matches.push({
            lineNumber: i + 1,
            matchingLine: lines[i],
            context: contextLines.join("\n"),
          });
        }
      }

      if (matches.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `# Search Results for "${search_text}"

**Document:** ${document.title || "Untitled Document"}
**Document ID:** ${docId}

No matches found for "${search_text}".`,
            },
          ],
        };
      }

      const resultsText = matches
        .map(
          (match, index) =>
            `## Match ${index + 1} (Line ${match.lineNumber})

\`\`\`
${match.context}
\`\`\`

**Matching line:** ${match.matchingLine}

---`
        )
        .join("\n\n");

      return {
        content: [
          {
            type: "text",
            text: `# Search Results for "${search_text}"

**Document:** ${document.title || "Untitled Document"}
**Document ID:** ${docId}
**Matches Found:** ${matches.length}

${resultsText}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to search document: ${error.message}`);
    }
  }

  /**
   * Extract content from Google Docs document structure
   */
  extractContent(document, format) {
    if (!document.body || !document.body.content) {
      return "Document appears to be empty.";
    }

    let content = "";

    for (const element of document.body.content) {
      if (element.paragraph) {
        const paragraphText = this.extractParagraphText(
          element.paragraph,
          format
        );
        if (paragraphText.trim()) {
          content += paragraphText + "\n\n";
        }
      } else if (element.table) {
        content += this.extractTableText(element.table, format) + "\n\n";
      }
    }

    return content.trim();
  }

  /**
   * Extract text from a paragraph element
   */
  extractParagraphText(paragraph, format) {
    if (!paragraph.elements) {
      return "";
    }

    let text = "";
    let isHeading = false;
    let listLevel = null;

    // Check for heading style
    if (paragraph.paragraphStyle?.namedStyleType?.includes("HEADING")) {
      isHeading = true;
    }

    // Check for list item
    if (paragraph.bullet) {
      listLevel = paragraph.bullet.nestingLevel || 0;
    }

    // Extract text from elements
    for (const element of paragraph.elements) {
      if (element.textRun) {
        let elementText = element.textRun.content;

        if (format === "markdown" && element.textRun.textStyle) {
          const style = element.textRun.textStyle;
          if (style.bold) elementText = `**${elementText}**`;
          if (style.italic) elementText = `*${elementText}*`;
          if (style.underline) elementText = `<u>${elementText}</u>`;
        }

        text += elementText;
      }
    }

    // Format based on style
    if (format === "markdown") {
      if (isHeading) {
        const level = paragraph.paragraphStyle?.namedStyleType?.includes("1")
          ? "#"
          : paragraph.paragraphStyle?.namedStyleType?.includes("2")
          ? "##"
          : paragraph.paragraphStyle?.namedStyleType?.includes("3")
          ? "###"
          : "####";
        text = `${level} ${text}`;
      } else if (listLevel !== null) {
        const indent = "  ".repeat(listLevel);
        text = `${indent}- ${text}`;
      }
    } else if (format === "structured") {
      if (isHeading) {
        const level = paragraph.paragraphStyle?.namedStyleType?.includes("1")
          ? "# "
          : paragraph.paragraphStyle?.namedStyleType?.includes("2")
          ? "## "
          : paragraph.paragraphStyle?.namedStyleType?.includes("3")
          ? "### "
          : "#### ";
        text = `${level}${text}`;
      } else if (listLevel !== null) {
        const indent = "  ".repeat(listLevel);
        text = `${indent}• ${text}`;
      }
    }

    return text;
  }

  /**
   * Extract text from a table element
   */
  extractTableText(table, format) {
    if (!table.tableRows) {
      return "";
    }

    let tableText = "";

    if (format === "markdown") {
      // Markdown table format
      for (let rowIndex = 0; rowIndex < table.tableRows.length; rowIndex++) {
        const row = table.tableRows[rowIndex];
        let rowText = "|";

        if (row.tableCells) {
          for (const cell of row.tableCells) {
            const cellContent = this.extractTableCellText(cell);
            rowText += ` ${cellContent} |`;
          }
        }

        tableText += rowText + "\n";

        // Add separator after header row
        if (rowIndex === 0) {
          const separatorCells = row.tableCells?.length || 1;
          tableText += "|" + " --- |".repeat(separatorCells) + "\n";
        }
      }
    } else {
      // Plain text table format
      tableText += "**Table:**\n\n";
      for (const row of table.tableRows) {
        if (row.tableCells) {
          const cellTexts = row.tableCells.map((cell) =>
            this.extractTableCellText(cell)
          );
          tableText += cellTexts.join(" | ") + "\n";
        }
      }
    }

    return tableText;
  }

  /**
   * Extract text from a table cell
   */
  extractTableCellText(cell) {
    if (!cell.content) {
      return "";
    }

    let cellText = "";
    for (const element of cell.content) {
      if (element.paragraph) {
        cellText += this.extractParagraphText(element.paragraph, "plain");
      }
    }

    return cellText.trim().replace(/\n/g, " ");
  }
}
