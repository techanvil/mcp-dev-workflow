# GitHub MCP Server

A comprehensive Model Context Protocol (MCP) server for GitHub integration. This server provides tools to read and interact with GitHub repositories, issues, and pull requests through natural language commands.

## 🌟 Features

### Current Capabilities (v1.0)

#### 📋 Issues & Pull Requests

- **Get Issue Details**: Extract full issue information including description, labels, status
- **Get PR Details**: Retrieve pull request information, changes, and review status
- **List Issues/PRs**: Browse repository issues and pull requests with filtering
- **Search**: Find issues and PRs across repositories with advanced search syntax
- **Cross-Repository Support**: Works with any public GitHub repository

### 🚧 Planned Capabilities (Future Versions)

#### 📊 Repository Analytics

- Contributor statistics and activity
- Issue/PR trends and metrics
- Code review analytics

#### 🔍 Advanced Search

- Code search within repositories
- Commit history and blame information
- Branch and tag management

#### 🤖 Automation Integration

- Webhook event processing
- Automated issue/PR management
- CI/CD pipeline integration

## 🛠️ Available Tools

### Issues & Pull Requests

| Tool                   | Description                   | Use Case                                    |
| ---------------------- | ----------------------------- | ------------------------------------------- |
| `get_github_issue`     | Get specific issue details    | Understand requirements, check status       |
| `get_github_pr`        | Get specific PR details       | Code review preparation, understand changes |
| `list_github_issues`   | List repository issues        | Browse current work, find assignments       |
| `list_github_prs`      | List repository pull requests | Monitor reviews, check merge status         |
| `search_github_issues` | Search issues and PRs         | Find related work, research patterns        |

## 🔧 Setup & Authentication

### Prerequisites

1. **Public Repository Access**: No authentication required for public repositories
2. **GitHub Token** (optional but recommended): For higher rate limits and private repository access

### Authentication Options

#### Option 1: No Authentication (Public Repos)

**Best for:** Quick testing, public repository access

- **Rate limit**: 60 requests/hour
- **Access**: Public repositories only
- **Setup**: None required - works immediately

#### Option 2: GitHub Token (Recommended)

**Best for:** Regular use, private repositories, higher rate limits

1. **Create Personal Access Token:**

   - Go to [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Select scopes:
     - For public repos: No scopes needed
     - For private repos: `repo` scope
     - For organizations: `read:org` scope (if needed)

2. **Set Environment Variable:**

   ```bash
   # Add to .env file
   GITHUB_TOKEN=ghp_your_token_here

   # Or export directly
   export GITHUB_TOKEN=ghp_your_token_here
   ```

### Rate Limits

- **Without token**: 60 requests/hour
- **With token**: 5,000 requests/hour
- **Enterprise**: Higher limits available

## 🚀 Usage Examples

### Getting Issue Details

```bash
# Using default repository (google/site-kit-wp)
get_github_issue with:
- issue_number: 2345

# Explicit repository
get_github_issue with:
- owner: "microsoft"
- repo: "vscode"
- issue_number: 123
```

### Natural Language Examples

Instead of technical tool calls, you can use natural language:

- "Show me issue 2345"
- "Get details on PR #1234 from microsoft/vscode"
- "List recent open issues"
- "Search for storybook-related issues"
- "Find PRs about authentication"

### Advanced Search Syntax

```bash
# Search with GitHub's query syntax
search_github_issues with:
- query: "label:bug state:open"
- query: "author:username created:>2025-01-01"
- query: "involves:username type:pr"
- query: "repo:owner/name authentication"
```

## 📁 Architecture

The server follows a simple, focused architecture:

```
servers/github/
├── index.js              # Main server entry point
└── (planned)
    ├── modules/
    │   ├── issues.js     # Issue management (planned)
    │   ├── prs.js        # Pull request management (planned)
    │   └── search.js     # Advanced search (planned)
    └── utils/
        ├── auth.js       # GitHub authentication (planned)
        └── common.js     # Shared utilities (planned)
```

## 🔒 Security & Permissions

### Required GitHub Scopes

```javascript
// For public repositories
// No scopes required

// For private repositories
"repo"; // Full repository access

// For organization repositories
"read:org"; // Read organization membership
```

### Best Practices

- ✅ **Use Fine-Grained Tokens** when available for better security
- ✅ **Principle of Least Privilege** - only request needed scopes
- ✅ **Rotate Tokens Regularly** for security
- ✅ **Monitor Rate Limits** to avoid service interruption
- ✅ **Store Tokens Securely** - never commit to version control

## 🎯 Default Repository Configuration

The server supports a **default repository** configuration to simplify usage:

```json
{
  "env": {
    "DEFAULT_GITHUB_OWNER": "google",
    "DEFAULT_GITHUB_REPO": "site-kit-wp"
  }
}
```

**Benefits:**

- Simplified commands: "Show me issue 2345" (no need to specify owner/repo)
- Faster workflows for teams working on a primary repository
- Easy to override when needed: "Show me issue 123 from microsoft/vscode"

## 🚨 Troubleshooting

### Common Issues

**"Not Found" (404) errors:**

```bash
# Causes:
- Repository doesn't exist
- Repository is private (no token provided)
- Issue/PR number doesn't exist

# Solutions:
- Verify repository name spelling
- Add GitHub token for private repos
- Check issue/PR numbers exist
```

**"Forbidden" (403) errors:**

```bash
# Causes:
- Rate limit exceeded
- Insufficient token permissions
- Repository access restricted

# Solutions:
- Add GitHub token for higher rate limits
- Check token scopes
- Wait for rate limit reset
```

**"Unprocessable Entity" (422) errors:**

```bash
# Causes:
- Invalid search query syntax
- Invalid parameters

# Solutions:
- Check GitHub search syntax documentation
- Verify parameter formats
```

### Debug Steps

1. **Test Authentication:**

   ```bash
   # Check if token works
   curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user
   ```

2. **Verify Repository Access:**

   ```bash
   # Test repository visibility
   curl https://api.github.com/repos/owner/repo
   ```

3. **Check Rate Limits:**
   ```bash
   # View current rate limit status
   curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/rate_limit
   ```

## 🔮 Future Extensions

### Planned Modules

**Repository Analytics:**

- `get_repo_stats` - Repository statistics and insights
- `get_contributor_stats` - Contributor activity analysis
- `get_issue_trends` - Issue and PR trend analysis

**Advanced Search:**

- `search_code` - Search code within repositories
- `search_commits` - Search commit history
- `search_users` - Find users and organizations

**Automation Integration:**

- `create_issue` - Create new issues (write operations)
- `update_issue` - Update issue status and labels
- `create_pr_review` - Automated code review comments

### Integration Ideas

- **Cross-Repository Analysis**: Compare issues and patterns across repositories
- **Workflow Automation**: Trigger actions based on issue/PR changes
- **Team Analytics**: Track team productivity and review patterns
- **Release Management**: Automate release notes and changelog generation

## 📊 GitHub API Reference

### Rate Limiting

The server automatically handles GitHub's rate limiting:

```javascript
// Rate limit headers
"X-RateLimit-Limit": "5000",
"X-RateLimit-Remaining": "4999",
"X-RateLimit-Reset": "1625097600"
```

### Search Query Syntax

GitHub supports powerful search syntax:

```bash
# By type
"type:issue"              # Issues only
"type:pr"                # Pull requests only

# By state
"state:open"             # Open items
"state:closed"           # Closed items

# By labels
"label:bug"              # Items with bug label
"label:\"good first issue\"" # Labels with spaces

# By author/assignee
"author:username"        # Created by user
"assignee:username"      # Assigned to user

# By dates
"created:>2025-01-01"    # Created after date
"updated:<2025-01-01"    # Updated before date

# Combinations
"label:bug state:open author:username"
```

## 📄 License

Part of the `mcp-dev-workflow` project - MIT License

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch for new GitHub functionality
3. Follow the existing code patterns
4. Add comprehensive error handling and tests
5. Update this documentation with new capabilities
6. Submit a pull request

---

**Ready to extend GitHub capabilities?** The focused architecture makes it easy to add new GitHub integrations and tools!
