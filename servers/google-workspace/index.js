#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import dotenv from "dotenv";

// Import Google Workspace modules
import { GoogleWorkspaceAuth } from "./utils/auth.js";
import { GoogleDocsModule } from "./modules/docs.js";
import { createErrorResponse, RateLimiter } from "./utils/common.js";

// Load environment variables
dotenv.config();

class GoogleWorkspaceMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: "google-workspace-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Initialize authentication and modules
    this.auth = new GoogleWorkspaceAuth();
    this.modules = {};
    this.rateLimiter = new RateLimiter(100, 60000); // 100 requests per minute

    this.setupToolHandlers();
  }

  async initializeModules() {
    try {
      // Initialize authentication first
      await this.auth.initialize();

      // Initialize Google Docs module
      this.modules.docs = new GoogleDocsModule(this.auth);

      // TODO: Add other modules here as they're implemented
      // this.modules.sheets = new GoogleSheetsModule(this.auth);
      // this.modules.gmail = new GmailModule(this.auth);
      // this.modules.drive = new GoogleDriveModule(this.auth);

      console.error("✓ Google Workspace MCP server modules initialized");
    } catch (error) {
      console.error(
        "✗ Failed to initialize Google Workspace modules:",
        error.message
      );
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
        if (this.modules.docs) {
          tools.push(...this.modules.docs.getTools());
        }

        // TODO: Add tools from other modules as they're implemented
        // if (this.modules.sheets) {
        //   tools.push(...this.modules.sheets.getTools());
        // }

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
          // Google Docs tools
          case "get_google_doc":
            return await this.modules.docs.getDocument(args);
          case "get_google_doc_metadata":
            return await this.modules.docs.getDocumentMetadata(args);
          case "search_google_doc":
            return await this.modules.docs.searchDocument(args);

          // TODO: Add other module tool routing as they're implemented
          // Google Sheets tools
          // case "get_google_sheet":
          //   return await this.modules.sheets.getSpreadsheet(args);

          // Gmail tools
          // case "search_gmail":
          //   return await this.modules.gmail.searchEmails(args);

          // Google Drive tools
          // case "list_drive_files":
          //   return await this.modules.drive.listFiles(args);

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
      console.error("Google Workspace MCP server running on stdio");
    } catch (error) {
      console.error(
        "Failed to start Google Workspace MCP server:",
        error.message
      );
      process.exit(1);
    }
  }
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.error("Shutting down Google Workspace MCP server...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.error("Shutting down Google Workspace MCP server...");
  process.exit(0);
});

// Start the server
const server = new GoogleWorkspaceMCPServer();
server.run().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
