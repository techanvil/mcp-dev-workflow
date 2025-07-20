# MCP Dev Workflow

A collection of Model Context Protocol (MCP) servers for development workflow tools. This project provides MCP servers that enable AI assistants like Cursor to interact with development tools and services.

## Available Servers

### GitHub MCP Server

Provides tools for reading GitHub issues, pull requests, and repository information from any public repository.

**Features:**

- Get detailed information about specific issues or PRs
- List issues and pull requests with filtering
- Search issues and PRs within repositories
- Works with public repositories without authentication
- Optional GitHub token support for private repositories and higher rate limits

**Tools:**

- `get_github_issue` - Get details of a specific GitHub issue
- `get_github_pr` - Get details of a specific GitHub pull request
- `list_github_issues` - List issues from a GitHub repository
- `list_github_prs` - List pull requests from a GitHub repository
- `search_github_issues` - Search issues and PRs in a GitHub repository

### Google Workspace MCP Server

Provides tools for reading and interacting with Google Docs, Sheets, Gmail, and other Google Workspace applications through natural language commands.

**Current Features:**

- **Google Docs**: Read document content, search within docs, get metadata
- **Multiple Formats**: Plain text, Markdown, or structured output
- **Smart URL Parsing**: Works with Google Docs URLs or document IDs
- **Advanced Search**: Find text with context highlighting

**Tools:**

- `get_google_doc` - Read and extract content from Google Docs
- `get_google_doc_metadata` - Get document properties and sharing info
- `search_google_doc` - Search for text within documents

**Planned Features:**

- **Google Sheets**: Read spreadsheet data, search across sheets
- **Gmail**: Search emails, read conversations, extract attachments
- **Google Drive**: Browse files, check permissions, search across file types

## Installation

1. Clone this repository:

```bash
git clone <repository-url>
cd mcp-dev-workflow
```

2. Install dependencies:

```bash
npm install
```

3. (Optional) Set up environment variables:

```bash
cp env.example .env
# Edit .env and add your GitHub token if needed
```

## Configuration

### Setting up GitHub Token (Optional)

For public repositories, no authentication is required. However, setting up a GitHub token provides:

- Higher rate limits
- Access to private repositories
- Better performance

1. Go to [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token"
3. For public repos: No scopes needed
4. For private repos: Select `repo` scope
5. Copy the token and add it to your `.env` file

### Cursor Integration

To use these MCP servers with Cursor, add them to your MCP configuration file (`~/.cursor/mcp.json` or similar):

```json
{
  "mcpServers": {
    "github-dev-workflow": {
      "command": "node",
      "args": ["/path/to/mcp-dev-workflow/servers/github/index.js"],
      "env": {
        "GITHUB_TOKEN": "your_token_here",
        "DEFAULT_GITHUB_OWNER": "google",
        "DEFAULT_GITHUB_REPO": "site-kit-wp"
      }
    },
    "google-workspace": {
      "command": "node",
      "args": ["/path/to/mcp-dev-workflow/servers/google-workspace/index.js"],
      "env": {
        "GOOGLE_SERVICE_ACCOUNT_KEY": "",
        "GOOGLE_SERVICE_ACCOUNT_FILE": "/path/to/service-account.json"
      }
    }
  }
}
```

Or copy the configuration from `cursor-mcp-config.json` and update the paths for your system.

## Usage Examples

### Getting a Specific Issue

```javascript
// Tool: get_github_issue
{
  "owner": "google",
  "repo": "site-kit-wp",
  "issue_number": 2345
}
```

### Listing Recent Issues

```javascript
// Tool: list_github_issues
{
  "owner": "google",
  "repo": "site-kit-wp",
  "state": "open",
  "per_page": 10
}
```

### Searching for Issues

```javascript
// Tool: search_github_issues
{
  "owner": "google",
  "repo": "site-kit-wp",
  "query": "storybook dependencies",
  "type": "both"
}
```

### Reading a Google Doc

```javascript
// Tool: get_google_doc
{
  "document_id": "https://docs.google.com/document/d/1CzPZhhsSlyfp718k2gSqMN-zHJdZ8Sr5eJcciZas2A0/",
  "format": "structured"
}
```

### Searching Within a Google Doc

```javascript
// Tool: search_google_doc
{
  "document_id": "1CzPZhhsSlyfp718k2gSqMN-zHJdZ8Sr5eJcciZas2A0",
  "search_text": "authentication flow",
  "context_lines": 3
}
```

### Natural Language Examples

Instead of technical syntax, you can use natural language:

**GitHub:**

- "Show me issue 2345" (uses default repo)
- "List recent open issues"
- "Search for storybook issues"

**Google Workspace:**

- "Read the design doc at [Google Docs URL]"
- "Search for 'authentication' in that document"
- "What's the metadata for this Google Doc?"

## Development

### Running Servers Locally

To test the GitHub server:

```bash
npm run start:github
```

To test the Google Workspace server:

```bash
npm run start:google-workspace
```

To set up Google Workspace authentication:

```bash
npm run auth:google
```

### Adding New Servers

1. Create a new directory under `servers/` (e.g., `servers/jira/`)
2. Implement your MCP server following the same pattern as the GitHub server
3. Add the server configuration to `servers.config.json`
4. Add a start script to `package.json`
5. Update this README with documentation

### Server Structure

Each server should follow this structure:

```
servers/
├── your-server/
│   ├── index.js          # Main server file
│   ├── package.json      # Server-specific dependencies (optional)
│   └── README.md         # Server-specific documentation
```

## Troubleshooting

### Rate Limiting

GitHub API has rate limits:

- **Unauthenticated**: 60 requests per hour
- **Authenticated**: 5,000 requests per hour

If you hit rate limits, add a GitHub token to your environment.

### Connection Issues

If the MCP server fails to connect:

1. Ensure all dependencies are installed (`npm install`)
2. Check that Node.js version is compatible (Node 18+ recommended)
3. Verify the server path in your MCP configuration
4. Check the server logs for specific error messages

### GitHub API Errors

Common GitHub API issues:

- **404 Not Found**: Repository doesn't exist or is private (add token if private)
- **403 Forbidden**: Rate limit exceeded or insufficient permissions
- **422 Unprocessable Entity**: Invalid parameters in the request

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-server`
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
