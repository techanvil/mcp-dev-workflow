#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import dotenv from "dotenv";

// Import Figma modules
import { FigmaAuth } from "./utils/auth.js";
import { FigmaFilesModule } from "./modules/files.js";
import { FigmaComponentsModule } from "./modules/components.js";
import { FigmaAssetsModule } from "./modules/assets.js";
import { createErrorResponse, RateLimiter } from "./utils/common.js";

// Load environment variables
dotenv.config();

class FigmaMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: "figma-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Initialize authentication and modules
    this.auth = new FigmaAuth();
    this.modules = {};
    this.rateLimiter = new RateLimiter(300, 60000); // 300 requests per minute (Figma limit)

    this.setupToolHandlers();
  }

  async initializeModules() {
    try {
      // Initialize authentication first
      await this.auth.initialize();

      // Initialize Figma modules
      this.modules.files = new FigmaFilesModule(this.auth);
      this.modules.components = new FigmaComponentsModule(this.auth);
      this.modules.assets = new FigmaAssetsModule(this.auth);

      console.error("✓ Figma MCP server modules initialized");
    } catch (error) {
      console.error("✗ Failed to initialize Figma modules:", error.message);
      throw error;
    }
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      try {
        // Ensure modules are initialized
        if (Object.keys(this.modules).length === 0) {
          await this.initializeModules();
        }

        const tools = [];

        // Collect tools from all modules
        if (this.modules.files) {
          tools.push(...this.modules.files.getTools());
        }
        if (this.modules.components) {
          tools.push(...this.modules.components.getTools());
        }
        if (this.modules.assets) {
          tools.push(...this.modules.assets.getTools());
        }

        return { tools };
      } catch (error) {
        console.error("Error listing tools:", error.message);
        return { tools: [] };
      }
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        // Rate limiting check
        if (!this.rateLimiter.canMakeRequest()) {
          const waitTime = this.rateLimiter.getWaitTime();
          throw new Error(
            `Rate limit exceeded. Please wait ${Math.ceil(
              waitTime / 1000
            )} seconds before trying again.`
          );
        }

        // Ensure modules are initialized
        if (Object.keys(this.modules).length === 0) {
          await this.initializeModules();
        }

        // Route tool calls to appropriate modules
        switch (name) {
          // File tools
          case "get_figma_file":
            return await this.modules.files.getFile(args);
          case "get_figma_comments":
            return await this.modules.files.getComments(args);
          case "search_figma_layers":
            return await this.modules.files.searchLayers(args);

          // Component tools
          case "get_figma_components":
            return await this.modules.components.getComponents(args);
          case "get_design_tokens":
            return await this.modules.components.getDesignTokens(args);

          // Asset tools
          case "export_figma_assets":
            return await this.modules.assets.exportAssets(args);

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        console.error(`Error executing tool ${name}:`, error.message);
        return createErrorResponse(error, name);
      }
    });
  }

  async run() {
    try {
      const transport = new StdioServerTransport();
      await this.server.connect(transport);
      console.error("Figma MCP server running on stdio");
    } catch (error) {
      console.error("Failed to start Figma MCP server:", error.message);
      process.exit(1);
    }
  }
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.error("Shutting down Figma MCP server...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.error("Shutting down Figma MCP server...");
  process.exit(0);
});

// Start the server
const server = new FigmaMCPServer();
server.run().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
