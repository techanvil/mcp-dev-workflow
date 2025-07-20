# Set default repo for issue references

_Exported on 7/18/2025 at 15:06:26 GMT+1 from Cursor (1.1.3)_

---

**User**

@cursor_set_up_scalable_mcp_server_for_g.md @cursor_testing_the_mcp_dev_workflow_pro.md

I'd like to be able to provide a default repo so issues/PRs can be referred to by number alone. What's the best approach for this?

---

**Cursor**

Looking at your MCP server setup, I can see you're primarily working with the `google/site-kit-wp` repository. The best approach would be to add default repository configuration that allows you to refer to issues/PRs by number alone while still maintaining flexibility for other repos.

Let me implement this by modifying your existing setup:

```json
{
  "mcpServers": {
    "github-dev-workflow": {
      "command": "node",
      "args": [
        "/home/tom/git/techanvil/mcp-dev-workflow/servers/github/index.js"
      ],
      "env": {
        "GITHUB_TOKEN": ""
      }
    }
  }
}

->

{
  "mcpServers": {
    "github-dev-workflow": {
      "command": "node",
      "args": [
        "/home/tom/git/techanvil/mcp-dev-workflow/servers/github/index.js"
      ],
      "env": {
        "GITHUB_TOKEN": "",
        "DEFAULT_GITHUB_OWNER": "google",
        "DEFAULT_GITHUB_REPO": "site-kit-wp"
      }
    }
  }
}
```

```javascript
class GitHubMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: "github-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Initialize Octokit - will work with public repos without token
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN, // Optional for public repos
    });

    this.setupToolHandlers();
  }

->

class GitHubMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: "github-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Initialize Octokit - will work with public repos without token
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN, // Optional for public repos
    });

    // Set default repository from environment variables
    this.defaultOwner = process.env.DEFAULT_GITHUB_OWNER;
    this.defaultRepo = process.env.DEFAULT_GITHUB_REPO;

    this.setupToolHandlers();
  }
```

```javascript
    this.setupToolHandlers();
  }

  setupToolHandlers() {

->

    this.setupToolHandlers();
  }

  // Helper method to resolve owner and repo with defaults
  resolveRepository(args) {
    return {
      owner: args.owner || this.defaultOwner,
      repo: args.repo || this.defaultRepo,
    };
  }

  setupToolHandlers() {
```

```javascript
          {
            name: "get_github_issue",
            description: "Get details of a specific GitHub issue",
            inputSchema: {
              type: "object",
              properties: {
                owner: {
                  type: "string",
                  description: "Repository owner",
                },
                repo: {
                  type: "string",
                  description: "Repository name",
                },
                issue_number: {
                  type: "number",
                  description: "Issue number",
                },
              },
              required: ["owner", "repo", "issue_number"],
            },
          },

->

          {
            name: "get_github_issue",
            description: "Get details of a specific GitHub issue",
            inputSchema: {
              type: "object",
              properties: {
                owner: {
                  type: "string",
                  description: "Repository owner (optional, uses default if not provided)",
                },
                repo: {
                  type: "string",
                  description: "Repository name (optional, uses default if not provided)",
                },
                issue_number: {
                  type: "number",
                  description: "Issue number",
                },
              },
              required: ["issue_number"],
            },
          },
```

```javascript
          {
            name: "get_github_pr",
            description: "Get details of a specific GitHub pull request",
            inputSchema: {
              type: "object",
              properties: {
                owner: {
                  type: "string",
                  description: "Repository owner",
                },
                repo: {
                  type: "string",
                  description: "Repository name",
                },
                pr_number: {
                  type: "number",
                  description: "Pull request number",
                },
              },
              required: ["owner", "repo", "pr_number"],
            },
          },

->

          {
            name: "get_github_pr",
            description: "Get details of a specific GitHub pull request",
            inputSchema: {
              type: "object",
              properties: {
                owner: {
                  type: "string",
                  description: "Repository owner (optional, uses default if not provided)",
                },
                repo: {
                  type: "string",
                  description: "Repository name (optional, uses default if not provided)",
                },
                pr_number: {
                  type: "number",
                  description: "Pull request number",
                },
              },
              required: ["pr_number"],
            },
          },
```

```javascript
          {
            name: "list_github_issues",
            description: "List issues from a GitHub repository",
            inputSchema: {
              type: "object",
              properties: {
                owner: {
                  type: "string",
                  description: "Repository owner",
                },
                repo: {
                  type: "string",
                  description: "Repository name",
                },
                state: {
                  type: "string",
                  enum: ["open", "closed", "all"],
                  description: "Issue state filter",
                  default: "open",
                },
                per_page: {
                  type: "number",
                  description: "Number of results per page (max 100)",
                  default: 30,
                },
                page: {
                  type: "number",
                  description: "Page number",
                  default: 1,
                },
              },
              required: ["owner", "repo"],
            },
          },

->

          {
            name: "list_github_issues",
            description: "List issues from a GitHub repository",
            inputSchema: {
              type: "object",
              properties: {
                owner: {
                  type: "string",
                  description: "Repository owner (optional, uses default if not provided)",
                },
                repo: {
                  type: "string",
                  description: "Repository name (optional, uses default if not provided)",
                },
                state: {
                  type: "string",
                  enum: ["open", "closed", "all"],
                  description: "Issue state filter",
                  default: "open",
                },
                per_page: {
                  type: "number",
                  description: "Number of results per page (max 100)",
                  default: 30,
                },
                page: {
                  type: "number",
                  description: "Page number",
                  default: 1,
                },
              },
              required: [],
            },
          },
```

```javascript
          {
            name: "list_github_prs",
            description: "List pull requests from a GitHub repository",
            inputSchema: {
              type: "object",
              properties: {
                owner: {
                  type: "string",
                  description: "Repository owner",
                },
                repo: {
                  type: "string",
                  description: "Repository name",
                },
                state: {
                  type: "string",
                  enum: ["open", "closed", "all"],
                  description: "PR state filter",
                  default: "open",
                },
                per_page: {
                  type: "number",
                  description: "Number of results per page (max 100)",
                  default: 30,
                },
                page: {
                  type: "number",
                  description: "Page number",
                  default: 1,
                },
              },
              required: ["owner", "repo"],
            },
          },

->

          {
            name: "list_github_prs",
            description: "List pull requests from a GitHub repository",
            inputSchema: {
              type: "object",
              properties: {
                owner: {
                  type: "string",
                  description: "Repository owner (optional, uses default if not provided)",
                },
                repo: {
                  type: "string",
                  description: "Repository name (optional, uses default if not provided)",
                },
                state: {
                  type: "string",
                  enum: ["open", "closed", "all"],
                  description: "PR state filter",
                  default: "open",
                },
                per_page: {
                  type: "number",
                  description: "Number of results per page (max 100)",
                  default: 30,
                },
                page: {
                  type: "number",
                  description: "Page number",
                  default: 1,
                },
              },
              required: [],
            },
          },
```

```javascript
          {
            name: "search_github_issues",
            description: "Search issues and PRs in a GitHub repository",
            inputSchema: {
              type: "object",
              properties: {
                owner: {
                  type: "string",
                  description: "Repository owner",
                },
                repo: {
                  type: "string",
                  description: "Repository name",
                },
                query: {
                  type: "string",
                  description: "Search query",
                },
                type: {
                  type: "string",
                  enum: ["issue", "pr", "both"],
                  description: "Type of items to search",
                  default: "both",
                },
                per_page: {
                  type: "number",
                  description: "Number of results per page (max 100)",
                  default: 30,
                },
              },
              required: ["owner", "repo", "query"],
            },
          },

->

          {
            name: "search_github_issues",
            description: "Search issues and PRs in a GitHub repository",
            inputSchema: {
              type: "object",
              properties: {
                owner: {
                  type: "string",
                  description: "Repository owner (optional, uses default if not provided)",
                },
                repo: {
                  type: "string",
                  description: "Repository name (optional, uses default if not provided)",
                },
                query: {
                  type: "string",
                  description: "Search query",
                },
                type: {
                  type: "string",
                  enum: ["issue", "pr", "both"],
                  description: "Type of items to search",
                  default: "both",
                },
                per_page: {
                  type: "number",
                  description: "Number of results per page (max 100)",
                  default: 30,
                },
              },
              required: ["query"],
            },
          },
```

```javascript
  async getIssue({ owner, repo, issue_number }) {
    const response = await this.octokit.rest.issues.get({
      owner,
      repo,
      issue_number,
    });

->

  async getIssue(args) {
    const { owner, repo } = this.resolveRepository(args);
    const { issue_number } = args;

    if (!owner || !repo) {
      throw new Error("Repository owner and name must be provided either as parameters or in defaults");
    }

    const response = await this.octokit.rest.issues.get({
      owner,
      repo,
      issue_number,
    });
```

```javascript
  async getPullRequest({ owner, repo, pr_number }) {
    const response = await this.octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: pr_number,
    });

->

  async getPullRequest(args) {
    const { owner, repo } = this.resolveRepository(args);
    const { pr_number } = args;

    if (!owner || !repo) {
      throw new Error("Repository owner and name must be provided either as parameters or in defaults");
    }

    const response = await this.octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: pr_number,
    });
```

```javascript
  async listIssues({ owner, repo, state = "open", per_page = 30, page = 1 }) {
    const response = await this.octokit.rest.issues.listForRepo({
      owner,
      repo,
      state,
      per_page: Math.min(per_page, 100),
      page,
    });

->

  async listIssues(args) {
    const { owner, repo } = this.resolveRepository(args);
    const { state = "open", per_page = 30, page = 1 } = args;

    if (!owner || !repo) {
      throw new Error("Repository owner and name must be provided either as parameters or in defaults");
    }

    const response = await this.octokit.rest.issues.listForRepo({
      owner,
      repo,
      state,
      per_page: Math.min(per_page, 100),
      page,
    });
```

```javascript
  async listPullRequests({ owner, repo, state = "open", per_page = 30, page = 1 }) {
    const response = await this.octokit.rest.pulls.list({
      owner,
      repo,
      state,
      per_page: Math.min(per_page, 100),
      page,
    });

->

  async listPullRequests(args) {
    const { owner, repo } = this.resolveRepository(args);
    const { state = "open", per_page = 30, page = 1 } = args;

    if (!owner || !repo) {
      throw new Error("Repository owner and name must be provided either as parameters or in defaults");
    }

    const response = await this.octokit.rest.pulls.list({
      owner,
      repo,
      state,
      per_page: Math.min(per_page, 100),
      page,
    });
```

```javascript
  async listPullRequests({
    owner,
    repo,
    state = "open",
    per_page = 30,
    page = 1,
  }) {
    const response = await this.octokit.rest.pulls.list({
      owner,
      repo,
      state,
      per_page: Math.min(per_page, 100),
      page,
    });

->

  async listPullRequests(args) {
    const { owner, repo } = this.resolveRepository(args);
    const { state = "open", per_page = 30, page = 1 } = args;

    if (!owner || !repo) {
      throw new Error("Repository owner and name must be provided either as parameters or in defaults");
    }

    const response = await this.octokit.rest.pulls.list({
      owner,
      repo,
      state,
      per_page: Math.min(per_page, 100),
      page,
    });
```

```javascript
  async searchIssues({ owner, repo, query, type = "both", per_page = 30 }) {
    let searchQuery = `repo:${owner}/${repo} ${query}`;

    if (type === "issue") {
      searchQuery += " is:issue";
    } else if (type === "pr") {
      searchQuery += " is:pr";
    }

    const response = await this.octokit.rest.search.issuesAndPullRequests({
      q: searchQuery,
      per_page: Math.min(per_page, 100),
    });

->

  async searchIssues(args) {
    const { owner, repo } = this.resolveRepository(args);
    const { query, type = "both", per_page = 30 } = args;

    if (!owner || !repo) {
      throw new Error("Repository owner and name must be provided either as parameters or in defaults");
    }

    let searchQuery = `repo:${owner}/${repo} ${query}`;

    if (type === "issue") {
      searchQuery += " is:issue";
    } else if (type === "pr") {
      searchQuery += " is:pr";
    }

    const response = await this.octokit.rest.search.issuesAndPullRequests({
      q: searchQuery,
      per_page: Math.min(per_page, 100),
    });
```

````markdown
## 💬 Natural Language Usage

The beauty of MCP tools is that you can interact with them using **natural language** rather than technical commands. When chatting with an AI assistant like Cursor, simply describe what you want to do and the AI will translate your request into the appropriate tool calls.

->

## 🎯 Default Repository Configuration

This server is configured with a **default repository** (`google/site-kit-wp`), which means you can refer to issues and PRs by number alone without specifying the owner and repo each time.

### 📋 Simplified Syntax Examples

**Using defaults (recommended for site-kit-wp):**

- "Show me issue 2345" → Uses default `google/site-kit-wp`
- "Get PR 1234" → Uses default `google/site-kit-wp`
- "List recent issues" → Uses default `google/site-kit-wp`
- "Search for storybook issues" → Uses default `google/site-kit-wp`

**Override defaults for other repositories:**

- "Show me issue 123 from microsoft/vscode"
- "List PRs from facebook/react"
- "Search for bug in owner=angular, repo=angular"

### 🔧 Configuration

The default repository is set in the MCP configuration:

```json
"env": {
  "DEFAULT_GITHUB_OWNER": "google",
  "DEFAULT_GITHUB_REPO": "site-kit-wp"
}
```
````

To change defaults, update these values in `cursor-mcp-config.json` and restart Cursor.

## 💬 Natural Language Usage

The beauty of MCP tools is that you can interact with them using **natural language** rather than technical commands. When chatting with an AI assistant like Cursor, simply describe what you want to do and the AI will translate your request into the appropriate tool calls.

````

```markdown
**Getting Issues:**
- "Show me issue 2345 from google/site-kit-wp"
- "What's the details on site-kit-wp issue #11117?"
- "Get me the information about issue 2345"

->

**Getting Issues:**
- "Show me issue 2345" (uses default repo)
- "What's the details on issue 11117?" (uses default repo)
- "Get me the information about issue 2345 from google/site-kit-wp" (explicit repo)
````

```markdown
**Getting Issues:**

- "Show me issue 2345 from google/site-kit-wp"
- "What's the details on site-kit-wp issue #11117?"
- "Get me the information about issue 2345"

->

**Getting Issues:**

- "Show me issue 2345" (uses default repo)
- "What's the details on issue 11117?" (uses default repo)
- "Get me the information about issue 2345 from google/site-kit-wp" (explicit repo)
```

```markdown
**Browsing Issues/PRs:**

- "List the recent open issues from site-kit-wp"
- "Show me the latest 5 pull requests from google/site-kit-wp"
- "What are the current open issues in the site-kit-wp repo?"
- "Give me a list of closed PRs from the last week"

->

**Browsing Issues/PRs:**

- "List the recent open issues" (uses default repo)
- "Show me the latest 5 pull requests" (uses default repo)
- "What are the current open issues?" (uses default repo)
- "Give me a list of closed PRs from google/site-kit-wp" (explicit repo)
```

```markdown
**Browsing Issues/PRs:**

- "List the recent open issues from site-kit-wp"
- "Show me the latest 5 pull requests from google/site-kit-wp"
- "What are the current open issues in the site-kit-wp repo?"
- "Give me a list of closed PRs from the last week"

->

**Browsing Issues/PRs:**

- "List the recent open issues" (uses default repo)
- "Show me the latest 5 pull requests" (uses default repo)
- "What are the current open issues?" (uses default repo)
- "Give me a list of closed PRs from google/site-kit-wp" (explicit repo)
```

```markdown
**Searching:**

- "Search for storybook-related issues in site-kit-wp"
- "Find any issues about 'dashboard sharing' in google/site-kit-wp"
- "Look for P1 priority issues in the site-kit-wp repository"
- "Search for pull requests related to 'inline data'"

->

**Searching:**

- "Search for storybook-related issues" (uses default repo)
- "Find any issues about 'dashboard sharing'" (uses default repo)
- "Look for P1 priority issues" (uses default repo)
- "Search for pull requests related to 'inline data' in facebook/react" (explicit repo)
```

```markdown
**Searching:**

- "Search for storybook-related issues in site-kit-wp"
- "Find any issues about 'dashboard sharing' in google/site-kit-wp"
- "Look for P1 priority issues in the site-kit-wp repository"
- "Search for pull requests related to 'inline data'"

->

**Searching:**

- "Search for storybook-related issues" (uses default repo)
- "Find any issues about 'dashboard sharing'" (uses default repo)
- "Look for P1 priority issues" (uses default repo)
- "Search for pull requests related to 'inline data' in facebook/react" (explicit repo)
```

```markdown
**Getting PRs:**

- "Show me pull request 1234 from site-kit-wp"
- "Get details on the latest PR from google/site-kit-wp"
- "What changes are in PR #1234?"

->

**Getting PRs:**

- "Show me pull request 1234" (uses default repo)
- "Get details on the latest PR" (uses default repo)
- "What changes are in PR #1234?" (uses default repo)
```

```markdown
**Getting PRs:**

- "Show me pull request 1234 from site-kit-wp"
- "Get details on the latest PR from google/site-kit-wp"
- "What changes are in PR #1234?"

->

**Getting PRs:**

- "Show me pull request 1234" (uses default repo)
- "Get details on the latest PR" (uses default repo)
- "What changes are in PR #1234?" (uses default repo)
```

```markdown
### 1. Getting Specific Issues

**Use Case:** You want to understand a specific issue mentioned in discussions or code comments.
```

get_github_issue with:

- owner: "google"
- repo: "site-kit-wp"
- issue_number: 2345

```

->

### 1. Getting Specific Issues

**Use Case:** You want to understand a specific issue mentioned in discussions or code comments.

**Simplified (uses default repo):**
```

get_github_issue with:

- issue_number: 2345

```

**Full syntax (for other repos):**
```

get_github_issue with:

- owner: "google"
- repo: "site-kit-wp"
- issue_number: 2345

```

```

```markdown
### 2. Getting Pull Request Details

**Use Case:** Understanding what changes a PR introduces before reviewing or merging.
```

get_github_pr with:

- owner: "google"
- repo: "site-kit-wp"
- pr_number: 1234

```

->

### 2. Getting Pull Request Details

**Use Case:** Understanding what changes a PR introduces before reviewing or merging.

**Simplified (uses default repo):**
```

get_github_pr with:

- pr_number: 1234

```

**Full syntax (for other repos):**
```

get_github_pr with:

- owner: "google"
- repo: "site-kit-wp"
- pr_number: 1234

```

```

```markdown
### 3. Browsing Recent Issues

**Use Case:** Getting an overview of current work or finding issues to work on.
```

list_github_issues with:

- owner: "google"
- repo: "site-kit-wp"
- state: "open"
- per_page: 10

```

->

### 3. Browsing Recent Issues

**Use Case:** Getting an overview of current work or finding issues to work on.

**Simplified (uses default repo):**
```

list_github_issues with:

- state: "open"
- per_page: 10

```

**Full syntax (for other repos):**
```

list_github_issues with:

- owner: "google"
- repo: "site-kit-wp"
- state: "open"
- per_page: 10

```

```

Perfect! ✅ I've successfully implemented **default repository configuration** for your GitHub MCP server. Here's what I've done:

## 🎯 Key Changes Made:

### **1. Configuration Updates**

- **`cursor-mcp-config.json`**: Added default repository environment variables:
  ```json
  "env": {
    "GITHUB_TOKEN": "",
    "DEFAULT_GITHUB_OWNER": "google",
    "DEFAULT_GITHUB_REPO": "site-kit-wp"
  }
  ```

### **2. Server Enhancements**

- **Optional Parameters**: Made `owner` and `repo` optional in all tool schemas
- **Default Resolution**: Added `resolveRepository()` method to use defaults when not specified
- **Error Handling**: Graceful fallback with clear error messages

### **3. Updated Documentation**

- **`USAGE.md`**: Added comprehensive section on default repository usage
- **Simplified Examples**: Shows both simplified and full syntax
- **Natural Language**: Updated examples to use the simplified approach

## 🚀 How It Works Now:

### **Before (always required):**

```
"Show me issue 2345 from google/site-kit-wp"
```

### **After (simplified):**

```
"Show me issue 2345" ← Uses default repo automatically!
```

## 📋 Available Simplified Commands:

**Issues & PRs by number:**

- "Show me issue 2345"
- "Get PR 1234"
- "What's in issue 11117?"

**Browsing:**

- "List recent issues"
- "Show me open pull requests"
- "List closed issues from last week"

**Searching:**

- "Search for storybook issues"
- "Find dashboard-related PRs"
- "Look for P1 priority items"

## 🔧 Flexibility Maintained:

You can still override defaults for other repositories:

- "Show me issue 123 from microsoft/vscode"
- "List PRs from facebook/react"
- "Search for bugs in angular/angular"

## ✅ Ready to Test!

Let's test the simplified syntax right now! Try asking me:

**"Show me issue 2345"** ← This should now work with just the number!

The server will automatically use `google/site-kit-wp` as the default repository, making your workflow much more efficient for day-to-day site-kit-wp development work. 🎉

```json
  "env": {
    "GITHUB_TOKEN": "",
    "DEFAULT_GITHUB_OWNER": "google",
    "DEFAULT_GITHUB_REPO": "site-kit-wp"
  }
```

```plaintext
"Show me issue 2345 from google/site-kit-wp"
```

```plaintext
"Show me issue 2345" ← Uses default repo automatically!
```

---

**User**

Show me issue 10988

---

**Cursor**

🎉 **Perfect! The default repository configuration is working!** I successfully retrieved issue #10988 using just the issue number.

# Issue #10988: Refactor and consolidate all module inline data into a single method

## 📋 Overview

- **Status:** Open ✅
- **Priority:** P2
- **Type:** Enhancement, Good First Issue
- **Language:** PHP
- **Team:** Team M
- **Created:** June 24, 2025 | **Updated:** July 17, 2025
- **Author:** zutigrm

## 🎯 Goal

Create a unified approach for module inline data by implementing:

- **New Interface:** `Module_With_Inline_Data` - enforces `get_inline_data()` method
- **New Trait:** `Module_With_Inline_Data_Trait` - provides `register_inline_data()` method
- **Consolidation:** Replace multiple inline data methods with single `get_inline_data()` method

## ✅ Progress Status

**Interface & Trait:** ✅ **Completed**

- `Module_With_Inline_Data` interface created
- `Module_With_Inline_Data_Trait` trait implemented

**Module Refactoring:** ✅ **Completed**
Three modules successfully refactored:

- `Analytics_4.php` ✅
- `Ads.php` ✅
- `Sign_In_With_Google.php` ✅

**Remaining Task:** 🔍 **In Progress**

- Search for any newer modules that also use inline data (added after this implementation brief)

## 🔧 Technical Implementation

- **Hook:** Uses `googlesitekit_inline_modules_data` filter
- **Pattern:** Interface + Trait approach for consistency
- **Method:** Single `get_inline_data()` replaces multiple methods
- **Registration:** `register_inline_data()` in module's `register()` method

## 🧪 QA Requirements

- **Smoke test** the three affected modules for regressions
- **Test coverage** updated for new method names

## 🔗 Links

- **GitHub:** https://github.com/google/site-kit-wp/issues/10988
- **Related:** Issue #10165 (original proposal)

---

**Great! Your simplified syntax is working perfectly.** You can now refer to any site-kit-wp issue by number alone! 🚀
