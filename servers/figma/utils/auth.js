/**
 * Figma Authentication Module
 * Handles Figma API authentication using personal access tokens
 */

export class FigmaAuth {
  constructor() {
    this.token = null;
    this.defaultTeamId = null;
    this.defaultProjectId = null;
    this.baseUrl = "https://api.figma.com/v1";
  }

  /**
   * Initialize authentication using Figma personal access token
   */
  async initialize() {
    if (!process.env.FIGMA_ACCESS_TOKEN) {
      throw new Error(
        "No Figma access token found. Please set FIGMA_ACCESS_TOKEN environment variable.\n" +
          "Get your token at: https://www.figma.com/developers/api#access-tokens"
      );
    }

    this.token = process.env.FIGMA_ACCESS_TOKEN;
    this.defaultTeamId = process.env.DEFAULT_FIGMA_TEAM_ID;
    this.defaultProjectId = process.env.DEFAULT_FIGMA_PROJECT_ID;

    // Test the token by making a simple API call
    try {
      await this.testConnection();
      console.error("✓ Figma: Authentication initialized successfully");
    } catch (error) {
      throw new Error(`Figma authentication failed: ${error.message}`);
    }
  }

  /**
   * Test the API connection
   */
  async testConnection() {
    const response = await this.makeRequest("/me");
    if (!response.id) {
      throw new Error("Invalid response from Figma API");
    }
    return response;
  }

  /**
   * Make an authenticated request to the Figma API
   */
  async makeRequest(endpoint, options = {}) {
    if (!this.token) {
      throw new Error("Figma authentication not initialized");
    }

    const url = endpoint.startsWith("http")
      ? endpoint
      : `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        "X-Figma-Token": this.token,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Figma API error: ${response.status} ${response.statusText}`;

      try {
        const errorData = JSON.parse(errorText);
        if (errorData.err) {
          errorMessage += ` - ${errorData.err}`;
        }
      } catch {
        // If error response isn't JSON, use the text
        if (errorText) {
          errorMessage += ` - ${errorText}`;
        }
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  }

  /**
   * Get default team ID
   */
  getDefaultTeamId() {
    return this.defaultTeamId;
  }

  /**
   * Get default project ID
   */
  getDefaultProjectId() {
    return this.defaultProjectId;
  }

  /**
   * Extract file key from Figma URL or return as-is if already a key
   */
  extractFileKey(fileUrlOrKey) {
    if (!fileUrlOrKey) {
      throw new Error("File URL or key is required");
    }

    // If it's already a file key (not a URL), return it
    if (!fileUrlOrKey.includes("figma.com")) {
      return fileUrlOrKey;
    }

    // Extract from Figma URL patterns:
    // https://www.figma.com/file/FILE_KEY/title
    // https://www.figma.com/design/FILE_KEY/title
    const patterns = [
      /figma\.com\/file\/([a-zA-Z0-9]+)/,
      /figma\.com\/design\/([a-zA-Z0-9]+)/,
      /figma\.com\/proto\/([a-zA-Z0-9]+)/,
    ];

    for (const pattern of patterns) {
      const match = fileUrlOrKey.match(pattern);
      if (match) {
        return match[1];
      }
    }

    throw new Error(
      "Could not extract file key from URL. Please provide a valid Figma file URL or file key."
    );
  }

  /**
   * Resolve team and project parameters with defaults
   */
  resolveTeamProject(args) {
    return {
      teamId: args.team_id || this.defaultTeamId,
      projectId: args.project_id || this.defaultProjectId,
    };
  }
}
