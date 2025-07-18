# Dev Workflow MCP

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

## Installation

1. Clone this repository:

```bash
git clone <repository-url>
cd dev-workflow-mcp
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
    "github": {
      "command": "node",
      "args": ["/path/to/dev-workflow-mcp/servers/github/index.js"],
      "env": {
        "GITHUB_TOKEN": "your_token_here"
      }
    }
  }
}
```

## Usage Examples

### Getting a Specific Issue

```javascript
// Tool: get_github_issue
{
  "owner": "google",
  "repo": "site-kit-wp",
  "issue_number": 10988
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

## Development

### Running Servers Locally

To test the GitHub server:

```bash
npm run start:github
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
