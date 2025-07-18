# Testing the mcp-dev-workflow project

_Exported on 7/18/2025 at 14:54:44 GMT+1 from Cursor (1.1.3)_

---

**User**

use ths exported chat for context, this is what we've set up here.

I have, however renamed the project to mcp-dev-workflow.

Please provide instructions on how I can now interact and test this out in this chat

---

**Cursor**

Looking at the exported chat, I can see you've already set up a comprehensive GitHub MCP server! Let me help you test and interact with it. Since you've renamed the project to `mcp-dev-workflow`, let me first check the current setup and then guide you through testing it.

Perfect! I can see your MCP server setup is complete. However, I notice the path in `cursor-mcp-config.json` needs to be updated to match your current workspace location. Let me fix that and then guide you through testing it.

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
```

Excellent! Dependencies are already installed. Now let's test the MCP server to make sure it runs correctly:

Perfect! 🎉 Your MCP server is working correctly. I can see it started up with "GitHub MCP server running on stdio" which means everything is configured properly.

## 🚀 How to Test and Interact with Your MCP Server

### Step 1: Configure Cursor (One-time setup)

You need to add the MCP server to your Cursor configuration:

**Add this configuration to your Cursor MCP settings:**

1. **Linux**: Open `~/.cursor/mcp.json` (create if it doesn't exist)
2. **Copy the entire contents** from the output above into that file
3. **Restart Cursor** completely

### Step 2: Test in This Chat!

Once Cursor restarts, you should be able to use these tools right here in this conversation:

## 🧪 Test Commands to Try:

**1. Get the specific issue you mentioned:**

```
get_github_issue with owner="google", repo="site-kit-wp", issue_number=10988
```

**2. List recent issues from site-kit-wp:**

```
list_github_issues with owner="google", repo="site-kit-wp", state="open", per_page=5
```

**3. Search for issues:**

```
search_github_issues with owner="google", repo="site-kit-wp", query="storybook", type="both"
```

**4. Get a pull request:**

```
list_github_prs with owner="google", repo="site-kit-wp", state="open", per_page=3
```

### Step 3: Optional - Add GitHub Token for Higher Rate Limits

```plaintext
get_github_issue with owner="google", repo="site-kit-wp", issue_number=10988
```

```plaintext
list_github_issues with owner="google", repo="site-kit-wp", state="open", per_page=5
```

```plaintext
search_github_issues with owner="google", repo="site-kit-wp", query="storybook", type="both"
```

```plaintext
list_github_prs with owner="google", repo="site-kit-wp", state="open", per_page=3
```

If you want higher rate limits or access to private repos:

```bash
cp env.example .env
# Edit .env and add your GitHub token from https://github.com/settings/tokens
```

## 📋 Available Tools Summary:

Your MCP server provides these 5 powerful tools:

| Tool                   | Purpose                 | Example Use                    |
| ---------------------- | ----------------------- | ------------------------------ |
| `get_github_issue`     | Get detailed issue info | Issue #10988 analysis          |
| `get_github_pr`        | Get detailed PR info    | Review specific PRs            |
| `list_github_issues`   | List repository issues  | Recent open issues             |
| `list_github_prs`      | List repository PRs     | Current PRs in review          |
| `search_github_issues` | Search issues/PRs       | Find "storybook" related items |

## ✅ Ready to Test!

1. **Add the config to Cursor** (`~/.cursor/mcp.json`)
2. **Restart Cursor**
3. **Come back to this chat** and try the test commands above!

The server works with **any public GitHub repository**, so you can explore other repos too. Once you restart Cursor, just ask me to use any of the tools and I'll be able to interact with GitHub through your MCP server! 🚀

```shellscript
cp env.example .env
# Edit .env and add your GitHub token from https://github.com/settings/tokens
```

```shellscript
cp env.example .env
# Edit .env and add your GitHub token from https://github.com/settings/tokens
```

---

**User**

Is reloading the window sufficient?

---

**Cursor**

Good question! For MCP server configuration changes, typically you need a **full Cursor restart** rather than just reloading the window, because MCP servers are initialized when Cursor starts up.

However, let's try the reload first since it's faster:

## 🔄 Try This Order:

**1. First, try reloading the window:**

- `Ctrl+Shift+P` → "Developer: Reload Window"
- Or `Ctrl+R` in most cases

**2. If that doesn't work, full restart:**

- Close Cursor completely
- Reopen Cursor

## 🧪 How to Test if it Worked:

After reloading/restarting, come back to this chat and I'll test the MCP server for you! Just ask me to:

- "Get issue 10988 from google/site-kit-wp"
- "List recent issues from site-kit-wp"

If I can successfully use the GitHub MCP tools, then the reload worked. If I get errors like "tool not available," then you'll need the full restart.

**Why reload might not be enough:** MCP servers run as separate processes that Cursor spawns on startup, so the configuration is typically only read during the initial startup process.

Try the reload first - if it works, great! If not, we'll know you need the full restart. Let me know when you're ready to test! 🚀

---

**User**

Get issue 10988 from google/site-kit-wp

---

**Cursor**

🎉 **Success! Your MCP server is working perfectly!**

I was able to retrieve issue #10988 from google/site-kit-wp. Here's what I found:

## Issue #10988: Refactor and consolidate all module inline data into a single method

**📋 Summary:**

- **Status:** Open
- **Priority:** P2
- **Type:** Enhancement, Good First Issue
- **Language:** PHP
- **Team:** Team M
- **Created:** June 24, 2025 | **Updated:** July 17, 2025
- **Author:** zutigrm

**🎯 Goal:**
Refactor all modules to use a consistent pattern for inline data by creating:

- A new `Module_With_Inline_Data` interface
- A new `Module_With_Inline_Data_Trait` trait
- Consolidating multiple inline data methods into a single `get_inline_data` method

**✅ Progress:**

- Interface and trait have been implemented ✓
- Three modules need refactoring: Analytics_4, Ads, and Sign_In_With_Google ✓
- Need to search for any newer modules that also use inline data

**🔗 Link:** https://github.com/google/site-kit-wp/issues/10988

---

## ✨ Your MCP Server is Ready!

Since this worked, it means the window reload was sufficient! You can now use all the GitHub tools:

**Try these other commands:**

- "List recent open issues from site-kit-wp"
- "Search for storybook issues in site-kit-wp"
- "Get pull request #[number] from google/site-kit-wp"

The MCP server is working with any public GitHub repository, so you can explore other repos too! 🚀

---

**User**

List recent open issues from site-kit-wp"

---

**Cursor**

Perfect! Here are the **recent open issues** from the Google Site Kit WordPress repository:

## 🔍 Recent Open Issues (Last 3 shown)

### **#11117** - Investigate Gutenberg blockEditor warnings in E2E setup

- **Author:** benbowler
- **Created:** July 17, 2025 (Most Recent)
- **Type:** Investigation/Feature
- **Issue:** Looking into `Gutenberg blockEditor.transformStyles warnings` in block editor E2E setup
- **🔗 Link:** https://github.com/google/site-kit-wp/issues/11117

---

### **#11115** - `adminURL` from base data breaks with existing URL query args

- **Author:** xipasduarte
- **Created:** July 16, 2025
- **Type:** Bug
- **Issue:** When other plugins add query arguments to `admin_url()`, the frontend base data link breaks
- **🔗 Link:** https://github.com/google/site-kit-wp/issues/11115

---

### **#11109** - Lowercase the "s" in all dashboard sharing references

- **Author:** jamesozzie
- **Created:** July 16, 2025
- **Type:** Bug (UI/Text)
- **Issue:** Inconsistent capitalization in dashboard sharing text - need to lowercase "s" in references
- **🔗 Link:** https://github.com/google/site-kit-wp/issues/11109

---

## 🚀 Want to explore more?

**Try these commands:**

- "Get details on issue 11117" (for the Gutenberg investigation)
- "Search for 'dashboard' issues in site-kit-wp"
- "List recent pull requests from site-kit-wp"
- "Search for 'storybook' issues" (since that was mentioned in your original issue)

Your MCP server is working great! 🎉

---

**User**

add some documentation on usage to a file in a sensible location

---

**Cursor**

I'll create a comprehensive usage documentation file. Looking at your project structure, I think a dedicated `USAGE.md` file would be the most sensible location - it keeps the main README focused on setup while providing detailed usage examples.

```markdown
# MCP GitHub Server Usage Guide

This guide provides practical examples and use cases for the GitHub MCP server tools. Once you've completed the setup in [README.md](./README.md), you can use these tools in any AI assistant that supports MCP (like Cursor).

## 🚀 Quick Reference

| Tool                   | Purpose                      | Use When                                              |
| ---------------------- | ---------------------------- | ----------------------------------------------------- |
| `get_github_issue`     | Get detailed issue info      | Analyzing specific issues, understanding requirements |
| `get_github_pr`        | Get detailed PR info         | Code review, understanding changes                    |
| `list_github_issues`   | Browse repository issues     | Finding work items, tracking progress                 |
| `list_github_prs`      | Browse repository PRs        | Monitoring reviews, checking status                   |
| `search_github_issues` | Search issues/PRs by keyword | Finding related work, research                        |

## 📋 Detailed Usage Examples

### 1. Getting Specific Issues

**Use Case:** You want to understand a specific issue mentioned in discussions or code comments.
```

get_github_issue with:

- owner: "google"
- repo: "site-kit-wp"
- issue_number: 10988

```

**What you'll get:**
- Full issue description and requirements
- Current status and labels
- Creation/update dates
- Author information
- Direct link to GitHub

**Pro Tip:** Use this when reviewing code that references issue numbers in comments.

---

### 2. Getting Pull Request Details

**Use Case:** Understanding what changes a PR introduces before reviewing or merging.

```

get_github_pr with:

- owner: "google"
- repo: "site-kit-wp"
- pr_number: 1234

```

**What you'll get:**
- PR description and changes overview
- Files changed, additions/deletions count
- Merge status and review comments
- Branch information (base ← head)
- Draft status and merge conflicts

**Pro Tip:** Great for understanding the scope of changes before a detailed code review.

---

### 3. Browsing Recent Issues

**Use Case:** Getting an overview of current work or finding issues to work on.

```

list_github_issues with:

- owner: "google"
- repo: "site-kit-wp"
- state: "open"
- per_page: 10

```

**Filtering Options:**
- `state`: "open", "closed", or "all"
- `per_page`: 1-100 (default: 30)
- `page`: For pagination

**Pro Tip:** Use `per_page: 5` for quick overviews, `per_page: 50` for comprehensive lists.

---

### 4. Finding Pull Requests

**Use Case:** Checking what's currently in review or recently merged.

```

list_github_prs with:

- owner: "google"
- repo: "site-kit-wp"
- state: "open"
- per_page: 5

```

**Common Patterns:**
- `state: "open"` - Current PRs under review
- `state: "closed"` - Recently merged/closed PRs
- `state: "all"` - Complete PR history

---

### 5. Searching Issues and PRs

**Use Case:** Research related work, find similar issues, or locate specific topics.

```

search_github_issues with:

- owner: "google"
- repo: "site-kit-wp"
- query: "storybook dependencies"
- type: "both"

````

**Search Tips:**
- `type: "issue"` - Issues only
- `type: "pr"` - Pull requests only
- `type: "both"` - Issues and PRs (default)

**Effective Search Queries:**
- `"error handling"` - Exact phrase
- `bug label:P1` - Bugs with priority 1 label
- `storybook updated` - Multiple keywords
- `author:username` - By specific author

## 🎯 Real-World Workflows

### Workflow 1: Issue Analysis & Planning

```bash
# 1. Get the main issue details
get_github_issue → owner: "google", repo: "site-kit-wp", issue_number: 10988

# 2. Search for related issues
search_github_issues → query: "inline data refactor", type: "both"

# 3. Check recent similar work
search_github_issues → query: "module interface trait", type: "pr"
````

**Use Case:** Understanding requirements and checking for related work before starting development.

---

### Workflow 2: Code Review Preparation

```bash
# 1. List current PRs
list_github_prs → state: "open", per_page: 10

# 2. Get details on specific PR
get_github_pr → pr_number: [from list above]

# 3. Check related issues
search_github_issues → query: "keywords from PR title"
```

**Use Case:** Preparing for code review by understanding context and related work.

---

### Workflow 3: Project Status Check

```bash
# 1. Recent activity overview
list_github_issues → state: "open", per_page: 5
list_github_prs → state: "open", per_page: 5

# 2. Check specific priority items
search_github_issues → query: "label:P1", type: "issue"

# 3. Review recent closures
list_github_issues → state: "closed", per_page: 10
```

**Use Case:** Getting a quick project status update or preparing for team meetings.

## 🔍 Advanced Search Techniques

### GitHub Search Syntax

The `search_github_issues` tool supports GitHub's full search syntax:

```bash
# Search by labels
query: "label:bug label:P1"

# Search by author
query: "author:username type:issue"

# Search by date range
query: "created:2025-01-01..2025-07-01"

# Search in title only
query: "storybook in:title"

# Search open issues only
query: "state:open dependencies"

# Exclude certain terms
query: "storybook -documentation"
```

### Repository-Specific Patterns

**For site-kit-wp:**

```bash
# Good first issues
query: "label:\"Good First Issue\""

# P1 priority items
query: "label:P1 state:open"

# PHP-related issues
query: "label:PHP"

# Team-specific work
query: "label:\"Team M\""
```

## 💡 Tips & Best Practices

### Performance Tips

- **Use pagination:** For large repos, use `per_page` and `page` parameters
- **Be specific:** Narrow searches with labels, authors, or date ranges
- **Cache results:** Save important issue/PR info locally for reference

### Search Strategy

1. **Start broad:** Use general keywords first
2. **Refine with filters:** Add labels, dates, or authors to narrow results
3. **Check both issues and PRs:** Use `type: "both"` to avoid missing related work

### Rate Limiting

- **Public repos:** 60 requests/hour without token
- **With GitHub token:** 5,000 requests/hour
- **Pro tip:** Add a GitHub token to `.env` for better performance

## 🆘 Troubleshooting

### Common Issues

**"Tool not available" errors:**

- Ensure MCP server is configured in Cursor (`~/.cursor/mcp.json`)
- Restart Cursor completely (not just reload window)
- Check that the server path is correct

**"Repository not found" errors:**

- Verify owner/repo spelling (case-sensitive)
- For private repos, ensure GitHub token has access
- Check if repository exists and is public

**Rate limit errors:**

- Add GitHub token to `.env` file
- Reduce request frequency
- Wait for rate limit to reset (hourly)

**Search returns no results:**

- Try broader search terms
- Check spelling and syntax
- Verify the repository has issues/PRs matching your criteria

### Debug Steps

1. **Test server directly:**

   ```bash
   npm run start:github
   # Should show "GitHub MCP server running on stdio"
   ```

2. **Verify configuration:**

   ```bash
   cat cursor-mcp-config.json
   # Check path is correct for your system
   ```

3. **Test with simple query:**
   ```
   list_github_issues → owner: "google", repo: "site-kit-wp", per_page: 1
   ```

## 🚀 Next Steps

- **Explore other repositories:** The server works with any public GitHub repo
- **Set up GitHub token:** For better performance and private repo access
- **Create shortcuts:** Save common queries for frequently accessed repos
- **Integrate with workflows:** Use in combination with other development tools

---

**Need help?** Check the main [README.md](./README.md) for setup instructions or create an issue in this repository.

````

Perfect! ✅ I've created a comprehensive **`USAGE.md`** file in your project root that provides detailed documentation on how to use your GitHub MCP server.

## 📚 What's Included:

### **🚀 Quick Reference Table**
- All 5 tools with their purposes and use cases

### **📋 Detailed Examples**
- Step-by-step usage for each tool
- Real parameters using your site-kit-wp repository
- What you'll get from each tool

### **🎯 Real-World Workflows**
- **Issue Analysis & Planning** - Research before development
- **Code Review Preparation** - Understanding PR context
- **Project Status Check** - Team meeting prep

### **🔍 Advanced Techniques**
- GitHub search syntax (`label:P1`, `author:username`, etc.)
- Repository-specific patterns for site-kit-wp
- Performance optimization tips

### **🆘 Troubleshooting Section**
- Common issues and solutions
- Debug steps for configuration problems
- Rate limiting guidance

## 🎯 Key Features:

✅ **Practical Examples** - Uses your actual repo (google/site-kit-wp)
✅ **Copy-Paste Ready** - All examples can be used directly in chat
✅ **Progressive Complexity** - From basic to advanced usage
✅ **Troubleshooting** - Real solutions for common problems

The documentation is now in the perfect location (`USAGE.md` at project root) where developers can easily find it and reference it while working with your MCP server! 🚀

**Try it out:** You can now test any of the examples from the usage guide right here in this chat!

---

**User**

please add some information on how to use natural language to use these tools

---

**Cursor**

I'll add a section on natural language usage to help users understand how to interact conversationally with the MCP tools.

```markdown
| `search_github_issues` | Search issues/PRs by keyword | Finding related work, research                        |

## 📋 Detailed Usage Examples

->

| `search_github_issues` | Search issues/PRs by keyword | Finding related work, research                        |

## 💬 Natural Language Usage

The beauty of MCP tools is that you can interact with them using **natural language** rather than technical commands. When chatting with an AI assistant like Cursor, simply describe what you want to do and the AI will translate your request into the appropriate tool calls.

### 🗣️ Natural Language Examples

Instead of technical tool calls, you can say:

**Getting Issues:**
- "Show me issue 10988 from google/site-kit-wp"
- "What's the details on site-kit-wp issue #11117?"
- "Get me the information about issue 10988"

**Browsing Issues/PRs:**
- "List the recent open issues from site-kit-wp"
- "Show me the latest 5 pull requests from google/site-kit-wp"
- "What are the current open issues in the site-kit-wp repo?"
- "Give me a list of closed PRs from the last week"

**Searching:**
- "Search for storybook-related issues in site-kit-wp"
- "Find any issues about 'dashboard sharing' in google/site-kit-wp"
- "Look for P1 priority issues in the site-kit-wp repository"
- "Search for pull requests related to 'inline data'"

**Getting PRs:**
- "Show me pull request 1234 from site-kit-wp"
- "Get details on the latest PR from google/site-kit-wp"
- "What changes are in PR #1234?"

### 🎯 Conversation Tips

**Be Specific About:**
- **Repository**: "google/site-kit-wp" or just "site-kit-wp" (context helps)
- **Numbers**: "issue 10988" or "PR #1234"
- **Scope**: "recent", "open", "closed", "last 5"

**Natural Phrases That Work:**
- "Show me..." / "Get me..." / "Find..."
- "What's the status of..." / "Tell me about..."
- "List the..." / "Browse the..."
- "Search for..." / "Look for..."

**Examples in Context:**
````

You: "I'm working on issue 10988, can you show me the details?"
AI: [Uses get_github_issue tool automatically]

You: "Are there any other issues related to storybook in this repo?"
AI: [Uses search_github_issues with query "storybook"]

You: "What pull requests are currently open for review?"
AI: [Uses list_github_prs with state="open"]

```

### 🔄 How It Works

1. **You speak naturally** - "Show me recent issues about storybook"
2. **AI interprets intent** - Recognizes you want to search issues
3. **AI calls appropriate tool** - `search_github_issues` with query="storybook"
4. **AI presents results** - Formatted, human-readable response

**No need to remember:**
- Tool names (`get_github_issue`, `list_github_prs`, etc.)
- Parameter names (`owner`, `repo`, `issue_number`, etc.)
- JSON syntax or technical formatting

Just **describe what you want** and let the AI handle the technical details!

## 📋 Detailed Usage Examples
```

Perfect! ✅ I've added a comprehensive **"Natural Language Usage"** section to your `USAGE.md` file that explains how to interact conversationally with the MCP tools.

## 🌟 What I Added:

### **💬 Natural Language Usage Section**

- **Real conversation examples** instead of technical syntax
- **Practical phrases** that users can copy and use immediately
- **Context-aware tips** for better AI interpretation

### **Key Features:**

**🗣️ Natural Examples:**

- "Show me issue 10988 from google/site-kit-wp"
- "Search for storybook-related issues in site-kit-wp"
- "What pull requests are currently open for review?"

**🎯 Conversation Tips:**

- How to be specific about repos, numbers, and scope
- Natural phrases that work well ("Show me...", "Find...", "List...")
- Real conversation examples with AI responses

**🔄 How It Works:**

- Step-by-step explanation of natural language → tool call → results
- Emphasis that users don't need to remember technical syntax
- Focus on describing intent rather than technical commands

## 💡 Why This Matters:

**Before:** Users had to remember technical syntax like:

```
get_github_issue with owner="google", repo="site-kit-wp", issue_number=10988
```

**Now:** Users can simply say:

```
"Show me issue 10988 from site-kit-wp"
```

The documentation now shows users that they can **talk naturally** to you (the AI) and you'll automatically translate their requests into the appropriate MCP tool calls. This makes the GitHub MCP server much more accessible and user-friendly! 🚀

**Try it yourself:** "Find any issues about dashboard sharing in site-kit-wp" - and I'll automatically use the search tool for you!

```plaintext
get_github_issue with owner="google", repo="site-kit-wp", issue_number=10988
```

```plaintext
"Show me issue 10988 from site-kit-wp"
```
