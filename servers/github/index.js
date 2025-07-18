#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { Octokit } from "octokit";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

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

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
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
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "get_github_issue":
            return await this.getIssue(args);
          case "get_github_pr":
            return await this.getPullRequest(args);
          case "list_github_issues":
            return await this.listIssues(args);
          case "list_github_prs":
            return await this.listPullRequests(args);
          case "search_github_issues":
            return await this.searchIssues(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error.message}`,
            },
          ],
        };
      }
    });
  }

  async getIssue({ owner, repo, issue_number }) {
    const response = await this.octokit.rest.issues.get({
      owner,
      repo,
      issue_number,
    });

    const issue = response.data;

    return {
      content: [
        {
          type: "text",
          text: `# Issue #${issue.number}: ${issue.title}

**State:** ${issue.state}
**Created:** ${new Date(issue.created_at).toLocaleDateString()}
**Updated:** ${new Date(issue.updated_at).toLocaleDateString()}
**Author:** ${issue.user.login}
**URL:** ${issue.html_url}

## Description
${issue.body || "No description provided."}

## Labels
${issue.labels.map((label) => `- ${label.name}`).join("\n") || "No labels"}

## Comments
${issue.comments} comment(s)`,
        },
      ],
    };
  }

  async getPullRequest({ owner, repo, pr_number }) {
    const response = await this.octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: pr_number,
    });

    const pr = response.data;

    return {
      content: [
        {
          type: "text",
          text: `# Pull Request #${pr.number}: ${pr.title}

**State:** ${pr.state}
**Created:** ${new Date(pr.created_at).toLocaleDateString()}
**Updated:** ${new Date(pr.updated_at).toLocaleDateString()}
**Author:** ${pr.user.login}
**URL:** ${pr.html_url}
**Base:** ${pr.base.ref} ← **Head:** ${pr.head.ref}

## Description
${pr.body || "No description provided."}

## Status
- **Mergeable:** ${pr.mergeable}
- **Draft:** ${pr.draft}
- **Comments:** ${pr.comments}
- **Review Comments:** ${pr.review_comments}
- **Commits:** ${pr.commits}
- **Additions:** +${pr.additions}
- **Deletions:** -${pr.deletions}
- **Changed Files:** ${pr.changed_files}`,
        },
      ],
    };
  }

  async listIssues({ owner, repo, state = "open", per_page = 30, page = 1 }) {
    const response = await this.octokit.rest.issues.listForRepo({
      owner,
      repo,
      state,
      per_page: Math.min(per_page, 100),
      page,
    });

    const issues = response.data.filter((item) => !item.pull_request); // Filter out PRs

    return {
      content: [
        {
          type: "text",
          text: `# Issues for ${owner}/${repo} (${state})

${issues
  .map(
    (issue) =>
      `## #${issue.number}: ${issue.title}
**State:** ${issue.state} | **Author:** ${
        issue.user.login
      } | **Created:** ${new Date(issue.created_at).toLocaleDateString()}
**URL:** ${issue.html_url}
${
  issue.body
    ? issue.body.substring(0, 200) + (issue.body.length > 200 ? "..." : "")
    : "No description"
}
---`
  )
  .join("\n\n")}`,
        },
      ],
    };
  }

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

    const prs = response.data;

    return {
      content: [
        {
          type: "text",
          text: `# Pull Requests for ${owner}/${repo} (${state})

${prs
  .map(
    (pr) =>
      `## #${pr.number}: ${pr.title}
**State:** ${pr.state} | **Author:** ${pr.user.login} | **Created:** ${new Date(
        pr.created_at
      ).toLocaleDateString()}
**Base:** ${pr.base.ref} ← **Head:** ${pr.head.ref}
**URL:** ${pr.html_url}
${
  pr.body
    ? pr.body.substring(0, 200) + (pr.body.length > 200 ? "..." : "")
    : "No description"
}
---`
  )
  .join("\n\n")}`,
        },
      ],
    };
  }

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

    const items = response.data.items;

    return {
      content: [
        {
          type: "text",
          text: `# Search Results for "${query}" in ${owner}/${repo}

Found ${response.data.total_count} total results (showing ${items.length})

${items
  .map(
    (item) =>
      `## #${item.number}: ${item.title}
**Type:** ${item.pull_request ? "Pull Request" : "Issue"} | **State:** ${
        item.state
      } | **Author:** ${item.user.login}
**Created:** ${new Date(item.created_at).toLocaleDateString()}
**URL:** ${item.html_url}
${
  item.body
    ? item.body.substring(0, 200) + (item.body.length > 200 ? "..." : "")
    : "No description"
}
---`
  )
  .join("\n\n")}`,
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("GitHub MCP server running on stdio");
  }
}

const server = new GitHubMCPServer();
server.run().catch(console.error);
