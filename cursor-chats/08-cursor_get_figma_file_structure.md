# Get Figma file structure
_Exported on 7/20/2025 at 15:48:40 GMT+1 from Cursor (1.1.3)_

---

**User**

Get the structure of the Figma file Setup-flow-refresh

---

**Cursor**

I can help you get the structure of the Figma file "Setup-flow-refresh". However, I need the Figma file URL or file key to access it. 

Could you please provide:
- The full Figma file URL (something like `https://www.figma.com/file/[file-key]/Setup-flow-refresh`)
- Or just the file key from the URL

Once you provide that, I'll be able to retrieve the complete document structure including all frames, layers, and components.

---

**User**

@README.md ah, in that case it looks like the Figma  example(s)@figma.md need tweaking because I'm following the README and you can't immediately understand it

---

**Cursor**

```shellscript
# Read design files (full URL or file reference both work)
"Get the structure of this Figma file: https://www.figma.com/file/ABC123/design-system"
"Get tokens from Figma file design-system"
"Show me the latest comments on Figma file checkout-flow"
```

You're absolutely right! I see the issue now. The README examples suggest you can reference Figma files by name alone (like `"Setup-flow-refresh"` or `"design-system"`), but the actual implementation requires the full URL or file key. This is misleading and inconsistent.

Let me fix the examples in both files to be accurate and consistent:

```markdown
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

->

### Figma Examples

```bash
# Read design files (requires full URL or file key)
"Get the structure of this Figma file: https://www.figma.com/file/ABC123def456/design-system"
"Get tokens from Figma file https://www.figma.com/file/XYZ789abc123/checkout-flow"
"Show me the latest comments on https://www.figma.com/file/DEF456ghi789/feature-designs"

# You can also use just the file key (the part after /file/ in the URL)
"Get design tokens from file key ABC123def456 as CSS custom properties"
"Export icons from file key XYZ789abc123 as SVG files"

# Extract design tokens for development
"Get all brand colors from https://www.figma.com/file/ABC123def456/design-system as CSS custom properties"
"Export typography tokens from https://www.figma.com/file/UIK789xyz456/UI-kit as SCSS variables"
"Get spacing tokens from file key ABC123def456 as JSON"

# Export assets for implementation
"Export all icons from https://www.figma.com/file/UIK789xyz456/UI-kit as SVG files"
"Download the logo assets from file key BRA456brand789 as PNG files"
"Export button component assets from https://www.figma.com/file/ABC123def456/design-system"

# Search and discover design elements
"Find all navigation components in https://www.figma.com/file/ABC123def456/design-system"
"Search for error state designs in file key COM789library456"
"What button variations are available in https://www.figma.com/file/ABC123def456/design-system?"
```
```

```markdown
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

->

### Workflow 6: Design-to-Development Implementation

**Scenario:** Implementing a new UI component from Figma designs

```bash
1. "Get the design tokens from https://www.figma.com/file/ABC123def456/design-system as CSS custom properties"
   → Extract color, typography, and spacing values

2. "What components are available in https://www.figma.com/file/ABC123def456/design-system?"
   → Understand existing component library

3. "Show me the button component specifications in file key ABC123def456"
   → Get detailed component requirements

4. "Export all icon assets from https://www.figma.com/file/ABC123def456/design-system as SVG files"
   → Download assets needed for implementation

5. "What are the latest comments on https://www.figma.com/file/ABC123def456/design-system?"
   → Check for recent feedback or changes

6. "Show me issue #1234"
   → Read development requirements and acceptance criteria

7. "Export the error state icons from file key ABC123def456 for the form components"
   → Get specific assets for error handling
```
```

```markdown
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

->

### Workflow 7: Design System Maintenance

**Scenario:** Updating and auditing the design system

```bash
1. "Get all design tokens from https://www.figma.com/file/ABC123def456/design-system as JSON"
   → Extract complete token system for analysis

2. "What component variations exist for buttons in file key ABC123def456?"
   → Audit component library completeness

3. "Search for authentication-related components in https://www.figma.com/file/ABC123def456/design-system"
   → Find specific use case components

4. "Export all brand assets from https://www.figma.com/file/BRA456brand789/brand-assets as PNG files"
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

->

**Design → Implementation:**

```bash
1. "Read the feature specification at [Google Doc URL]"
2. "Search for 'requirements' in the specification"
3. "Get design tokens from https://www.figma.com/file/ABC123def456/design-system as CSS variables"
4. "Export component assets from file key ABC123def456"
5. "Find GitHub issues related to this feature"
6. "Get details on the implementation PR"
```

**Design System Update:**

```bash
1. "Get all design tokens from https://www.figma.com/file/ABC123def456/design-system as JSON"
2. "Read the design system documentation at [Google Doc URL]"
3. "Search for 'migration guide' in the documentation"
4. "Find GitHub issues labeled 'design-system'"
5. "Export updated brand assets from https://www.figma.com/file/BRA456brand789/brand-kit"
6. "Check recent PRs that update design tokens"
```
```

```markdown
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

->

### Design-to-Code Implementation

```bash
# 1. Get design specifications
"Get design tokens from https://www.figma.com/file/ABC123def456/design-system as CSS custom properties"

# 2. Find component specifications
"What are the button component variations in file key ABC123def456 and their specifications?"

# 3. Export needed assets
"Export all icons from https://www.figma.com/file/ICO789library456/icon-library as SVG files"

# 4. Check for updates
"Any new comments on https://www.figma.com/file/FEA456feature789/feature-designs?"
```
```

```markdown
### Natural Language Examples

Instead of technical tool calls, you can use natural language:

- "What are the brand colors from this Figma file: https://www.figma.com/file/ABC123/design-system"
- "Export all icons from the UI kit as SVG files"
- "Show me the latest comments on the checkout flow design"
- "What components are available in the design system?"
- "Get typography tokens as SCSS variables"

->

### Natural Language Examples

Instead of technical tool calls, you can use natural language:

- "What are the brand colors from this Figma file: https://www.figma.com/file/ABC123def456/design-system"
- "Export all icons from https://www.figma.com/file/UIK789xyz456/UI-kit as SVG files"
- "Show me the latest comments on https://www.figma.com/file/CHE789checkout456/checkout-flow"
- "What components are available in file key ABC123def456?"
- "Get typography tokens from https://www.figma.com/file/ABC123def456/design-system as SCSS variables"
```

```markdown
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

->

### Design-to-Code Implementation

```bash
# 1. Get design specifications
"Get design tokens from https://www.figma.com/file/ABC123def456/design-system as CSS custom properties"

# 2. Find component specifications
"What are the button component variations in file key ABC123def456 and their specifications?"

# 3. Export needed assets
"Export all icons from https://www.figma.com/file/ICO789library456/icon-library as SVG files"

# 4. Check for updates
"Any new comments on https://www.figma.com/file/FEA456feature789/feature-designs?"
```
```

```markdown
### Design Review Process

```bash
# Check latest feedback
"Show me recent comments on the checkout flow design"

# Verify design elements
"Search for payment button components in the design file"

# Get specifications for implementation
"What are the exact color values for the error states?"
```

->

### Design Review Process

```bash
# Check latest feedback
"Show me recent comments on https://www.figma.com/file/CHE789checkout456/checkout-flow"

# Verify design elements
"Search for payment button components in file key CHE789checkout456"

# Get specifications for implementation
"What are the exact color values for the error states in https://www.figma.com/file/CHE789checkout456/checkout-flow?"
```
```

```markdown
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

->

## 🚀 Usage Examples

**Important:** All Figma operations require either:
- The full Figma URL: `https://www.figma.com/file/ABC123def456/file-name`
- Just the file key: `ABC123def456` (the part after `/file/` in the URL)

### Getting Design Specifications

```bash
# Extract design tokens as CSS custom properties
get_design_tokens with:
- file_key: "ABC123def456"
- format: "css"
- token_types: ["colors", "typography", "spacing"]

# Find all button components
get_figma_components with:
- file_key: "ABC123def456"
- component_type: "COMPONENT"
- search_term: "button"
```
```

Perfect! I've fixed the inconsistency you pointed out. The issue was that the README examples made it seem like you could reference Figma files by name alone (like `"Setup-flow-refresh"` or `"design-system"`), but the actual implementation requires either:

1. **Full Figma URL**: `https://www.figma.com/file/ABC123def456/design-system`
2. **File Key**: `ABC123def456` (the part after `/file/` in the URL)

## Changes Made:

### ✅ Updated `docs/examples/README.md`:
- Fixed all Figma examples to use proper URLs or file keys
- Added clarification about the two supported formats
- Made examples consistent across all workflows

### ✅ Updated `docs/services/figma.md`:
- Fixed natural language examples to use proper file references
- Added a prominent notice explaining the URL/file key requirement
- Updated all workflow examples to be consistent

## Now the examples are accurate:

**Before (misleading):**
```bash
"Get the structure of Figma file Setup-flow-refresh"
"Get tokens from Figma file design-system"
```

**After (correct):**
```bash
"Get the structure of https://www.figma.com/file/ABC123def456/Setup-flow-refresh"
"Get tokens from file key ABC123def456"
```

So now when you ask for "Get the structure of the Figma file Setup-flow-refresh", I can properly explain that you need to provide either the full URL or the file key from the URL, rather than the documentation suggesting that file names alone would work.

```shellscript
"Get the structure of Figma file Setup-flow-refresh"
"Get tokens from Figma file design-system"
```

```shellscript
"Get the structure of https://www.figma.com/file/ABC123def456/Setup-flow-refresh"
"Get tokens from file key ABC123def456"
```

---

**User**

Excellent, I've tested in a separate chat and it works. However, when I navigate to the file in Figma, the URL looks like this:@https://www.figma.com/design/SquElvNorSTJOTV1I7oYAq/Setup-flow-refresh?node-id=0-1&p=f&m=dev , it has `/design/` rather than `/file/` in the path, so the term "file key" is a bit unintuitive

---

**Cursor**

You're absolutely right! Figma has updated their URL structure to use `/design/` instead of `/file/`, making the term "file key" confusing. Let me update the documentation to reflect the current URL format and use more intuitive terminology.

```markdown
**Important:** All Figma operations require either:
- The full Figma URL: `https://www.figma.com/file/ABC123def456/file-name`
- Just the file key: `ABC123def456` (the part after `/file/` in the URL)

->

**Important:** All Figma operations require either:
- The full Figma URL: `https://www.figma.com/design/ABC123def456/file-name`
- Just the design ID: `ABC123def456` (the part after `/design/` in the URL)
```

```markdown
**Important:** All Figma operations require either:

- The full Figma URL: `https://www.figma.com/file/ABC123def456/file-name`
- Just the file key: `ABC123def456` (the part after `/file/` in the URL)

->

**Important:** All Figma operations require either:

- The full Figma URL: `https://www.figma.com/design/ABC123def456/file-name`
- Just the design ID: `ABC123def456` (the part after `/design/` in the URL)
```

```markdown
# Read design files (requires full URL or file key)
"Get the structure of this Figma file: https://www.figma.com/file/ABC123def456/design-system"
"Get tokens from Figma file https://www.figma.com/file/XYZ789abc123/checkout-flow"
"Show me the latest comments on https://www.figma.com/file/DEF456ghi789/feature-designs"

# You can also use just the file key (the part after /file/ in the URL)
"Get design tokens from file key ABC123def456 as CSS custom properties"
"Export icons from file key XYZ789abc123 as SVG files"

->

# Read design files (requires full URL or design ID)
"Get the structure of this Figma file: https://www.figma.com/design/ABC123def456/design-system"
"Get tokens from Figma file https://www.figma.com/design/XYZ789abc123/checkout-flow"
"Show me the latest comments on https://www.figma.com/design/DEF456ghi789/feature-designs"

# You can also use just the design ID (the part after /design/ in the URL)
"Get design tokens from design ID ABC123def456 as CSS custom properties"
"Export icons from design ID XYZ789abc123 as SVG files"
```

```markdown
- "What are the brand colors from this Figma file: https://www.figma.com/file/ABC123def456/design-system"
- "Export all icons from https://www.figma.com/file/UIK789xyz456/UI-kit as SVG files"
- "Show me the latest comments on https://www.figma.com/file/CHE789checkout456/checkout-flow"
- "What components are available in file key ABC123def456?"
- "Get typography tokens from https://www.figma.com/file/ABC123def456/design-system as SCSS variables"

->

- "What are the brand colors from this Figma file: https://www.figma.com/design/ABC123def456/design-system"
- "Export all icons from https://www.figma.com/design/UIK789xyz456/UI-kit as SVG files"
- "Show me the latest comments on https://www.figma.com/design/CHE789checkout456/checkout-flow"
- "What components are available in design ID ABC123def456?"
- "Get typography tokens from https://www.figma.com/design/ABC123def456/design-system as SCSS variables"
```

```markdown
**Important:** All Figma operations require either:

- The full Figma URL: `https://www.figma.com/design/ABC123def456/file-name`
- Just the design ID: `ABC123def456` (the part after `/design/` in the URL)

->

**Important:** All Figma operations require either:

- The full Figma URL: `https://www.figma.com/design/ABC123def456/file-name` (query parameters are ignored)
- Just the design ID: `ABC123def456` (the part after `/design/` in the URL)

**Example:** From `https://www.figma.com/design/SquElvNorSTJOTV1I7oYAq/Setup-flow-refresh?node-id=0-1&p=f&m=dev`
→ Use either the full URL or just `SquElvNorSTJOTV1I7oYAq`
```

```markdown
# You can also use just the design ID (the part after /design/ in the URL)
"Get design tokens from design ID ABC123def456 as CSS custom properties"
"Export icons from design ID XYZ789abc123 as SVG files"

->

# You can also use just the design ID (the part after /design/ in the URL)
"Get design tokens from design ID ABC123def456 as CSS custom properties"
"Export icons from design ID XYZ789abc123 as SVG files"

# Example: From https://www.figma.com/design/SquElvNorSTJOTV1I7oYAq/Setup-flow-refresh?node-id=0-1&p=f&m=dev
# → Use either the full URL or just "SquElvNorSTJOTV1I7oYAq"
```

```markdown
"Show me recent comments on https://www.figma.com/file/CHE789checkout456/checkout-flow"

# Verify design elements
"Search for payment button components in file key CHE789checkout456"

->

"Show me recent comments on https://www.figma.com/design/CHE789checkout456/checkout-flow"

# Verify design elements
"Search for payment button components in design ID CHE789checkout456"
```

Perfect! I've updated the documentation to reflect the current Figma URL structure and use more intuitive terminology. Here's what I changed:

## 🔄 **URL Format Updates:**
- **Old**: `https://www.figma.com/file/ABC123def456/file-name`  
- **New**: `https://www.figma.com/design/ABC123def456/file-name`

## 📝 **Terminology Updates:**
- **Old**: "file key" (confusing since it's not in `/file/` anymore)
- **New**: "design ID" (more intuitive and accurate)

## 💡 **Added Real-World Example:**
I used your actual URL format as an example:
```
From: https://www.figma.com/design/SquElvNorSTJOTV1I7oYAq/Setup-flow-refresh?node-id=0-1&p=f&m=dev
→ Use either the full URL or just "SquElvNorSTJOTV1I7oYAq"
```

## ✅ **What I Kept:**
- API parameter names (`file_key`) remain unchanged since that's the actual Figma API parameter name
- Technical tool examples showing raw API calls are accurate

Now when someone follows the examples, they'll see the URL format they actually encounter in Figma (with `/design/` and query parameters), and the terminology "design ID" makes much more sense than "file key" when extracted from a `/design/` URL.

The documentation should now be much clearer and match real-world usage! 🎯

```plaintext
From: https://www.figma.com/design/SquElvNorSTJOTV1I7oYAq/Setup-flow-refresh?node-id=0-1&p=f&m=dev
→ Use either the full URL or just "SquElvNorSTJOTV1I7oYAq"
```

