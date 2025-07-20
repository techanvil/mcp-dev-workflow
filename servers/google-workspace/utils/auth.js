import { google } from "googleapis";
import fs from "fs";

export class GoogleWorkspaceAuth {
  constructor() {
    this.auth = null;
    this.authType = null;
  }

  /**
   * Initialize authentication using service account or OAuth2
   */
  async initialize() {
    // Try service account first (preferred for server applications)
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      try {
        await this.initializeServiceAccount();
        console.error(
          "✓ Google Workspace: Service Account authentication initialized"
        );
        return;
      } catch (error) {
        console.error(
          "⚠ Google Workspace: Service Account auth failed:",
          error.message
        );
      }
    }

    // Try service account key file
    if (process.env.GOOGLE_SERVICE_ACCOUNT_FILE) {
      try {
        await this.initializeServiceAccountFile();
        console.error(
          "✓ Google Workspace: Service Account (file) authentication initialized"
        );
        return;
      } catch (error) {
        console.error(
          "⚠ Google Workspace: Service Account file auth failed:",
          error.message
        );
      }
    }

    // Fallback to OAuth2 (requires manual token setup)
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
      try {
        await this.initializeOAuth2();
        console.error("✓ Google Workspace: OAuth2 authentication initialized");
        return;
      } catch (error) {
        console.error("⚠ Google Workspace: OAuth2 auth failed:", error.message);
      }
    }

    throw new Error(
      "No valid Google authentication found. Please set up service account credentials or OAuth2."
    );
  }

  /**
   * Initialize using service account key (JSON string)
   */
  async initializeServiceAccount() {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

    this.auth = new google.auth.GoogleAuth({
      credentials,
      scopes: this.getRequiredScopes(),
    });

    this.authType = "service_account";
  }

  /**
   * Initialize using service account key file
   */
  async initializeServiceAccountFile() {
    const keyFile = process.env.GOOGLE_SERVICE_ACCOUNT_FILE;

    if (!fs.existsSync(keyFile)) {
      throw new Error(`Service account file not found: ${keyFile}`);
    }

    this.auth = new google.auth.GoogleAuth({
      keyFile,
      scopes: this.getRequiredScopes(),
    });

    this.authType = "service_account_file";
  }

  /**
   * Initialize using OAuth2 (requires manual token setup)
   */
  async initializeOAuth2() {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "urn:ietf:wg:oauth:2.0:oob" // For installed apps
    );

    // Try to load existing token
    const tokenPath = process.env.GOOGLE_TOKEN_FILE || ".google-token.json";

    if (fs.existsSync(tokenPath)) {
      const token = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
      oauth2Client.setCredentials(token);
    } else {
      // Generate auth URL for manual setup
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: this.getRequiredScopes(),
      });

      throw new Error(
        `OAuth2 token not found. Please visit this URL to authorize the application:\n${authUrl}\n\nThen save the token to ${tokenPath}`
      );
    }

    this.auth = oauth2Client;
    this.authType = "oauth2";
  }

  /**
   * Get the required Google API scopes
   */
  getRequiredScopes() {
    return [
      "https://www.googleapis.com/auth/documents.readonly",
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/spreadsheets.readonly",
      "https://www.googleapis.com/auth/gmail.readonly",
    ];
  }

  /**
   * Get authenticated client for API calls
   */
  async getAuthenticatedClient() {
    if (!this.auth) {
      await this.initialize();
    }

    if (
      this.authType === "service_account" ||
      this.authType === "service_account_file"
    ) {
      return await this.auth.getClient();
    }

    return this.auth;
  }

  /**
   * Get auth instance for Google API clients
   */
  async getAuth() {
    if (!this.auth) {
      await this.initialize();
    }
    return this.auth;
  }

  /**
   * Extract document ID from Google Docs URL
   */
  static extractDocumentId(url) {
    const patterns = [
      /\/document\/d\/([a-zA-Z0-9-_]+)/,
      /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/,
      /\/presentation\/d\/([a-zA-Z0-9-_]+)/,
      /id=([a-zA-Z0-9-_]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }

    // Check if it's already just an ID
    if (/^[a-zA-Z0-9-_]{25,}$/.test(url.trim())) {
      return url.trim();
    }

    throw new Error(`Could not extract document ID from URL: ${url}`);
  }

  /**
   * Extract email address from Gmail URL or return as-is if it's already an email
   */
  static extractEmailAddress(input) {
    // Check if it's already an email address
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(input)) {
      return input;
    }

    // Try to extract from Gmail URL patterns
    const gmailPatterns = [
      /mail\.google\.com.*[&#]q=([^&]+)/,
      /mail\.google\.com.*search\/([^\/&]+)/,
    ];

    for (const pattern of gmailPatterns) {
      const match = input.match(pattern);
      if (match) {
        return decodeURIComponent(match[1]);
      }
    }

    return input; // Return as-is if no pattern matches
  }
}
