# Usage Guide

This guide provides practical examples and usage patterns for both GitHub and Google Workspace MCP servers.

## 🚀 Quick Reference

| Service              | Tool                      | Purpose            | Example                    |
| -------------------- | ------------------------- | ------------------ | -------------------------- |
| **GitHub**           | `get_github_issue`        | Get issue details  | "Show me issue 2345"       |
|                      | `get_github_pr`           | Get PR details     | "Get PR 1234"              |
|                      | `list_github_issues`      | Browse issues      | "List recent issues"       |
|                      | `list_github_prs`         | Browse PRs         | "Show open PRs"            |
|                      | `search_github_issues`    | Search issues/PRs  | "Find storybook issues"    |
| **Google Workspace** | `get_google_doc`          | Read documents     | "Read design doc at [URL]" |
|                      | `get_google_doc_metadata` | Get doc properties | "Doc metadata for [URL]"   |
|                      | `search_google_doc`       | Search within docs | "Find 'API' in the doc"    |

## 💬 Natural Language Usage

The power of MCP tools is **natural language interaction**. Instead of technical commands, simply describe what you want:

### GitHub Examples

- "Show me issue 2345" → Uses default repository (google/site-kit-wp)
- "Get details on PR #1234 from nodejs/node" → Override default repository
- "List the recent open issues" → Browse current work
- "Search for storybook-related issues" → Find related work
- "What pull requests are currently open for review?" → Check review queue

### Google Workspace Examples

- "Read the design doc at https://docs.google.com/document/d/..." → Extract document content
- "Search for 'authentication' in that document" → Find specific sections
- "What's the metadata for this Google Doc?" → Get document properties
- "Show me the content in markdown format" → Specify output format

## 📋 GitHub Usage

### Default Repository Configuration

The GitHub server is configured with **google/site-kit-wp** as the default repository, allowing simplified syntax:

**Simplified (uses defaults):**

- "Show me issue 2345"
- "List recent PRs"

**Explicit repository:**

- "Show me issue 123 from nodejs/node"
- "List PRs from facebook/react"

### GitHub Tools

#### 1. Getting Specific Issues

**Purpose:** Understand requirements, check status, review details

```bash
# Simplified (uses default repo)
get_github_issue with:
- issue_number: 2345

# Full syntax (other repos)
get_github_issue with:
  - owner: "nodejs"
  - repo: "node"
- issue_number: 123
```

**Natural Language:**

- "Show me issue 2345"
- "Get details on issue 11117"
- "What's the status of issue 2345?"

#### 2. Getting Pull Requests

**Purpose:** Code review preparation, understanding changes

```bash
get_github_pr with:
- pr_number: 1234
```

**What you get:**

- PR description and changes overview
- Files changed, additions/deletions
- Merge status and review comments
- Branch information

#### 3. Browsing Issues/PRs

**Purpose:** Project overview, finding work items

```bash
# Recent open issues
list_github_issues with:
- state: "open"
- per_page: 10

# Recent PRs
list_github_prs with:
- state: "open"
- per_page: 5
```

**Options:**

- `state`: "open", "closed", "all"
- `per_page`: 1-100 (default: 30)
- `page`: For pagination

#### 4. Searching Issues and PRs

**Purpose:** Research, finding related work

```bash
search_github_issues with:
- query: "storybook dependencies"
- type: "both"  # "issue", "pr", or "both"
```

**Advanced Search Syntax:**

- `"exact phrase"` - Exact phrase search
- `label:P1` - Issues with P1 label
- `author:username` - By specific author
- `created:2025-01-01..2025-07-01` - Date range
- `state:open dependencies` - Open issues about dependencies

### GitHub Workflows

#### Issue Analysis Workflow

```bash
1. "Show me issue 2345" → Get main requirements
2. "Search for inline data refactor issues" → Find related work
3. "List recent PRs" → Check current development
```

#### Code Review Workflow

```bash
1. "List open PRs" → See what needs review
2. "Get details on PR 1234" → Understand changes
3. "Search for storybook issues" → Find related context
```

## 📄 Google Workspace Usage

### Google Docs Tools

#### 1. Reading Documents

**Purpose:** Extract content from design docs, specifications, meeting notes

```bash
get_google_doc with:
- document_id: "https://docs.google.com/document/d/YOUR_DOCUMENT_ID/"
- format: "structured"  # "plain", "markdown", or "structured"
```

**Document ID formats:**

- Full URL: `https://docs.google.com/document/d/DOCUMENT_ID/`
- Document ID only: `1ABC2def3GHI4jkl5MNO6pqr7STU8vwx9YZA0BCD1EF`
- Shared links with parameters

**Output formats:**

- `"structured"` - Clean formatting with headings (default)
- `"markdown"` - Markdown with bold/italics
- `"plain"` - Plain text without formatting

#### 2. Document Metadata

**Purpose:** Check sharing settings, modification dates, properties

```bash
get_google_doc_metadata with:
- document_id: "1ABC2def3GHI4jkl5MNO6pqr7STU8vwx9YZA0BCD1EF"
```

**What you get:**

- Document title and ID
- Last modification date
- Page size and margin settings
- Revision information
- Sharing details

#### 3. Searching Within Documents

**Purpose:** Find specific sections, references, topics

```bash
search_google_doc with:
- document_id: "1ABC2def3GHI4jkl5MNO6pqr7STU8vwx9YZA0BCD1EF"
- search_text: "authentication flow"
- context_lines: 3  # Lines of context around matches
```

**Search features:**

- Case-insensitive search
- Partial word matching
- Context highlighting
- Line number references

### Google Workspace Workflows

#### Design Document Analysis

```bash
1. "Read the design doc at [URL]" → Extract full content
2. "Search for 'API endpoints' in this document" → Find implementation details
3. "Look for 'security' in the doc" → Check security considerations
```

#### Meeting Notes Research

```bash
1. "Get the meeting notes from [URL]" → Extract meeting content
2. "Search for 'TODO' in the notes" → Find action items
3. "Find mentions of 'decision' in the document" → Check outcomes
```

#### Specification Review

```bash
1. "Show me the technical specification" → Read full spec
2. "Search for 'requirement' in the spec" → Find requirements
3. "Look for 'example' in the document" → Find usage examples
```

## 🔍 Advanced Techniques

### GitHub Search Patterns

**By Priority:**

- `label:P1 state:open` - High priority open issues
- `label:"Good First Issue"` - Beginner-friendly issues

**By Type:**

- `label:bug` - Bug reports
- `label:enhancement` - Feature requests
- `is:pr is:open` - Open pull requests

**By Team/Author:**

- `author:username` - Work by specific person
- `assignee:username` - Assigned to specific person

### Google Docs Search Tips

**Technical Documentation:**

- "API", "endpoint", "interface", "schema"
- "authentication", "authorization", "security"
- "requirement", "specification", "constraint"

**Project Planning:**

- "milestone", "deadline", "timeline"
- "deliverable", "scope", "objective"
- "risk", "assumption", "dependency"

**Meeting Notes:**

- "action", "TODO", "follow-up"
- "decision", "agreed", "resolved"
- "blocker", "issue", "concern"

**Note:** When searching Google Docs, always specify the document URL/ID:

- "Search for 'blockers' in the project update at [Google Doc URL]"
- Not just "Search for 'blockers' in the project update"

## 💡 Best Practices

### Performance Tips

- **Use pagination:** For large repos, use `per_page` and `page` parameters
- **Be specific:** Narrow searches with labels, dates, or authors
- **Start broad:** Use general keywords first, then refine

### Search Strategy

1. **Start with natural language** - "Find storybook issues"
2. **Refine with filters** - Add labels, authors, or date ranges
3. **Check both issues and PRs** - Use `type: "both"`
4. **Try multiple search terms** - Use synonyms and related terms

### Document Access

- **Public docs:** Work immediately with any sharing settings
- **Private docs:** Share with service account email or use OAuth2
- **Large docs:** Use search to find specific sections efficiently

## 🆘 Common Issues

### Rate Limiting

**GitHub:**

- Without token: 60 requests/hour
- With token: 5,000 requests/hour
- **Solution:** Add GitHub token to environment

**Google Workspace:**

- Built-in rate limiting protects against API limits
- **Solution:** Wait for specified retry time

### Access Issues

**GitHub "404 Not Found":**

- Repository doesn't exist or is private
- **Solution:** Check spelling, add token for private repos

**Google "Permission denied":**

- Document not shared with service account
- **Solution:** Share document or verify OAuth2 access

### Search Issues

**No results found:**

- Try broader search terms
- Check spelling and syntax
- Use synonyms or related keywords
- Verify content exists in target

See the [Setup Guide](../setup/) for detailed troubleshooting steps.

## 🚀 Next Steps

- Explore [Examples](../examples/) for real-world workflows
- Check service-specific READMEs in `servers/` directories
- Set up GitHub tokens and Google authentication for full functionality
