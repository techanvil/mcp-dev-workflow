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

| Tool                  | Description                          | Use Case                                  |
| --------------------- | ------------------------------------ | ----------------------------------------- |
| `get_figma_file`      | Read file details and structure      | Understand design file organization       |
| `get_figma_comments`  | Extract design feedback and comments | Get stakeholder feedback and requirements |
| `search_figma_layers` | Find specific elements or components | Locate design elements by name or type    |

### Component & Token Extraction

| Tool                   | Description                         | Use Case                                    |
| ---------------------- | ----------------------------------- | ------------------------------------------- |
| `get_figma_components` | Discover reusable components        | Understand available component library      |
| `get_design_tokens`    | Extract colors, typography, spacing | Generate design system variables and tokens |
| `export_figma_assets`  | Download images, icons, and assets  | Get assets for development implementation   |

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

- "What are the brand colors from this Figma file: https://www.figma.com/file/ABC123/design-system"
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
  --font-family-heading: "Inter", sans-serif;
  --font-size-lg: 1.125rem;
  --spacing-md: 1rem;
}
```

### SCSS Variables

```scss
$color-primary-500: #3b82f6;
$color-secondary-500: #10b981;
$font-family-heading: "Inter", sans-serif;
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
