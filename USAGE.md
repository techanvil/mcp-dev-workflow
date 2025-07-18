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

```
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
```

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
```

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
