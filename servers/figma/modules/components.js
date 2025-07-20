import {
  extractDesignTokens,
  filterNodesByType,
  formatColor,
  formatTypography,
} from "../utils/common.js";

export class FigmaComponentsModule {
  constructor(auth) {
    this.auth = auth;
  }

  /**
   * Get Figma components tools for MCP server
   */
  getTools() {
    return [
      {
        name: "get_figma_components",
        description: "Get components and component sets from a Figma file",
        inputSchema: {
          type: "object",
          properties: {
            file_key: {
              type: "string",
              description: "Figma file key or URL",
            },
            include_instances: {
              type: "boolean",
              description: "Include component instances in results",
              default: false,
            },
            component_type: {
              type: "string",
              description: "Filter by component type",
              enum: ["COMPONENT", "COMPONENT_SET", "INSTANCE"],
            },
          },
          required: ["file_key"],
        },
      },
      {
        name: "get_design_tokens",
        description:
          "Extract design tokens (colors, typography, spacing) from a Figma file",
        inputSchema: {
          type: "object",
          properties: {
            file_key: {
              type: "string",
              description: "Figma file key or URL",
            },
            token_types: {
              type: "array",
              items: {
                type: "string",
                enum: ["colors", "typography", "spacing", "effects"],
              },
              description: "Types of design tokens to extract",
              default: ["colors", "typography", "spacing", "effects"],
            },
            format: {
              type: "string",
              enum: ["json", "css", "scss", "markdown"],
              description: "Output format for design tokens",
              default: "markdown",
            },
            filter_pages: {
              type: "array",
              items: { type: "string" },
              description: "Only extract tokens from specific pages",
            },
          },
          required: ["file_key"],
        },
      },
    ];
  }

  /**
   * Get components from a Figma file
   */
  async getComponents(args) {
    const { file_key, include_instances = false, component_type } = args;
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

      // Find all components
      let components = [];
      if (component_type) {
        components = filterNodesByType(document.children, component_type);
      } else {
        components = [
          ...filterNodesByType(document.children, "COMPONENT"),
          ...filterNodesByType(document.children, "COMPONENT_SET"),
        ];

        if (include_instances) {
          components.push(...filterNodesByType(document.children, "INSTANCE"));
        }
      }

      if (components.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `# Components

No components found${
                component_type ? ` of type ${component_type}` : ""
              } in this file.`,
            },
          ],
        };
      }

      let content = `# Components in Figma File

Found ${components.length} component(s)${
        component_type ? ` of type ${component_type}` : ""
      }:

`;

      components.forEach((component, index) => {
        content += `## ${index + 1}. ${component.name || "Unnamed Component"}

**Type:** ${component.type}
**ID:** ${component.id}
`;

        if (component.description) {
          content += `**Description:** ${component.description}\n`;
        }

        if (component.absoluteBoundingBox) {
          const box = component.absoluteBoundingBox;
          content += `**Size:** ${Math.round(box.width)} × ${Math.round(
            box.height
          )}\n`;
        }

        // Component set specific info
        if (component.type === "COMPONENT_SET") {
          const variants = component.children || [];
          content += `**Variants:** ${variants.length}\n`;
          if (variants.length > 0) {
            content += `**Variant Names:** ${variants
              .map((v) => v.name)
              .join(", ")}\n`;
          }
        }

        // Instance specific info
        if (component.type === "INSTANCE" && component.componentId) {
          content += `**Master Component:** ${component.componentId}\n`;
        }

        // Extract basic style information
        if (component.fills && component.fills.length > 0) {
          const visibleFills = component.fills.filter(
            (fill) => fill.visible !== false
          );
          if (visibleFills.length > 0) {
            content += `**Background:** ${this.describeFills(visibleFills)}\n`;
          }
        }

        if (component.effects && component.effects.length > 0) {
          const visibleEffects = component.effects.filter(
            (effect) => effect.visible !== false
          );
          if (visibleEffects.length > 0) {
            content += `**Effects:** ${visibleEffects
              .map((e) => e.type)
              .join(", ")}\n`;
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
      throw new Error(`Failed to get Figma components: ${error.message}`);
    }
  }

  /**
   * Extract design tokens from a Figma file
   */
  async getDesignTokens(args) {
    const {
      file_key,
      token_types = ["colors", "typography", "spacing", "effects"],
      format = "markdown",
      filter_pages,
    } = args;
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

      // Filter pages if specified
      let pagesToProcess = document.children;
      if (filter_pages && filter_pages.length > 0) {
        pagesToProcess = document.children.filter((page) =>
          filter_pages.includes(page.name)
        );
      }

      // Extract design tokens
      const allTokens = extractDesignTokens(pagesToProcess);

      // Filter by requested token types
      const filteredTokens = {};
      token_types.forEach((type) => {
        if (allTokens[type] && Object.keys(allTokens[type]).length > 0) {
          filteredTokens[type] = allTokens[type];
        }
      });

      if (Object.keys(filteredTokens).length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `# Design Tokens

No design tokens found for types: ${token_types.join(", ")}`,
            },
          ],
        };
      }

      const content = this.formatTokensOutput(filteredTokens, format);

      return {
        content: [
          {
            type: "text",
            text: content,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to extract design tokens: ${error.message}`);
    }
  }

  /**
   * Describe fills for display
   */
  describeFills(fills) {
    return fills
      .map((fill) => {
        if (fill.type === "SOLID") {
          return formatColor(fill.color);
        } else if (fill.type === "GRADIENT_LINEAR") {
          return "Linear gradient";
        } else if (fill.type === "GRADIENT_RADIAL") {
          return "Radial gradient";
        } else if (fill.type === "IMAGE") {
          return "Image fill";
        }
        return fill.type;
      })
      .join(", ");
  }

  /**
   * Format design tokens output based on requested format
   */
  formatTokensOutput(tokens, format) {
    switch (format) {
      case "json":
        return `# Design Tokens (JSON)

\`\`\`json
${JSON.stringify(tokens, null, 2)}
\`\`\``;

      case "css":
        return this.formatTokensAsCSS(tokens);

      case "scss":
        return this.formatTokensAsSCSS(tokens);

      case "markdown":
      default:
        return this.formatTokensAsMarkdown(tokens);
    }
  }

  /**
   * Format tokens as CSS custom properties
   */
  formatTokensAsCSS(tokens) {
    let css = `# Design Tokens (CSS)

\`\`\`css
:root {
`;

    // Colors
    if (tokens.colors) {
      css += "  /* Colors */\n";
      Object.entries(tokens.colors).forEach(([name, value]) => {
        const cssName = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
        css += `  --color-${cssName}: ${value};\n`;
      });
      css += "\n";
    }

    // Typography (limited CSS representation)
    if (tokens.typography) {
      css += "  /* Typography - Font Sizes */\n";
      Object.entries(tokens.typography).forEach(([name, style]) => {
        const cssName = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
        if (style.fontSize) {
          css += `  --font-size-${cssName}: ${style.fontSize};\n`;
        }
      });
      css += "\n";
    }

    // Spacing
    if (tokens.spacing) {
      css += "  /* Spacing */\n";
      Object.entries(tokens.spacing).forEach(([name, values]) => {
        const cssName = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
        css += `  --spacing-${cssName}-top: ${values.paddingTop}px;\n`;
        css += `  --spacing-${cssName}-right: ${values.paddingRight}px;\n`;
        css += `  --spacing-${cssName}-bottom: ${values.paddingBottom}px;\n`;
        css += `  --spacing-${cssName}-left: ${values.paddingLeft}px;\n`;
      });
    }

    css += `}
\`\`\``;

    return css;
  }

  /**
   * Format tokens as SCSS variables
   */
  formatTokensAsSCSS(tokens) {
    let scss = `# Design Tokens (SCSS)

\`\`\`scss
`;

    // Colors
    if (tokens.colors) {
      scss += "// Colors\n";
      Object.entries(tokens.colors).forEach(([name, value]) => {
        const scssName = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
        scss += `$color-${scssName}: ${value};\n`;
      });
      scss += "\n";
    }

    // Typography
    if (tokens.typography) {
      scss += "// Typography\n";
      Object.entries(tokens.typography).forEach(([name, style]) => {
        const scssName = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
        if (style.fontFamily)
          scss += `$font-family-${scssName}: ${style.fontFamily};\n`;
        if (style.fontSize)
          scss += `$font-size-${scssName}: ${style.fontSize};\n`;
        if (style.fontWeight)
          scss += `$font-weight-${scssName}: ${style.fontWeight};\n`;
      });
      scss += "\n";
    }

    scss += `\`\`\``;

    return scss;
  }

  /**
   * Format tokens as markdown tables
   */
  formatTokensAsMarkdown(tokens) {
    let content = `# Design Tokens

`;

    // Colors
    if (tokens.colors) {
      content += `## Colors

| Name | Value | Preview |
|------|-------|---------|
`;
      Object.entries(tokens.colors).forEach(([name, value]) => {
        content += `| ${name} | \`${value}\` | <span style="background-color: ${value}; width: 20px; height: 20px; display: inline-block; border: 1px solid #ccc;"></span> |\n`;
      });
      content += "\n";
    }

    // Typography
    if (tokens.typography) {
      content += `## Typography

| Name | Font Family | Size | Weight | Line Height |
|------|-------------|------|--------|-------------|
`;
      Object.entries(tokens.typography).forEach(([name, style]) => {
        content += `| ${name} | ${style.fontFamily || "-"} | ${
          style.fontSize || "-"
        } | ${style.fontWeight || "-"} | ${style.lineHeight || "-"} |\n`;
      });
      content += "\n";
    }

    // Spacing
    if (tokens.spacing) {
      content += `## Spacing

| Name | Top | Right | Bottom | Left |
|------|-----|-------|--------|------|
`;
      Object.entries(tokens.spacing).forEach(([name, values]) => {
        content += `| ${name} | ${values.paddingTop}px | ${values.paddingRight}px | ${values.paddingBottom}px | ${values.paddingLeft}px |\n`;
      });
      content += "\n";
    }

    // Effects
    if (tokens.effects) {
      content += `## Effects

| Name | Type | Details |
|------|------|---------|
`;
      Object.entries(tokens.effects).forEach(([name, effect]) => {
        content += `| ${name} | ${effect.type} | ${JSON.stringify(
          effect,
          null,
          2
        ).substring(0, 100)}... |\n`;
      });
    }

    return content;
  }
}
