# Google Workspace MCP Server

A comprehensive Model Context Protocol (MCP) server for Google Workspace applications. This server provides tools to read and interact with Google Docs, Sheets, Gmail, and other Google Workspace services through natural language commands.

## 🌟 Features

### Current Capabilities (v1.0)

#### 📄 Google Docs

- **Read Documents**: Extract full content from Google Docs with formatting preservation
- **Document Metadata**: Get document properties, sharing settings, and revision info
- **Search Within Docs**: Find specific text with context highlighting
- **Multiple Format Support**: Plain text, Markdown, or structured output

### 🚧 Planned Capabilities (Future Versions)

#### 📊 Google Sheets

- Read spreadsheet data and formulas
- Search across sheets and ranges
- Extract charts and pivot tables

#### 📧 Gmail

- Search and read emails
- Extract attachments and metadata
- Thread conversation analysis

#### 📁 Google Drive

- File and folder browsing
- Permission and sharing analysis
- Search across all file types

## 🛠️ Available Tools

### Google Docs

| Tool                      | Description                 | Use Case                                           |
| ------------------------- | --------------------------- | -------------------------------------------------- |
| `get_google_doc`          | Read full document content  | Extract design docs, specifications, meeting notes |
| `get_google_doc_metadata` | Get document properties     | Check sharing settings, last modified date         |
| `search_google_doc`       | Search text within document | Find specific sections or references               |

## 🔧 Setup & Authentication

### Prerequisites

1. **Google Cloud Project** with APIs enabled:

   - Google Docs API
   - Google Drive API
   - Google Sheets API (for future features)
   - Gmail API (for future features)

2. **Authentication** (choose one method):

### Method 1: Service Account (Recommended)

**Best for:** Server applications, automated scripts, team use

1. **Create Service Account:**

   ```bash
   # Go to Google Cloud Console
   https://console.cloud.google.com/iam-admin/serviceaccounts

   # Create new service account
   # Download JSON key file
   ```

2. **Set Environment Variables:**

   ```bash
   # Option A: Direct JSON content
   export GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'

   # Option B: File path
   export GOOGLE_SERVICE_ACCOUNT_FILE="/path/to/service-account-key.json"
   ```

3. **Share Documents:** Share Google Docs with the service account email

### Method 2: OAuth2 (Personal Use)

**Best for:** Personal projects, development, testing

1. **Create OAuth2 Credentials:**

   ```bash
   # Go to Google Cloud Console
   https://console.cloud.google.com/apis/credentials

   # Create OAuth 2.0 Client IDs
   # Download client secrets
   ```

2. **Set Environment Variables:**

   ```bash
   export GOOGLE_CLIENT_ID="your_client_id"
   export GOOGLE_CLIENT_SECRET="your_client_secret"
   export GOOGLE_TOKEN_FILE=".google-token.json"
   ```

3. **Authorize Application:**
   ```bash
   # The server will provide authorization URL on first run
   # Visit URL, authorize, save token to file
   ```

## 🚀 Usage Examples

### Reading a Google Doc

```bash
# Simple URL or ID
get_google_doc with:
- document_id: "https://docs.google.com/document/d/1CzPZhhsSlyfp718k2gSqMN-zHJdZ8Sr5eJcciZas2A0/"

# Different output formats
get_google_doc with:
- document_id: "1CzPZhhsSlyfp718k2gSqMN-zHJdZ8Sr5eJcciZas2A0"
- format: "markdown"
```

### Natural Language Examples

Instead of technical tool calls, you can use natural language:

- "Read the design doc at https://docs.google.com/document/d/1CzPZhhs..."
- "Show me the content of that Google Doc"
- "Search for 'authentication' in the design document"
- "What's the metadata for this document?"

### Searching Within Documents

```bash
search_google_doc with:
- document_id: "1CzPZhhsSlyfp718k2gSqMN-zHJdZ8Sr5eJcciZas2A0"
- search_text: "authentication flow"
- context_lines: 3
```

## 📁 Architecture

The server follows a modular architecture for easy extension:

```
servers/google-workspace/
├── index.js              # Main server entry point
├── modules/
│   ├── docs.js           # Google Docs functionality ✅
│   ├── sheets.js         # Google Sheets (planned)
│   ├── gmail.js          # Gmail functionality (planned)
│   └── drive.js          # Google Drive (planned)
├── utils/
│   ├── auth.js           # Shared authentication
│   ├── common.js         # Common utilities
│   └── errors.js         # Error handling
└── README.md             # This file
```

## 🔒 Security & Permissions

### Required Google API Scopes

```javascript
// Current scopes (read-only)
"https://www.googleapis.com/auth/documents.readonly";
"https://www.googleapis.com/auth/drive.readonly";
"https://www.googleapis.com/auth/spreadsheets.readonly";
"https://www.googleapis.com/auth/gmail.readonly";
```

### Best Practices

- ✅ **Use Service Accounts** for production deployments
- ✅ **Principle of Least Privilege** - only enable needed APIs
- ✅ **Rotate Credentials** regularly
- ✅ **Monitor API Usage** through Google Cloud Console
- ✅ **Share Documents Explicitly** with service account email

## 🚨 Troubleshooting

### Common Issues

**"No valid Google authentication found"**

```bash
# Solution: Set up authentication environment variables
export GOOGLE_SERVICE_ACCOUNT_KEY='...'
# OR
export GOOGLE_SERVICE_ACCOUNT_FILE='/path/to/key.json'
```

**"Document not found" or "Permission denied"**

```bash
# Solution: Share the document with service account email
# Or check if OAuth2 user has access
```

**"Rate limit exceeded"**

```bash
# Solution: The server has built-in rate limiting
# Wait for the specified time before retrying
```

**"Could not extract document ID from URL"**

```bash
# Solution: Use proper Google Docs URL format:
# https://docs.google.com/document/d/DOCUMENT_ID/
# Or just the document ID: DOCUMENT_ID
```

### Debug Steps

1. **Test Authentication:**

   ```bash
   npm run start:google-workspace
   # Should show "Google Workspace: [Auth Method] authentication initialized"
   ```

2. **Verify API Access:**

   ```bash
   # Check Google Cloud Console APIs & Services
   # Ensure Docs API is enabled
   ```

3. **Test Document Access:**
   ```bash
   # Try with a publicly shared document first
   # Then test with service account shared documents
   ```

## 🔮 Future Extensions

### Planned Modules

**Google Sheets Module:**

- `get_google_sheet` - Read spreadsheet data
- `search_sheet_data` - Find data across sheets
- `get_sheet_metadata` - Spreadsheet properties

**Gmail Module:**

- `search_gmail` - Search emails by query
- `get_email_thread` - Read conversation threads
- `list_gmail_labels` - Get available labels

**Google Drive Module:**

- `list_drive_files` - Browse files and folders
- `search_drive` - Search across all files
- `get_file_permissions` - Check sharing settings

### Integration Ideas

- **Cross-App Workflows**: Read from Docs → Write to Sheets → Email via Gmail
- **Content Analysis**: Extract data from Docs, analyze in Sheets
- **Automated Reporting**: Aggregate data from multiple sources

## 📄 License

Part of the `mcp-dev-workflow` project - MIT License

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch for new Google Workspace modules
3. Follow the existing module pattern in `modules/`
4. Add comprehensive error handling and tests
5. Update this README with new capabilities
6. Submit a pull request

---

**Ready to extend Google Workspace capabilities?** The modular architecture makes it easy to add new services and tools!
