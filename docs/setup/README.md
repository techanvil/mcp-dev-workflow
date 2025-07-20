# Setup Guide

This guide covers setting up the GitHub, Google Workspace, and Figma MCP servers.

## 🚀 Automated Setup (Recommended)

The easiest way to get started is using our intelligent configuration generator, which creates optimized Cursor configs with your actual API tokens and settings automatically.

### 1. Install Dependencies

```bash
git clone <repository-url>
cd mcp-dev-workflow
npm install
```

### 2. Set Environment Variables

**Create your `.env` file first** (the generator reads from this):

```bash
cp env.example .env
# Edit .env with your actual tokens and settings (see authentication sections below)
```

### 3. Generate Ready-to-Use Configuration

Choose a preset that matches your workflow:

```bash
# Frontend development (all servers: GitHub + Google Workspace + Figma)
npm run generate:config -- --preset=frontend-dev --output=cursor-config.json

# Design system work (Figma + GitHub)
npm run generate:config -- --preset=design-system --output=cursor-config.json

# Site Kit WordPress development (GitHub only)
npm run generate:config -- --preset=site-kit-wp --output=cursor-config.json

# All servers (custom configuration)
npm run generate:config -- --output=cursor-config.json
```

The generator will:

- ✅ **Read your `.env` file** and substitute actual API tokens
- ✅ **Validate environment variables** and skip servers without valid configs
- ✅ **Prioritize your personal settings** over preset defaults
- ✅ **Generate absolute paths** for your system
- ✅ **Show warnings** for missing environment variables

### 4. Copy Configuration to Cursor

**Linux/Mac:**

```bash
cp cursor-config.json ~/.cursor/mcp.json
```

**Windows:**

```bash
copy cursor-config.json %APPDATA%\Cursor\mcp.json
```

### 5. Restart Cursor

Restart Cursor completely for the servers to load.

### 🎯 Available Presets

| Preset          | Servers                           | Best For            | Use Case                                     |
| --------------- | --------------------------------- | ------------------- | -------------------------------------------- |
| `frontend-dev`  | GitHub + Google Workspace + Figma | Full-stack teams    | Complete design-to-code workflow             |
| `design-system` | Figma + GitHub                    | Design teams        | Design token management, component libraries |
| `site-kit-wp`   | GitHub only                       | Site Kit developers | WordPress plugin development                 |

### 🔧 Environment Variable Precedence

The configuration generator intelligently handles environment variables:

```bash
# Your .env file values ALWAYS take precedence
DEFAULT_GITHUB_OWNER=google          # Your personal setting
DEFAULT_GITHUB_REPO=site-kit-wp      # Your personal setting

# Even when using presets with different defaults:
npm run generate:config -- --preset=frontend-dev
# Result: Uses "google/site-kit-wp" from your .env, NOT preset defaults
```

**Priority Order:**

1. **Your `.env` file** (highest priority)
2. **Preset defaults** (only used if not in `.env`)
3. **System environment variables** (fallback)

This means you can safely use any preset while keeping your personal repository and team settings.

### ✅ Benefits of Automated Setup

- **Ready-to-Use Configs**: Generated configurations include your actual API tokens, no manual editing needed
- **Smart Environment Handling**: Automatically reads `.env` files and validates all required variables
- **Personal Settings Priority**: Your `.env` values always take precedence over preset defaults
- **Zero Configuration Errors**: Generated configs are always valid with proper paths and syntax
- **Team Consistency**: Everyone gets the same optimized setup with their personal tokens
- **Selective Server Loading**: Only includes servers with valid authentication, prevents startup errors
- **Easy Updates**: Regenerate configs when servers are updated or settings change
- **Preset Optimization**: Configurations tuned for specific workflows
- **Future-Proof**: Automatically includes new servers and features

---

## 📋 Manual Setup (Alternative)

If you prefer manual configuration or need custom settings:

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

Once Cursor restarts, test the servers:

**GitHub Tools:**

- "Show me issue 2345"
- "List recent open issues"

**Google Workspace Tools (requires authentication):**

- "Read the design doc at https://docs.google.com/document/d/YOUR_DOCUMENT_ID/"

**Figma Tools (requires authentication):**

- "Get design tokens from https://www.figma.com/file/YOUR_FILE_KEY/"
- "What components are available in the design file?"

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

## Figma Setup

Authentication is **required** for all Figma tools.

### Personal Access Token Setup

1. **Create Figma Token:**

   - Go to [Figma Settings > Personal Access Tokens](https://www.figma.com/settings)
   - Click "Create new token"
   - Enter a descriptive name (e.g., "MCP Dev Workflow")
   - Save the token immediately (it won't be shown again)

2. **Add to Environment:**

   ```bash
   cp env.example .env
   # Edit .env and add:
   FIGMA_ACCESS_TOKEN=figd_your_token_here
   ```

3. **Optional Team Configuration:**

   ```bash
   # For simplified commands (optional)
   DEFAULT_FIGMA_TEAM_ID=your_team_id
   DEFAULT_FIGMA_PROJECT_ID=your_project_id
   ```

### Token Permissions

- **Read-only access**: Figma tokens only provide read access to design files
- **File-level permissions**: Token respects Figma's existing file sharing permissions
- **Team boundaries**: Cannot access files outside your team permissions

### Rate Limits

- **Rate limit**: 300 requests/minute (automatically handled)
- **Asset exports**: Limited to 10 per request (configurable)

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

### Figma Issues

**"403 Forbidden":**

- Invalid or expired Figma token
- File not shared with your account
- **Solution**: Regenerate token, check file sharing permissions

**"404 Not Found":**

- File key doesn't exist or file deleted
- Incorrect file URL format
- **Solution**: Verify file URL: `https://www.figma.com/file/FILE_KEY/file-name`

**"Rate limit exceeded":**

- Too many requests in short time period
- **Solution**: Wait 1 minute for rate limit reset

### Debug Steps

1. **Test servers individually:**

   ```bash
   npm run start:github
   npm run start:google-workspace
   npm run start:figma
   ```

2. **Verify authentication:**

   ```bash
   # Google Workspace
   npm run auth:google

   # GitHub (check if token works)
   curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user

   # Figma (check if token works)
   curl -H "X-Figma-Token: YOUR_TOKEN" https://api.figma.com/v1/me
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

### Generated Cursor MCP Configuration

When using the automated setup, the configuration generator creates files like this (with your actual values):

```json
{
  "mcpServers": {
    "github-frontend-dev": {
      "command": "node",
      "args": ["/home/user/mcp-dev-workflow/servers/github/index.js"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_actual_token_here",
        "DEFAULT_GITHUB_OWNER": "google",
        "DEFAULT_GITHUB_REPO": "site-kit-wp"
      }
    },
    "google-workspace-frontend-dev": {
      "command": "node",
      "args": ["/home/user/mcp-dev-workflow/servers/google-workspace/index.js"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-actual-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "GOCSPX-your-actual-secret",
        "GOOGLE_TOKEN_FILE": "/home/user/mcp-dev-workflow/.google-token.json"
      }
    },
    "figma-frontend-dev": {
      "command": "node",
      "args": ["/home/user/mcp-dev-workflow/servers/figma/index.js"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "figd_your_actual_figma_token",
        "DEFAULT_FIGMA_TEAM_ID": "852657679204900581",
        "DEFAULT_FIGMA_PROJECT_ID": "16778977"
      }
    }
  }
}
```

**Note:** The generator substitutes all `${VARIABLE_NAME}` placeholders with actual values from your `.env` file, so the final configuration is ready to use immediately.

### Environment Variables (.env file)

These are the variables you should set in your `.env` file. The configuration generator will automatically read and use these values:

```bash
# GitHub (optional for public repos, required for private repos)
GITHUB_TOKEN=your_github_token
DEFAULT_GITHUB_OWNER=google
DEFAULT_GITHUB_REPO=site-kit-wp

# Google Workspace (choose one authentication method)
GOOGLE_SERVICE_ACCOUNT_FILE=/path/to/service-account.json
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}

# OR for OAuth2
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_TOKEN_FILE=.google-token.json

# Figma (required)
FIGMA_ACCESS_TOKEN=figd_your_token
DEFAULT_FIGMA_TEAM_ID=your_team_id
DEFAULT_FIGMA_PROJECT_ID=your_project_id
```

The generator will substitute `${VARIABLE_NAME}` placeholders in the server configurations with these actual values.
