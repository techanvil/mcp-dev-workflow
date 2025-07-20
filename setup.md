# Quick Setup Guide

## 1. Cursor MCP Configuration

Copy the content of `cursor-mcp-config.json` to your Cursor MCP configuration file.

**Location of Cursor MCP config:**

- Linux/Mac: `~/.cursor/mcp.json`
- Windows: `%APPDATA%\Cursor\mcp.json`

If the file doesn't exist, create it with the content from `cursor-mcp-config.json`.

## 2. Optional: GitHub Token Setup

For higher rate limits and private repo access:

```bash
# Copy the environment template
cp env.example .env

# Edit .env and add your GitHub token:
# GITHUB_TOKEN=ghp_your_token_here
```

Get a token at: https://github.com/settings/tokens

## 3. Test the Setup

After restarting Cursor, you should see the GitHub MCP tools available. Test with:

```javascript
// Get issue #2345 from site-kit-wp
get_github_issue({
  owner: "google",
  repo: "site-kit-wp",
  issue_number: 2345,
});
```

## 4. Ready to Use!

Available tools:

- `get_github_issue` - Get specific issue details
- `get_github_pr` - Get specific PR details
- `list_github_issues` - List repository issues
- `list_github_prs` - List repository PRs
- `search_github_issues` - Search issues/PRs

The server works with any public GitHub repository, not just site-kit-wp!
