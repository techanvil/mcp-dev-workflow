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
"Get issue 123 from nodejs/node"
"List PRs from facebook/react"
```

### Google Workspace Examples

```bash
# Read documents (full URL or just document ID both work)
"Read the design doc at https://docs.google.com/document/d/YOUR_DOCUMENT_ID/"
"Read document YOUR_DOCUMENT_ID"
"Show me the content of that Google Doc in markdown format"

# Search within documents
"Search for 'API endpoints' in the design document"
"Find mentions of 'authentication flow' in that doc"

# Document properties
"What's the metadata for this Google Doc?"
"When was this document last modified?"
```

### Figma Examples

```bash
# Read design files (full URL or file reference both work)
"Get the structure of this Figma file: https://www.figma.com/file/ABC123/design-system"
"Get tokens from Figma file design-system"
"Show me the latest comments on Figma file checkout-flow"

# Extract design tokens for development
"Get all brand colors from Figma file design-system as CSS custom properties"
"Export typography tokens from Figma file UI-kit as SCSS variables"
"Get spacing tokens from the design file as JSON"

# Export assets for implementation
"Export all icons from Figma file UI-kit as SVG files"
"Download the logo assets from Figma file brand-assets as PNG files"
"Export button component assets for development"

# Search and discover design elements
"Find all navigation components in Figma file design-system"
"Search for error state designs in Figma file component-library"
"What button variations are available in the design file?"
```

## 🔄 Real-World Workflows

### Workflow 1: Feature Development Planning

**Scenario:** Starting work on a new feature

```bash
1. "Show me issue 2345"
   → Get requirements and acceptance criteria

2. "Search for similar feature issues"
   → Find related work and patterns

3. "Read the design doc at [URL]" or "Read document [DOC_ID]"
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

### Workflow 6: Design-to-Development Implementation

**Scenario:** Implementing a new UI component from Figma designs

```bash
1. "Get the design tokens from Figma file design-system as CSS custom properties"
   → Extract color, typography, and spacing values

2. "What components are available in the design system?"
   → Understand existing component library

3. "Show me the button component specifications"
   → Get detailed component requirements

4. "Export all icon assets as SVG files"
   → Download assets needed for implementation

5. "What are the latest comments on this design file?"
   → Check for recent feedback or changes

6. "Show me issue #1234"
   → Read development requirements and acceptance criteria

7. "Export the error state icons for the form components"
   → Get specific assets for error handling
```

### Workflow 7: Design System Maintenance

**Scenario:** Updating and auditing the design system

```bash
1. "Get all design tokens from the main design system file as JSON"
   → Extract complete token system for analysis

2. "What component variations exist for buttons?"
   → Audit component library completeness

3. "Search for authentication-related components"
   → Find specific use case components

4. "Export all brand assets as PNG files"
   → Update marketing and documentation materials

5. "Find GitHub issues labeled 'design-system'"
   → Check for reported inconsistencies or requests

6. "Read the design system documentation at [Google Doc URL]"
   → Review current design guidelines

7. "Search for 'token migration' in the design doc"
   → Check migration plans and timelines
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

### Figma Tool Outputs

#### Design Tokens (CSS Format)

```css
/* Design Tokens - Generated from Figma */
:root {
  /* Colors */
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-secondary-500: #10b981;
  --color-neutral-100: #f5f5f5;
  --color-neutral-900: #171717;

  /* Typography */
  --font-family-heading: "Inter", sans-serif;
  --font-family-body: "Inter", sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}
```

#### Component Discovery

```
Found 12 components in the design system:

1. Button (COMPONENT_SET)
   - Variants: primary, secondary, tertiary
   - States: default, hover, focus, disabled
   - Sizes: small, medium, large

2. Input Field (COMPONENT_SET)
   - Types: text, email, password, search
   - States: default, focus, error, disabled

3. Card (COMPONENT)
   - Description: Basic card container with padding and shadow
   - Usage: Content containers, feature highlights

4. Navigation Bar (COMPONENT)
   - Description: Main site navigation with logo and menu items
   - Responsive: Mobile and desktop variants
```

#### File Structure

```
Figma File: Design System v2.0
Pages: 5 total

1. 🎨 Tokens
   - Color Palette (24 colors)
   - Typography Scale (8 sizes)
   - Spacing System (10 values)

2. 🧩 Components
   - Buttons (3 variants, 4 states)
   - Forms (6 input types)
   - Navigation (2 layouts)
   - Cards (4 variants)

3. 📱 Mobile Screens
   - Login Flow (5 screens)
   - Dashboard (3 screens)
   - Settings (4 screens)

4. 💻 Desktop Screens
   - Main Application (8 screens)
   - Admin Panel (6 screens)

5. 📄 Documentation
   - Usage Guidelines
   - Component Specs
   - Design Principles
```

#### Design Comments

```
Latest comments on checkout flow design:

1. Sarah Chen (Designer) - 2 hours ago
   "Updated the error states for the payment form. Please check the red color contrast."
   → On: Payment Form Error States

2. Mike Rodriguez (PM) - 1 day ago
   "The CTA button needs to be more prominent. Can we try the primary button style?"
   → On: Checkout Button

3. Alex Kim (Developer) - 2 days ago
   "What's the exact spacing between form fields? Need precise values for implementation."
   → On: Form Layout Specs

4. Sarah Chen (Designer) - 2 days ago
   "@Alex spacing is 16px between fields, 24px between sections. Added to token page."
   → Reply to: Form Layout Specs
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
"Read https://docs.google.com/document/d/YOUR_DOCUMENT_ID/edit"
"Read https://docs.google.com/document/d/YOUR_DOCUMENT_ID/"
"Read document YOUR_DOCUMENT_ID"
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
3. "Get design tokens from Figma file design-system as CSS variables"
4. "Export component assets from Figma file design-system"
5. "Find GitHub issues related to this feature"
6. "Get details on the implementation PR"
```

**Design System Update:**

```bash
1. "Get all design tokens from Figma file design-system as JSON"
2. "Read the design system documentation at [Google Doc URL]"
3. "Search for 'migration guide' in the documentation"
4. "Find GitHub issues labeled 'design-system'"
5. "Export updated brand assets from Figma file brand-kit"
6. "Check recent PRs that update design tokens"
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
  owner: "nodejs",
  repo: "node",
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
  document_id: "YOUR_DOCUMENT_ID",
  format: "markdown",
});

search_google_doc({
  document_id: "YOUR_DOCUMENT_ID",
  search_text: "authentication flow",
  context_lines: 5,
});
```

### Figma API Syntax

```javascript
// Direct tool usage (if needed)
get_design_tokens({
  file_key: "ABC123def456",
  format: "css",
  token_types: ["colors", "typography", "spacing"],
});

export_figma_assets({
  file_key: "ABC123def456",
  asset_type: "icons",
  format: "svg",
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
- Extract design tokens from Figma
- Export needed assets for implementation

**Debugging Issues:**

- Search for similar problems
- Read troubleshooting guides
- Check recent related changes
- Verify design specifications match implementation

**Code Review:**

- Understand PR context
- Read relevant documentation
- Check related issues
- Verify design consistency with Figma specs

**Design Implementation:**

- Extract exact color values from design files
- Get component specifications and variations
- Export icons and assets for development
- Check latest design feedback and comments
- Verify spacing and typography tokens

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
