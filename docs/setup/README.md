# Setup Guide

This guide covers setting up both the GitHub and Google Workspace MCP servers.

## Quick Setup

### 1. Install Dependencies

```bash
git clone <repository-url>
cd mcp-dev-workflow
npm install
```

### 2. Configure Cursor

Copy the MCP configuration to Cursor:

**Linux/Mac:**

```bash
# Copy the entire content of cursor-mcp-config.json to:
~/.cursor/mcp.json
```

**Windows:**

```bash
# Copy the content to:
%APPDATA%\Cursor\mcp.json
```

If the file doesn't exist, create it with the content from `cursor-mcp-config.json`.

### 3. Restart Cursor

Restart Cursor completely (not just reload window) for the MCP servers to load.

### 4. Test the Setup

Once Cursor restarts, test both servers:

**GitHub Tools:**

- "Show me issue 2345"
- "List recent open issues"

**Google Workspace Tools (requires authentication):**

- "Read the design doc at https://docs.google.com/document/d/1CzPZhhsSlyfp718k2gSqMN-zHJdZ8Sr5eJcciZas2A0/"

## GitHub Setup

### Basic Setup (Public Repositories)

No authentication required for public repositories. The server works immediately after Cursor configuration.

### Enhanced Setup (Optional)

For higher rate limits and private repository access:

1. **Create GitHub Token:**

   - Go to [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)
   - Click "Generate new token"
   - For public repos: No scopes needed
   - For private repos: Select `repo` scope

2. **Add to Environment:**
   ```bash
   cp env.example .env
   # Edit .env and add:
   GITHUB_TOKEN=your_token_here
   ```

### Rate Limits

- **Without token**: 60 requests/hour
- **With token**: 5,000 requests/hour

## Google Workspace Setup

Authentication is **required** for Google Workspace tools. Choose one method:

### Method 1: OAuth2 (Recommended for Individual Use)

**Best for:** Personal projects, development, testing

1. **Create OAuth2 Credentials:**

   - Go to [Google Cloud Console > APIs & Credentials](https://console.cloud.google.com/apis/credentials)
   - Create "OAuth 2.0 Client IDs"
   - Add redirect URI: `http://localhost:8080`
   - Download client secrets

2. **Enable Required APIs:**

   - [Google Docs API](https://console.cloud.google.com/apis/library/docs.googleapis.com)
   - [Google Drive API](https://console.cloud.google.com/apis/library/drive.googleapis.com)

3. **Run Automated Setup:**

   ```bash
   npm run auth:google
   ```

   This will:

   - Prompt for your OAuth2 credentials
   - Open browser for authorization
   - Save tokens automatically

### Method 2: Service Account (Recommended for Teams)

**Best for:** Server applications, automated scripts, team use

1. **Create Service Account:**

   - Go to [Google Cloud Console > Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
   - Create new service account
   - Download JSON key file

2. **Enable APIs** (same as OAuth2 method above)

3. **Set Environment Variables:**

   ```bash
   # Option A: Direct JSON content
   export GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'

   # Option B: File path (recommended)
   export GOOGLE_SERVICE_ACCOUNT_FILE="/path/to/service-account-key.json"
   ```

4. **Share Documents:**
   Share Google Docs with the service account email (found in the JSON key file)

### Required Scopes

```javascript
// Current scopes (read-only)
"https://www.googleapis.com/auth/documents.readonly";
"https://www.googleapis.com/auth/drive.readonly";
```

## Troubleshooting

### Tools Not Available in Cursor

1. Verify configuration copied to `~/.cursor/mcp.json`
2. Restart Cursor completely (not just reload)
3. Check server paths are correct in config
4. Test servers directly: `npm run test:setup`

### GitHub Issues

**"404 Not Found":**

- Repository doesn't exist or is private
- Add GitHub token for private repos

**"403 Forbidden":**

- Rate limit exceeded
- Add GitHub token for higher limits

### Google Workspace Issues

**"No valid Google authentication found":**

```bash
# Solution: Set up authentication
npm run auth:google  # For OAuth2
# OR set environment variables for Service Account
```

**"Document not found" or "Permission denied":**

- Share document with service account email
- Verify OAuth2 user has access
- Check if document URL is correct

**"Rate limit exceeded":**

- Built-in rate limiting protects against API limits
- Wait for specified time before retrying

### Debug Steps

1. **Test servers individually:**

   ```bash
   npm run start:github
   npm run start:google-workspace
   ```

2. **Verify authentication:**

   ```bash
   # Google Workspace
   npm run auth:google

   # GitHub (check if token works)
   curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user
   ```

3. **Check API quotas:**
   - Google Cloud Console > APIs & Services > Quotas
   - GitHub Settings > Developer settings > Personal access tokens

## Next Steps

Once setup is complete:

1. See [Usage Guide](../usage/) for detailed examples
2. Check [Examples](../examples/) for real-world workflows
3. Read service-specific documentation in `servers/` directories

## Configuration Reference

### Cursor MCP Configuration

```json
{
  "mcpServers": {
    "github-dev-workflow": {
      "command": "node",
      "args": ["/path/to/mcp-dev-workflow/servers/github/index.js"],
      "env": {
        "GITHUB_TOKEN": "optional_token_here",
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
    }
  }
}
```

### Environment Variables

```bash
# GitHub (optional)
GITHUB_TOKEN=your_github_token

# Google Workspace (choose one)
GOOGLE_SERVICE_ACCOUNT_FILE=/path/to/service-account.json
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}

# OR for OAuth2
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_TOKEN_FILE=.google-token.json
```
