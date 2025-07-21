# MCP Dev Workflow

A collection of Model Context Protocol (MCP) servers for development workflow tools. This project provides scalable MCP servers that enable AI assistants like Cursor to interact with development tools and services through natural language.

## 🌟 Available Servers

### 🐙 GitHub MCP Server

Interact with GitHub repositories through natural language commands.

**Features:**

- Get detailed issue and PR information
- List and browse repository content
- Search issues and PRs across repositories
- Works with any public repository
- Default repository configuration for simplified usage

**Tools:** `get_github_issue`, `get_github_pr`, `list_github_issues`, `list_github_prs`, `search_github_issues`

### 📄 Google Workspace MCP Server

Read and search Google Docs, with extensible architecture for Sheets, Gmail, and Drive.

**Current Features:**

- **Google Docs**: Read content, search within documents, get metadata
- **Multiple Formats**: Plain text, Markdown, or structured output
- **Smart URL Parsing**: Works with Google Docs URLs or document IDs
- **Authentication Options**: Service Account or OAuth2

**Tools:** `get_google_doc`, `get_google_doc_metadata`, `search_google_doc`

**Planned:** Google Sheets, Gmail, Google Drive integration

### 🎨 Figma MCP Server

Bridge design and development workflows with comprehensive Figma integration.

**Features:**

- **Design Token Extraction**: Colors, typography, spacing in CSS/SCSS/JSON formats
- **Component Discovery**: Find reusable components and design patterns
- **Asset Export**: Download icons, images, and design assets as SVG/PNG
- **Design File Analysis**: Read file structure, comments, and layer information
- **Multi-Format Output**: Structured data optimized for development handoff

**Tools:** `get_figma_file`, `get_figma_comments`, `search_figma_layers`, `get_figma_components`, `get_design_tokens`, `export_figma_assets`

## 🚀 Quick Start

### 1. Install

```bash
git clone <repository-url>
cd mcp-dev-workflow
npm install
```

### 2. Configure Cursor

```bash
# Copy configuration to Cursor
cp cursor-mcp-config.json ~/.cursor/mcp.json
# Update paths in the config for your system
```

### 3. Restart Cursor

Restart Cursor completely for MCP servers to load.

### 4. Test

**GitHub (works immediately):**

- "Show me issue 2345"
- "List recent open issues"
- "Search for storybook issues"

**Google Workspace (requires authentication):**

- "Read the design doc at https://docs.google.com/document/d/YOUR_DOCUMENT_ID/"
- "Search for 'authentication' in that document"

**Figma (requires authentication):**

- "Get design tokens from https://www.figma.com/design/ABC123/design-system as CSS"
- "Export all icons from this Figma file as SVG"
- "What components are available in design ID ABC123def456?"
- "Show me the latest comments on this Figma design"

## 💬 Natural Language Usage

Instead of technical syntax, use natural language:

**GitHub:**

- "Show me issue 2345" (uses default repo: google/site-kit-wp)
- "Find storybook-related issues"
- "List recent PRs from nodejs/node"

**Google Workspace:**

- "Read the design doc at [URL]"
- "Search for 'authentication' in that document"
- "What's the metadata for this Google Doc?"

**Figma:**

- "Get design tokens from https://www.figma.com/design/ABC123/design-system as CSS"
- "Export all icons from this Figma file as SVG files"
- "What components are available in design ID ABC123def456?"
- "Show me the latest comments on https://www.figma.com/design/XYZ789/feature-designs"
- "Search for navigation components in file key ABC123def456"
- "Get typography tokens from this design system as SCSS variables"

## 📚 Documentation

### Setup & Configuration

- **[Setup Guide](docs/setup/)** - Complete setup instructions for both servers
- **[Troubleshooting](docs/setup/README.md#troubleshooting)** - Common issues and solutions

### Usage & Examples

- **[Usage Guide](docs/usage/)** - Detailed usage patterns and commands
- **[Examples & Workflows](docs/examples/)** - Real-world scenarios and workflows

### Service-Specific Docs

- **[GitHub Server](docs/services/github.md)** - GitHub-specific features and setup
- **[Google Workspace Server](docs/services/google-workspace.md)** - Google Workspace features and authentication
- **[Figma Server](docs/services/figma.md)** - Figma integration, design tokens, and asset export

## 🔧 Configuration Reference

### Cursor MCP Configuration

```json
{
  "mcpServers": {
    "github-dev-workflow": {
      "command": "node",
      "args": ["/path/to/mcp-dev-workflow/servers/github/index.js"],
      "env": {
        "GITHUB_TOKEN": "optional_token",
        "DEFAULT_GITHUB_OWNER": "google",
        "DEFAULT_GITHUB_REPO": "site-kit-wp"
      }
    },
    "google-workspace": {
      "command": "node",
      "args": ["/path/to/mcp-dev-workflow/servers/google-workspace/index.js"],
      "env": {
        "GOOGLE_SERVICE_ACCOUNT_FILE": "/path/to/service-account.json"
      }
    },
    "figma": {
      "command": "node",
      "args": ["/path/to/mcp-dev-workflow/servers/figma/index.js"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "figd_your_token_here",
        "DEFAULT_FIGMA_TEAM_ID": "your_team_id",
        "DEFAULT_FIGMA_PROJECT_ID": "your_project_id"
      }
    }
  }
}
```

### Authentication Setup

**GitHub (Optional):**

- Public repos: No authentication needed
- Private repos + higher limits: Add `GITHUB_TOKEN` to `.env`

**Google Workspace (Required):**

- **OAuth2** (personal): `npm run auth:google`
- **Service Account** (teams): Set `GOOGLE_SERVICE_ACCOUNT_FILE`

**Figma (Required):**

- **Personal Access Token**: Generate in Figma Settings → Personal Access Tokens
- **Set Token**: Add `FIGMA_ACCESS_TOKEN` to `.env`

See the [Setup Guide](docs/setup/) for detailed authentication instructions.

## 🛠️ Development

### Running Servers Locally

```bash
# Test individual servers
npm run start:github
npm run start:google-workspace
npm run start:figma

# Set up Google authentication
npm run auth:google

# Verify setup
npm run test:setup
```

### Adding New Servers

1. Create `servers/your-service/` directory
2. Follow the existing server patterns
3. Add configuration to `cursor-mcp-config.json`
4. Update documentation

See existing servers for implementation patterns.

## 🏗️ Architecture

```
mcp-dev-workflow/
├── docs/                     # Documentation
│   ├── setup/               # Setup & configuration guides
│   ├── usage/               # Usage patterns & commands
│   └── examples/            # Real-world workflows
├── servers/                 # MCP server implementations
│   ├── github/              # GitHub integration
│   └── google-workspace/    # Google Workspace integration
│       ├── modules/         # Service-specific modules
│       └── utils/           # Shared utilities
├── cursor-mcp-config.json   # Ready-to-use Cursor configuration
└── package.json            # Dependencies & scripts
```

Each server follows a modular pattern for easy extension and maintenance.

## 🚨 Common Issues

**Tools not available in Cursor:**

1. Copy `cursor-mcp-config.json` to `~/.cursor/mcp.json`
2. Update file paths for your system
3. Restart Cursor completely

**GitHub rate limits:**

- Add `GITHUB_TOKEN` to `.env` for 5,000 requests/hour

**Google Workspace authentication:**

- Run `npm run auth:google` for OAuth2 setup
- Or set `GOOGLE_SERVICE_ACCOUNT_FILE` for Service Account

**Figma authentication:**

- Generate Personal Access Token in Figma Settings
- Add `FIGMA_ACCESS_TOKEN` to `.env` file

See the [Setup Guide](docs/setup/README.md#troubleshooting) for detailed troubleshooting.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-server`
3. Follow existing server patterns in `servers/`
4. Add documentation in `docs/`
5. Submit a pull request

## 📄 License

Apache License 2.0 - see [LICENSE](LICENSE) file for details.

---

**Ready to start?** Check the [Setup Guide](docs/setup/) for installation instructions or jump to [Examples](docs/examples/) to see what's possible!
