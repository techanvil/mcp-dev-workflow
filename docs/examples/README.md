# Examples & Workflows

This section provides real-world examples and common workflows using the MCP servers.

## 🎯 Quick Start Examples

### GitHub Examples

```bash
# Get issue details (uses default repo: google/site-kit-wp)
"Show me issue 2345"

# List recent work
"List the last 5 open issues"
"Show me current pull requests"

# Search for related work
"Find issues about storybook dependencies"
"Search for authentication-related PRs"

# Cross-repository work
"Get issue 123 from microsoft/vscode"
"List PRs from facebook/react"
```

### Google Workspace Examples

```bash
# Read documents
"Read the design doc at https://docs.google.com/document/d/1CzPZhhs.../"
"Show me the content of that Google Doc in markdown format"

# Search within documents
"Search for 'API endpoints' in the design document"
"Find mentions of 'authentication flow' in that doc"

# Document properties
"What's the metadata for this Google Doc?"
"When was this document last modified?"
```

## 🔄 Real-World Workflows

### Workflow 1: Feature Development Planning

**Scenario:** Starting work on a new feature

```bash
1. "Show me issue 2345"
   → Get requirements and acceptance criteria

2. "Search for similar feature issues"
   → Find related work and patterns

3. "Read the design doc at [URL]"
   → Understand technical specifications

4. "Search for 'API design' in the design doc"
   → Find relevant implementation details

5. "List recent PRs related to this area"
   → Check current development activity
```

### Workflow 2: Code Review Preparation

**Scenario:** Preparing to review a pull request

```bash
1. "Get details on PR 1234"
   → Understand the changes being made

2. "Show me the issue this PR addresses"
   → Get context and requirements

3. "Read the technical specification for this feature"
   → Understand expected behavior

4. "Search for 'testing requirements' in the spec"
   → Check what should be tested

5. "Find any related issues or discussions"
   → Get full context
```

### Workflow 3: Bug Investigation

**Scenario:** Investigating a reported bug

```bash
1. "Show me issue 5678"
   → Get bug report details

2. "Search for similar bug reports"
   → Find patterns or previous fixes

3. "List recent PRs that might be related"
   → Check if recent changes caused the issue

4. "Read the troubleshooting guide at [Google Doc URL]"
   → Get debugging procedures

5. "Search for 'error handling' in the code documentation"
   → Understand how errors should be handled
```

### Workflow 4: Documentation Research

**Scenario:** Understanding a complex system

```bash
1. "Read the architecture document at [URL]"
   → Get system overview

2. "Search for 'database schema' in the architecture doc"
   → Find data model information

3. "Find issues labeled 'database' or 'schema'"
   → Check related work and changes

4. "Read the API documentation at [URL]"
   → Understand interfaces

5. "Search for 'authentication flow' in the API docs"
   → Get specific implementation details
```

### Workflow 5: Project Status Review

**Scenario:** Preparing for a team meeting

```bash
1. "List recent closed issues with label:P1"
   → Check completed priority work

2. "Show me open PRs from the last week"
   → See current development activity

3. "Read the latest project update at [Google Doc URL]"
   → Get project status overview

4. "Search for 'blockers' in the project update"
   → Identify current issues

5. "Find open issues with label:blocker"
   → Check critical blockers
```

## 📋 Format Examples

### GitHub Tool Outputs

#### Issue Details

```
Issue #2345: Implement inline data refactor for modules
Status: Open
Author: username
Created: 2025-01-15
Labels: P1, enhancement, module-system

Description:
We need to refactor how modules handle inline data to improve
performance and maintainability...

Link: https://github.com/google/site-kit-wp/issues/2345
```

#### Search Results

```
Found 3 issues matching "storybook dependencies":

1. Issue #2340: Update Storybook dependencies to latest version
   Labels: enhancement, dependencies

2. Issue #2298: Fix Storybook build failing with new dependencies
   Labels: bug, storybook

3. Issue #2156: Add Storybook integration for new components
   Labels: enhancement, storybook
```

### Google Docs Outputs

#### Document Content (Structured Format)

```
# Design Document: Authentication System

## Overview
This document outlines the authentication system design...

## API Endpoints
### POST /api/auth/login
  • Purpose: User authentication
  • Parameters: email, password
  • Response: JWT token

## Security Considerations
**Important:** All authentication endpoints must use HTTPS...
```

#### Search Results

```
Found 2 matches for "authentication flow":

Line 45:
---
Previous context about user registration
>> The authentication flow begins when users submit credentials <<
Following context about token validation
---

Line 127:
---
Context about session management
>> This authentication flow ensures secure access to protected resources <<
Context about token refresh
---
```

## 💡 Pro Tips & Patterns

### Efficient GitHub Usage

**Default Repository Benefits:**

```bash
# Instead of repeating owner/repo
"Show me issue 2345 from google/site-kit-wp"

# Use simplified syntax
"Show me issue 2345"
```

**Smart Search Strategies:**

```bash
# Start broad, then narrow
"Search for authentication issues"
→ "Search for authentication label:P1"
→ "Search for authentication created:2025-01-01.."
```

**Pagination for Large Results:**

```bash
# Get overview first
"List recent issues" (default: 30 results)

# Then drill down
"List recent issues, show 50 results"
"List issues page 2"
```

### Effective Google Docs Usage

**URL Flexibility:**

```bash
# All of these work:
"Read https://docs.google.com/document/d/1CzPZhhs.../edit"
"Read https://docs.google.com/document/d/1CzPZhhs.../"
"Read document 1CzPZhhs..."
```

**Format Selection:**

```bash
# For quick reading
"Read the doc in plain text format"

# For documentation
"Read the doc in markdown format"

# For analysis (default)
"Read the doc in structured format"
```

**Search Strategies:**

```bash
# Multiple terms
"Search for 'API OR endpoint OR interface' in the doc"

# Specific sections
"Search for 'conclusion' in the doc"
"Search for 'next steps' in the doc"

# Technical terms
"Search for 'function OR method OR class' in the doc"
```

## 🎨 Advanced Combinations

### Cross-Service Workflows

**Design → Implementation:**

```bash
1. "Read the feature specification at [Google Doc URL]"
2. "Search for 'requirements' in the specification"
3. "Find issues related to this feature"
4. "Get details on the implementation PR"
```

**Research → Planning:**

```bash
1. "Search for API-related issues in the repo"
2. "Read the API design document at [URL]"
3. "Search for 'breaking changes' in the design doc"
4. "Find PRs that implement API changes"
```

**Bug → Fix:**

```bash
1. "Show me the bug report issue"
2. "Read the troubleshooting guide at [URL]"
3. "Search for 'known issues' in the guide"
4. "Find PRs that fix similar problems"
```

## 🔧 Technical Examples

### GitHub API Syntax (for advanced users)

```javascript
// Direct tool usage (if needed)
get_github_issue({
  owner: "microsoft",
  repo: "vscode",
  issue_number: 123,
});

search_github_issues({
  owner: "facebook",
  repo: "react",
  query: "hooks state management",
  type: "issue",
});
```

### Google Docs API Syntax

```javascript
// Direct tool usage (if needed)
get_google_doc({
  document_id: "1CzPZhhsSlyfp718k2gSqMN-zHJdZ8Sr5eJcciZas2A0",
  format: "markdown",
});

search_google_doc({
  document_id: "1CzPZhhsSlyfp718k2gSqMN-zHJdZ8Sr5eJcciZas2A0",
  search_text: "authentication flow",
  context_lines: 5,
});
```

## 🎯 Use Case Library

### Development Team Scenarios

**Sprint Planning:**

- List open issues by priority
- Read feature specifications
- Check implementation complexity

**Daily Standups:**

- Review yesterday's PRs
- Check blocked issues
- Find current work status

**Release Preparation:**

- List closed issues for release notes
- Read release documentation
- Check outstanding bugs

**Knowledge Transfer:**

- Read system documentation
- Find recent architectural changes
- Get context on complex features

### Individual Developer Scenarios

**Starting New Work:**

- Get issue requirements
- Research similar implementations
- Read design specifications

**Debugging Issues:**

- Search for similar problems
- Read troubleshooting guides
- Check recent related changes

**Code Review:**

- Understand PR context
- Read relevant documentation
- Check related issues

**Learning Codebase:**

- Read architecture documents
- Find examples in issues/PRs
- Understand system components

## 🚀 Getting Started

1. **Choose a workflow** that matches your current task
2. **Start with natural language** - describe what you want
3. **Iterate and refine** based on results
4. **Combine services** for comprehensive context

See the [Usage Guide](../usage/) for detailed command reference and the [Setup Guide](../setup/) for initial configuration.
