# Google Workspace MCP Server Usage Guide

This guide provides practical examples for using the Google Workspace MCP server tools. For setup instructions, see the [Google Workspace Server README](servers/google-workspace/README.md).

## 🚀 Quick Reference

| Tool                      | Purpose                  | Use When                                   |
| ------------------------- | ------------------------ | ------------------------------------------ |
| `get_google_doc`          | Read Google Docs content | Extract design docs, specs, meeting notes  |
| `get_google_doc_metadata` | Get document properties  | Check sharing settings, modification dates |
| `search_google_doc`       | Search text within docs  | Find specific sections or references       |

## 💬 Natural Language Usage

The beauty of MCP tools is that you can interact with them using **natural language** rather than technical commands. Simply describe what you want to do!

### 🗣️ Natural Language Examples

**Reading Google Docs:**

- "Read the design doc at https://docs.google.com/document/d/1CzPZhhs..."
- "Show me the content of that Google Doc"
- "Get the document at [Google Docs URL]"
- "Extract the text from this design document"

**Document Search:**

- "Search for 'authentication' in the design document"
- "Find mentions of 'API endpoints' in that Google Doc"
- "Look for 'database schema' in the technical specification"
- "Where does it mention 'user permissions' in this doc?"

**Document Metadata:**

- "What's the metadata for this document?"
- "When was this Google Doc last modified?"
- "Who has access to this document?"
- "Show me the document properties"

### 🎯 Conversation Tips

**Be Specific About:**

- **Document URL or ID**: Include the full Google Docs URL or just the document ID
- **Search terms**: Use specific keywords for better search results
- **Format preferences**: "in markdown format" or "as plain text"

**Natural Phrases That Work:**

- "Show me..." / "Get me..." / "Read..."
- "Search for..." / "Find..." / "Look for..."
- "What's the..." / "Tell me about..."

## 📋 Detailed Usage Examples

### 1. Reading a Google Document

**Use Case:** You want to extract content from a design document or specification.

**Natural Language:**

```
"Read the design doc at https://docs.google.com/document/d/1CzPZhhsSlyfp718k2gSqMN-zHJdZ8Sr5eJcciZas2A0/"
```

**Technical Syntax:**

```
get_google_doc with:
- document_id: "https://docs.google.com/document/d/1CzPZhhsSlyfp718k2gSqMN-zHJdZ8Sr5eJcciZas2A0/"
- format: "structured"
```

**Format Options:**

- `"structured"` - Clean formatting with headings and lists (default)
- `"markdown"` - Markdown formatting with bold, italics
- `"plain"` - Plain text without formatting

**What you'll get:**

- Full document content with preserved formatting
- Document title and metadata
- Direct link to the original document
- Creation and modification dates

---

### 2. Getting Document Metadata

**Use Case:** Understanding document properties, sharing settings, and revision information.

**Natural Language:**

```
"What's the metadata for this Google Doc?"
```

**Technical Syntax:**

```
get_google_doc_metadata with:
- document_id: "1CzPZhhsSlyfp718k2gSqMN-zHJdZ8Sr5eJcciZas2A0"
```

**What you'll get:**

- Document title and ID
- Last modification date
- Page size and margin settings
- Revision information
- Sharing and access details

---

### 3. Searching Within Documents

**Use Case:** Finding specific sections, references, or topics within large documents.

**Natural Language:**

```
"Search for 'authentication flow' in the design document"
```

**Technical Syntax:**

```
search_google_doc with:
- document_id: "1CzPZhhsSlyfp718k2gSqMN-zHJdZ8Sr5eJcciZas2A0"
- search_text: "authentication flow"
- context_lines: 3
```

**Search Options:**

- `context_lines`: Number of lines to show around each match (default: 2)
- Search is case-insensitive
- Supports partial word matching

**What you'll get:**

- Number of matches found
- Each match with surrounding context
- Line numbers for reference
- Highlighted matching text

## 🎯 Real-World Workflows

### Workflow 1: Design Document Analysis

```bash
# 1. Get the full document content
"Read the design doc at [URL]"

# 2. Search for specific implementation details
"Search for 'API endpoints' in this document"

# 3. Find security considerations
"Look for 'authentication' or 'security' in the doc"

# 4. Check document metadata
"What's the metadata for this document?"
```

**Use Case:** Understanding a design document before implementing features.

---

### Workflow 2: Meeting Notes Research

```bash
# 1. Extract meeting notes
"Get the content from this meeting notes document"

# 2. Find action items
"Search for 'TODO' or 'action item' in the notes"

# 3. Look for decisions made
"Find mentions of 'decision' or 'agreed' in the document"
```

**Use Case:** Following up on meeting outcomes and action items.

---

### Workflow 3: Specification Review

```bash
# 1. Read the technical specification
"Show me the content of this technical specification"

# 2. Find specific requirements
"Search for 'requirement' or 'must' in the spec"

# 3. Check for examples
"Look for 'example' or 'sample' in the document"
```

**Use Case:** Reviewing technical specifications for implementation guidance.

## 🔍 Advanced Search Techniques

### Effective Search Terms

**Technical Documentation:**

- "API", "endpoint", "interface"
- "schema", "database", "model"
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

### Search Tips

1. **Use specific keywords:** "authentication flow" vs. "auth"
2. **Try synonyms:** "requirement" and "must" and "should"
3. **Search for sections:** "conclusion", "summary", "next steps"
4. **Look for code:** "function", "class", "method"

## 💡 Tips & Best Practices

### Document Access

**Public Documents:**

- Any publicly shared Google Doc can be read
- Use "Anyone with the link" sharing for easy access

**Private Documents:**

- Share document with your service account email
- Or use OAuth2 for personal document access

### Performance Tips

- **Large documents:** Use search to find specific sections instead of reading everything
- **Multiple searches:** Try different keywords to ensure complete coverage
- **Rate limiting:** The server has built-in rate limiting for API protection

### Content Extraction

- **Tables:** Automatically converted to readable format
- **Images:** Descriptions extracted where possible
- **Lists:** Properly formatted with indentation
- **Headings:** Preserved hierarchy in structured format

## 🆘 Troubleshooting

### Common Issues

**"Document not found" errors:**

```bash
# Solutions:
1. Check if URL is correct
2. Ensure document is shared with service account
3. Verify document isn't deleted or moved
```

**"Permission denied" errors:**

```bash
# Solutions:
1. Share document with service account email
2. Check OAuth2 authentication is working
3. Verify Google Docs API is enabled
```

**"No matches found" in search:**

```bash
# Solutions:
1. Try broader search terms
2. Check spelling of search text
3. Use partial words or synonyms
4. Verify content exists in the document
```

### Debug Steps

1. **Test with public document first**
2. **Verify authentication setup**
3. **Check Google Cloud Console for API quotas**
4. **Test with simple document ID instead of full URL**

## 🔮 Future Capabilities

### Coming Soon

**Google Sheets Integration:**

- Read spreadsheet data and formulas
- Search across multiple sheets
- Extract charts and pivot tables

**Gmail Integration:**

- Search and read emails
- Extract attachments and metadata
- Analyze conversation threads

**Google Drive Integration:**

- Browse files and folders
- Check sharing permissions
- Search across all file types

### Integration Ideas

- **Documentation Workflow:** Read design docs → Extract requirements → Create implementation tasks
- **Research Workflow:** Search multiple documents → Compile findings → Generate reports
- **Review Workflow:** Read specifications → Find inconsistencies → Document issues

---

**Need help?** Check the [Google Workspace Server README](servers/google-workspace/README.md) for setup instructions or the main [project documentation](README.md).
