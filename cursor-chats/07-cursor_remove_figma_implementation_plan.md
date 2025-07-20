# Remove FIGMA implementation plan document
_Exported on 7/20/2025 at 13:56:31 GMT+1 from Cursor (1.1.3)_

---

**User**

@/docs @FIGMA_IMPLEMENTATION_PLAN.md  FIGMA_IMPLEMENTATION_PLAN.md is an artifact from building the server, let's remove it but keep any useful information in our structured docs/ folder

---

**Cursor**

I'll help you migrate the useful information from `FIGMA_IMPLEMENTATION_PLAN.md` into the structured `docs/` folder and then remove the implementation plan file. Let me first examine the current documentation structure.

Now let me create a proper Figma service documentation file based on the useful information from the implementation plan, following the same format as the other service docs.

```markdown
# Figma MCP Server

A comprehensive Model Context Protocol (MCP) server for Figma integration. This server provides tools to read and interact with Figma design files, extract design tokens, export assets, and bridge the gap between design and development workflows.

## 🌟 Features

### Current Capabilities (v1.0)

#### 🎨 Design File Access

- **Read File Details**: Extract file metadata, structure, and basic information
- **Layer Search**: Find specific elements, components, or design elements by name or type
- **Comment Extraction**: Get design feedback and review comments from stakeholders
- **Multi-Format Output**: Structured data with detailed design specifications

#### 🧩 Component Discovery

- **Component Library**: Discover all reusable components and their specifications
- **Design Patterns**: Identify common UI patterns and component variations
- **Asset Inventory**: Catalog available design elements and their properties

#### 🎯 Design Token Extraction

- **Color Systems**: Extract brand colors, semantic colors, and color palettes
- **Typography**: Get font families, sizes, weights, and text style specifications
- **Spacing & Layout**: Extract spacing tokens, grid systems, and layout specifications
- **Multi-Format Export**: CSS, SCSS, JSON, or Markdown output formats

#### 📦 Asset Export

- **Icon Export**: Download icons and graphic elements as SVG or PNG
- **Image Assets**: Export images, illustrations, and other visual assets
- **Component Assets**: Extract component-specific graphics and elements
- **Batch Processing**: Export multiple assets efficiently with rate limiting

### 🚧 Planned Capabilities (Future Versions)

#### 🔄 Design Versioning

- Compare file versions and track design changes
- Design diff analysis and change detection
- Version history and evolution tracking

#### 🤖 Design Automation

- Automated asset syncing to development repositories
- Design system validation and consistency checking
- Integration with CI/CD pipelines for design updates

#### 📊 Usage Analytics

- Track design system component usage
- Analyze design file access patterns
- Generate design system adoption metrics

## 🛠️ Available Tools

### Design File Operations

| Tool                   | Description                             | Use Case                                    |
| ---------------------- | --------------------------------------- | ------------------------------------------- |
| `get_figma_file`       | Read file details and structure         | Understand design file organization         |
| `get_figma_comments`   | Extract design feedback and comments    | Get stakeholder feedback and requirements   |
| `search_figma_layers`  | Find specific elements or components    | Locate design elements by name or type      |

### Component & Token Extraction

| Tool                   | Description                             | Use Case                                    |
| ---------------------- | --------------------------------------- | ------------------------------------------- |
| `get_figma_components` | Discover reusable components            | Understand available component library      |
| `get_design_tokens`    | Extract colors, typography, spacing     | Generate design system variables and tokens |
| `export_figma_assets`  | Download images, icons, and assets      | Get assets for development implementation   |

## 🔧 Setup & Authentication

### Prerequisites

1. **Figma Account**: Access to Figma files you want to read
2. **Personal Access Token**: Required for API access

### Authentication Setup

#### Step 1: Create Figma Personal Access Token

1. **Go to Figma Account Settings:**
   - Open [Figma Settings > Personal Access Tokens](https://www.figma.com/settings)
   - Click "Create new token"
   - Enter a descriptive name (e.g., "MCP Dev Workflow")

2. **Set Token Scope:**
   - **File Access**: Read access to files you own or have been shared
   - **Read Only**: Token provides read-only access (secure)

3. **Copy Token:**
   - Save the token immediately (it won't be shown again)
   - Format: `figd_XXXXXXXXXXXXXXXXXXXXXXXXXX`

#### Step 2: Configure Environment

```bash
# Add to .env file
FIGMA_ACCESS_TOKEN=figd_your_token_here

# Optional: Set default team/project for simplified commands
DEFAULT_FIGMA_TEAM_ID=your_team_id
DEFAULT_FIGMA_PROJECT_ID=your_project_id
```

### Rate Limits & Performance

- **Rate Limit**: 300 requests/minute (automatically handled)
- **Asset Exports**: Limited to 10 per request (configurable)
- **File Access**: Works with any file you have view access to
- **Token Scope**: Read-only access for security

## 🚀 Usage Examples

### Getting Design Specifications

```bash
# Extract design tokens as CSS custom properties
get_design_tokens with:
- file_key: "ABC123def456"
- format: "css"
- token_types: ["colors", "typography", "spacing"]

# Find all button components
get_figma_components with:
- file_key: "design-system-key"
- component_type: "COMPONENT"
- search_term: "button"
```

### Natural Language Examples

Instead of technical tool calls, you can use natural language:

- "What are the brand colors from this Figma file: https://figma.com/file/ABC123/design-system"
- "Export all icons from the UI kit as SVG files"
- "Show me the latest comments on the checkout flow design"
- "What components are available in the design system?"
- "Get typography tokens as SCSS variables"

### Extracting File Information

```bash
# Get file structure and basic info
get_figma_file with:
- file_key: "ABC123def456"

# Search for specific design elements
search_figma_layers with:
- file_key: "ABC123def456"
- search_term: "navigation"
- node_type: "COMPONENT"

# Get design feedback
get_figma_comments with:
- file_key: "feature-design-key"
```

## 📁 Architecture

The server follows a modular architecture optimized for design workflows:

```
servers/figma/
├── index.js              # Main server entry point
├── modules/
│   ├── files.js          # File operations, comments, layer search
│   ├── components.js     # Component discovery, design tokens
│   └── assets.js         # Asset export functionality
└── utils/
    ├── auth.js           # Figma API authentication
    └── common.js         # Utilities, design token extraction
```

### Design Token Processing

The server includes sophisticated design token extraction:

- **Color Analysis**: Extracts fills, strokes, and effects
- **Typography Parsing**: Font families, weights, sizes, line heights
- **Spacing Calculation**: Margins, padding, and layout spacing
- **Format Generation**: Automatic conversion to CSS, SCSS, JSON formats

## 🔒 Security & Permissions

### Token Security

- ✅ **Read-Only Access**: Tokens only provide read access to design files
- ✅ **File-Level Permissions**: Respects Figma's existing file sharing permissions
- ✅ **Team Boundaries**: Cannot access files outside your team permissions
- ✅ **Secure Storage**: Store tokens in environment variables, never in code

### Best Practices

- **Rotate Tokens Regularly** for security
- **Use Team Tokens** for shared team access when available
- **Monitor Usage** to stay within rate limits
- **Principle of Least Access** - only request files you need

## 🎯 Common Workflows

### Design-to-Code Implementation

```bash
# 1. Get design specifications
"Get design tokens from the design system file as CSS custom properties"

# 2. Find component specifications  
"What are the button component variations and their specifications?"

# 3. Export needed assets
"Export all icons from the icon library as SVG files"

# 4. Check for updates
"Any new comments on the feature design file?"
```

### Design System Management

```bash
# Extract comprehensive design tokens
get_design_tokens with:
- file_key: "design-system-key"
- format: "scss"
- filter_pages: ["Tokens", "Colors", "Typography"]

# Audit component library
get_figma_components with:
- file_key: "component-library-key"
- component_type: "COMPONENT_SET"
```

### Design Review Process

```bash
# Check latest feedback
"Show me recent comments on the checkout flow design"

# Verify design elements
"Search for payment button components in the design file"

# Get specifications for implementation
"What are the exact color values for the error states?"
```

## 🚨 Troubleshooting

### Common Issues

**"Forbidden" (403) errors:**

```bash
# Causes:
- Invalid or expired token
- Insufficient file permissions
- File is private and not shared with you

# Solutions:
- Regenerate Figma personal access token
- Check file sharing permissions
- Verify file URL is correct
```

**"Not Found" (404) errors:**

```bash
# Causes:
- File key doesn't exist
- File has been deleted
- Incorrect file URL format

# Solutions:
- Verify file URL: https://www.figma.com/file/FILE_KEY/file-name
- Check if file still exists in Figma
- Ensure file hasn't been moved or renamed
```

**Rate limit exceeded:**

```bash
# Causes:
- Too many requests in short time period
- Multiple concurrent asset exports

# Solutions:
- Wait for rate limit reset (1 minute)
- Reduce concurrent requests
- Use batch operations when available
```

### Debug Steps

1. **Test Token:**
   ```bash
   # Verify token works
   curl -H "X-Figma-Token: YOUR_TOKEN" https://api.figma.com/v1/me
   ```

2. **Check File Access:**
   ```bash
   # Test file permissions
   curl -H "X-Figma-Token: YOUR_TOKEN" https://api.figma.com/v1/files/FILE_KEY
   ```

3. **Verify File Key:**
   - File URL: `https://www.figma.com/file/ABC123def456/project-name`
   - File Key: `ABC123def456` (extract from URL)

## 🔮 Future Extensions

### Planned Features

**Design Version Control:**
- `compare_figma_versions` - Compare design file versions
- `get_design_history` - Track design evolution over time
- `detect_design_changes` - Identify what changed between versions

**Advanced Asset Management:**
- `sync_assets_to_repo` - Automated asset synchronization
- `validate_design_implementation` - Compare design vs. implementation
- `optimize_exported_assets` - Automatic asset optimization

**Team & Analytics:**
- `get_team_usage_stats` - Design system adoption metrics
- `analyze_component_usage` - Track component library usage
- `generate_design_reports` - Automated design system documentation

### Integration Ideas

- **CI/CD Integration**: Automatically sync design updates to development
- **Design System Validation**: Ensure consistent usage across files
- **Cross-File Analysis**: Analyze design patterns across multiple files
- **Development Handoff**: Generate developer-friendly specifications

## 📊 Design Token Formats

### CSS Custom Properties

```css
:root {
  --color-primary-500: #3b82f6;
  --color-secondary-500: #10b981;
  --font-family-heading: 'Inter', sans-serif;
  --font-size-lg: 1.125rem;
  --spacing-md: 1rem;
}
```

### SCSS Variables

```scss
$color-primary-500: #3b82f6;
$color-secondary-500: #10b981;
$font-family-heading: 'Inter', sans-serif;
$font-size-lg: 1.125rem;
$spacing-md: 1rem;
```

### JSON Format

```json
{
  "colors": {
    "primary": {
      "500": "#3b82f6"
    }
  },
  "typography": {
    "fontFamily": {
      "heading": "Inter, sans-serif"
    }
  }
}
```

## 📄 License

Part of the `mcp-dev-workflow` project - MIT License

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch for new Figma functionality
3. Follow the existing modular architecture patterns
4. Add comprehensive error handling and rate limiting
5. Update this documentation with new capabilities
6. Submit a pull request

---

**Ready to bridge design and development?** The Figma MCP server makes design specifications accessible directly in your development workflow!
```

Now let me update the main docs README to include Figma in the services section.

```markdown
- **[GitHub Server](services/github.md)** - GitHub integration, authentication, and advanced features
- **[Google Workspace Server](services/google-workspace.md)** - Google Workspace setup, architecture, and capabilities

->

- **[GitHub Server](services/github.md)** - GitHub integration, authentication, and advanced features
- **[Google Workspace Server](services/google-workspace.md)** - Google Workspace setup, architecture, and capabilities
- **[Figma Server](services/figma.md)** - Figma design file integration, design tokens, and asset export
```

```markdown
- **GitHub**: See [GitHub Server Documentation](services/github.md), [Usage → GitHub](usage/README.md#github-usage), and [Examples](examples/README.md#github-examples)
- **Google Workspace**: See [Google Workspace Server Documentation](services/google-workspace.md), [Usage → Google Workspace](usage/README.md#google-workspace-usage), and [Examples](examples/README.md#google-workspace-examples)

->

- **GitHub**: See [GitHub Server Documentation](services/github.md), [Usage → GitHub](usage/README.md#github-usage), and [Examples](examples/README.md#github-examples)
- **Google Workspace**: See [Google Workspace Server Documentation](services/google-workspace.md), [Usage → Google Workspace](usage/README.md#google-workspace-usage), and [Examples](examples/README.md#google-workspace-examples)
- **Figma**: See [Figma Server Documentation](services/figma.md), [Usage → Figma](usage/README.md#figma-usage), and [Examples](examples/README.md#figma-examples)
```

```markdown
- **[Main README](../README.md)** - Project overview and quick start
- **[GitHub Server Code](../servers/github/)** - GitHub server implementation
- **[Google Workspace Server Code](../servers/google-workspace/)** - Google Workspace server implementation

->

- **[Main README](../README.md)** - Project overview and quick start
- **[GitHub Server Code](../servers/github/)** - GitHub server implementation
- **[Google Workspace Server Code](../servers/google-workspace/)** - Google Workspace server implementation
- **[Figma Server Code](../servers/figma/)** - Figma server implementation
```

Now let me delete the implementation plan file since we've migrated the useful information to the structured documentation:

Let me check the usage and examples documentation to see if they need to be updated to include Figma sections (since we referenced them in the main README):

I need to add Figma sections to both the usage and examples documentation to match the structure and ensure the links work. Let me start with the usage documentation:

```markdown
| **Google Workspace** | `get_google_doc`          | Read documents     | "Read design doc at [URL]" |
|                      | `get_google_doc_metadata` | Get doc properties | "Doc metadata for [URL]"   |
|                      | `search_google_doc`       | Search within docs | "Find 'API' in the doc"    |

->

| **Google Workspace** | `get_google_doc`          | Read documents     | "Read design doc at [URL]" |
|                      | `get_google_doc_metadata` | Get doc properties | "Doc metadata for [URL]"   |
|                      | `search_google_doc`       | Search within docs | "Find 'API' in the doc"    |
| **Figma**            | `get_figma_file`          | Read design files  | "Get file structure"       |
|                      | `get_design_tokens`       | Extract tokens     | "Get colors as CSS"        |
|                      | `export_figma_assets`     | Export assets      | "Export icons as SVG"      |
```

```markdown
### Google Workspace Examples

- "Read the design doc at https://docs.google.com/document/d/..." → Extract document content
- "Search for 'authentication' in that document" → Find specific sections
- "What's the metadata for this Google Doc?" → Get document properties
- "Show me the content in markdown format" → Specify output format

->

### Google Workspace Examples

- "Read the design doc at https://docs.google.com/document/d/..." → Extract document content
- "Search for 'authentication' in that document" → Find specific sections
- "What's the metadata for this Google Doc?" → Get document properties
- "Show me the content in markdown format" → Specify output format

### Figma Examples

- "Get design tokens from this Figma file as CSS variables" → Extract design system tokens
- "What components are available in the design library?" → Discover component specifications
- "Export all icons from the UI kit as SVG files" → Download assets for development
- "Show me the latest comments on the checkout flow design" → Get design feedback
- "What are the brand colors from the design system file?" → Extract color specifications
```

```markdown
### Document Access

- **Public docs:** Work immediately with any sharing settings
- **Private docs:** Share with service account email or use OAuth2
- **Large docs:** Use search to find specific sections efficiently

## 🆘 Common Issues

->

### Document Access

- **Public docs:** Work immediately with any sharing settings
- **Private docs:** Share with service account email or use OAuth2
- **Large docs:** Use search to find specific sections efficiently

## 🎨 Figma Usage

### Authentication Requirements

All Figma operations require a personal access token:

- **Token Setup**: Get from [Figma Settings > Personal Access Tokens](https://www.figma.com/settings)
- **Environment**: Set `FIGMA_ACCESS_TOKEN=figd_your_token`
- **Access Level**: Token provides read-only access to files you can view

### Basic File Operations

```bash
# Get file structure and basic information
"Show me the structure of this Figma file: https://figma.com/file/ABC123/design-system"

# Extract comments and feedback
"What are the latest comments on the checkout flow design?"

# Search for specific elements
"Find all button components in the design system file"
```

### Design Token Extraction

```bash
# Extract colors as CSS custom properties
"Get the brand colors from the design system as CSS variables"

# Typography tokens as SCSS
"Export typography tokens as SCSS variables"

# Comprehensive token extraction
"Get all design tokens (colors, typography, spacing) as JSON"
```

### Asset Export

```bash
# Export icons
"Export all icons from the UI kit as SVG files"

# Export specific assets
"Download the logo and brand assets as PNG files"

# Component assets
"Export all button component assets"
```

### Component Discovery

```bash
# List all components
"What components are available in the design library?"

# Find specific component types
"Show me all the card component variations"

# Component specifications
"What are the specifications for the primary button component?"
```

### Working with File URLs

Figma file URLs have this format:

```
https://www.figma.com/file/FILE_KEY/file-name
```

You can use:

- **Full URL**: "Get tokens from https://figma.com/file/ABC123/design-system"
- **File Key only**: "Get tokens from file ABC123"
- **Natural references**: "Get tokens from the design system file" (if previously mentioned)

### Output Formats

Design tokens can be exported in multiple formats:

- **CSS**: Custom properties (`--color-primary: #3b82f6`)
- **SCSS**: Variables (`$color-primary: #3b82f6`)
- **JSON**: Structured data for tooling
- **Markdown**: Human-readable documentation

### Best Practices

- **File Organization**: Use clear file and page names for easier discovery
- **Token Pages**: Organize design tokens in dedicated pages/frames
- **Component Libraries**: Use Figma's component features for better discovery
- **Comments**: Use comments for design specifications and developer notes

## 🆘 Common Issues
```

```markdown
**Google "Permission denied":**

- Document not shared with service account
- **Solution:** Share document or verify OAuth2 access

### Search Issues

**No results found:**

- Try broader search terms
- Check spelling and syntax

->

**Google "Permission denied":**

- Document not shared with service account
- **Solution:** Share document or verify OAuth2 access

**Figma "403 Forbidden":**

- Invalid or expired token
- File not accessible with current permissions
- **Solution:** Regenerate token, check file sharing permissions

**Figma "404 Not Found":**

- File key doesn't exist or file deleted
- Incorrect file URL format
- **Solution:** Verify file URL, check if file still exists

### Search Issues

**No results found:**

- Try broader search terms
- Check spelling and syntax

**Figma rate limiting:**

- Too many requests in short time
- **Solution:** Wait 1 minute for rate limit reset
```

Now let me add Figma examples to the examples documentation:

```markdown
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

->

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
# Read design files and extract information
"Get the structure of this Figma file: https://figma.com/file/ABC123/design-system"
"What components are available in the design library?"
"Show me the latest comments on the checkout flow design"

# Extract design tokens for development
"Get all brand colors from the design system as CSS custom properties"
"Export typography tokens as SCSS variables"
"Get spacing tokens from the design file as JSON"

# Export assets for implementation
"Export all icons from the UI kit as SVG files"
"Download the logo assets as PNG files"
"Export button component assets for development"

# Search and discover design elements
"Find all navigation components in the design system"
"Search for error state designs in the component library"
"What button variations are available?"
```
```

```markdown
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

->

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
1. "Get the design tokens from this Figma file as CSS custom properties"
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
```

```markdown
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

->

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
```

---

**User**

please continue

---

**Cursor**

I'll complete adding the Figma tool output examples to the examples documentation to match the format of the GitHub and Google Docs sections.

```markdown
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

->

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
```

Now let me add Figma scenarios to the use case library section:

```markdown
### Cross-Service Workflows

**Design → Implementation:**

```bash
1. "Read the feature specification at [Google Doc URL]"
2. "Search for 'requirements' in the specification"
3. "Find issues related to this feature"
4. "Get details on the implementation PR"
```

->

### Cross-Service Workflows

**Design → Implementation:**

```bash
1. "Read the feature specification at [Google Doc URL]"
2. "Search for 'requirements' in the specification"
3. "Get design tokens from the Figma file as CSS variables"
4. "Export component assets from the design file"
5. "Find GitHub issues related to this feature"
6. "Get details on the implementation PR"
```

**Design System Update:**

```bash
1. "Get all design tokens from the Figma design system as JSON"
2. "Read the design system documentation at [Google Doc URL]"
3. "Search for 'migration guide' in the documentation"
4. "Find GitHub issues labeled 'design-system'"
5. "Export updated brand assets from Figma"
6. "Check recent PRs that update design tokens"
```
```

```markdown
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

->

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
```

```markdown
This guide provides practical examples and usage patterns for both GitHub and Google Workspace MCP servers.

->

This guide provides practical examples and usage patterns for the GitHub, Google Workspace, and Figma MCP servers.
```

Perfect! I've successfully migrated all the useful information from `FIGMA_IMPLEMENTATION_PLAN.md` into the structured `docs/` folder and removed the artifact file. Here's what I accomplished:

## ✅ **Completed Migration**

### 📚 **Created Comprehensive Figma Documentation**

**New file: `docs/services/figma.md`**
- Complete service overview with features and capabilities
- All 6 tools documented with use cases
- Detailed setup and authentication guide
- Usage examples and natural language patterns
- Architecture overview and security considerations
- Troubleshooting and future extensions

### 🔄 **Updated Existing Documentation Structure**

**Main README (`docs/README.md`)**
- Added Figma to services section
- Updated navigation links to include Figma references
- Added Figma server code link

**Usage Guide (`docs/usage/README.md`)**
- Added Figma tools to quick reference table
- Complete Figma usage section with authentication, design tokens, asset export
- Figma-specific troubleshooting and best practices
- Updated intro to mention all three services

**Examples & Workflows (`docs/examples/README.md`)**
- Figma examples in quick start section
- Two new cross-service workflows:
  - **Design-to-Development Implementation** 
  - **Design System Maintenance**
- Detailed Figma tool output examples
- Design implementation scenarios
- Figma API syntax examples

### 🗑️ **Cleaned Up Artifacts**

- ✅ Removed `FIGMA_IMPLEMENTATION_PLAN.md`
- ✅ Preserved all valuable information in structured docs

## 🎯 **Result**

The documentation now comprehensively covers all **three services** (GitHub, Google Workspace, and Figma) with:

- **Consistent formatting** across all service docs
- **Cross-service workflows** showing how they work together
- **Complete coverage** from setup to advanced usage
- **Real-world examples** and practical scenarios
- **Proper structure** following the established documentation patterns

The Figma integration is now fully documented and ready for users, demonstrating powerful design-to-development workflows that bridge the gap between design and code! 🎨→💻

