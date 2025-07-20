#!/usr/bin/env node

/**
 * Configuration Generator for MCP Dev Workflow
 *
 * This script demonstrates the value of the centralized servers.config.json
 * by generating Cursor MCP configurations automatically.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.dirname(__dirname);

// Load the centralized config
const configPath = path.join(projectRoot, "servers.config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

/**
 * Generate Cursor MCP configuration from servers.config.json
 */
function generateCursorConfig(preset = null) {
  const cursorConfig = {
    mcpServers: {},
  };

  let serversToInclude = Object.keys(config.servers);
  let defaultParams = {};

  // If preset specified, filter servers and apply defaults
  if (preset && config.presets[preset]) {
    const presetConfig = config.presets[preset];
    serversToInclude = presetConfig.servers || serversToInclude;
    defaultParams = presetConfig.default_params || {};
  }

  // Generate server configurations
  serversToInclude.forEach((serverKey) => {
    const server = config.servers[serverKey];
    if (!server) {
      console.warn(`Warning: Server '${serverKey}' not found in config`);
      return;
    }

    const serverConfig = {
      command: server.command,
      args: server.args.map((arg) => path.join(projectRoot, arg)),
      env: {},
    };

    // Add environment variables
    Object.entries(server.env).forEach(([key, value]) => {
      serverConfig.env[key] = value;
    });

    // Apply preset defaults for this server
    if (defaultParams[serverKey]) {
      Object.entries(defaultParams[serverKey]).forEach(([key, value]) => {
        const envKey = `DEFAULT_${serverKey.toUpperCase()}_${key.toUpperCase()}`;
        serverConfig.env[envKey] = value;
      });
    }

    // Use a descriptive key for the server
    const serverName = preset ? `${serverKey}-${preset}` : serverKey;
    cursorConfig.mcpServers[serverName] = serverConfig;
  });

  return cursorConfig;
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);
  const preset = args.find((arg) => arg.startsWith("--preset="))?.split("=")[1];
  const output = args.find((arg) => arg.startsWith("--output="))?.split("=")[1];
  const help = args.includes("--help") || args.includes("-h");

  if (help) {
    console.log(`
🔧 MCP Configuration Generator

Usage: node scripts/generate-config.js [options]

Options:
  --preset=<name>     Use a specific preset (${Object.keys(config.presets).join(
    ", "
  )})
  --output=<file>     Write to file instead of stdout
  --help, -h          Show this help

Examples:
  # Generate full configuration
  node scripts/generate-config.js

  # Generate frontend development preset
  node scripts/generate-config.js --preset=frontend-dev

  # Generate and save to file
  node scripts/generate-config.js --preset=site-kit-wp --output=cursor-site-kit.json

Available Presets:
${Object.entries(config.presets)
  .map(([key, preset]) => `  ${key}: ${preset.description}`)
  .join("\n")}

Available Servers:
${Object.entries(config.servers)
  .map(([key, server]) => `  ${key}: ${server.description}`)
  .join("\n")}
`);
    return;
  }

  try {
    const cursorConfig = generateCursorConfig(preset);
    const configJson = JSON.stringify(cursorConfig, null, 2);

    if (output) {
      fs.writeFileSync(output, configJson);
      console.log(`✓ Configuration written to ${output}`);

      if (preset) {
        console.log(
          `✓ Generated ${preset} preset with servers: ${config.presets[
            preset
          ].servers.join(", ")}`
        );
      } else {
        console.log(`✓ Generated full configuration with all servers`);
      }
    } else {
      console.log(configJson);
    }

    // Show usage instructions
    console.error(`
📋 Next Steps:

1. Copy the configuration to your Cursor MCP file:
   ${
     process.platform === "win32"
       ? "%APPDATA%\\Cursor\\mcp.json"
       : "~/.cursor/mcp.json"
   }

2. Update environment variables in .env file

3. Restart Cursor to load the servers

${
  preset
    ? `🎯 Using ${preset} preset - optimized for: ${config.presets[preset].description}`
    : ""
}
`);
  } catch (error) {
    console.error("❌ Error generating configuration:", error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateCursorConfig };
