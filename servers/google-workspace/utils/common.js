/**
 * Common utilities for Google Workspace MCP Server
 */

/**
 * Format date for display
 */
export function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return dateString;
  }
}

/**
 * Truncate text to specified length with ellipsis
 */
export function truncateText(text, maxLength = 200) {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
}

/**
 * Clean text by removing extra whitespace and formatting
 */
export function cleanText(text) {
  if (!text) return "";

  return text
    .replace(/\s+/g, " ") // Replace multiple whitespace with single space
    .replace(/\n\s*\n/g, "\n\n") // Clean up multiple newlines
    .trim();
}

/**
 * Extract file ID from various Google Workspace URLs
 */
export function extractFileId(url) {
  // Already handled in auth.js for docs, but could be extended for other file types
  const patterns = [
    /\/document\/d\/([a-zA-Z0-9-_]+)/,
    /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/,
    /\/presentation\/d\/([a-zA-Z0-9-_]+)/,
    /\/file\/d\/([a-zA-Z0-9-_]+)/,
    /\/drive\/.*\/([a-zA-Z0-9-_]+)/,
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

  throw new Error(`Could not extract file ID from URL: ${url}`);
}

/**
 * Parse Google Workspace sharing permissions
 */
export function parsePermissions(permissions) {
  if (!permissions || !Array.isArray(permissions)) {
    return "Unknown permissions";
  }

  const permissionTypes = permissions.map((p) => {
    const role = p.role || "unknown";
    const type = p.type || "unknown";

    if (type === "anyone") {
      return `Anyone can ${role}`;
    } else if (type === "domain") {
      return `Domain can ${role}`;
    } else if (type === "user") {
      return `Specific users can ${role}`;
    }

    return `${type} can ${role}`;
  });

  return permissionTypes.join(", ");
}

/**
 * Create a consistent error response
 */
export function createErrorResponse(error, operation) {
  const errorMessage = error.message || "Unknown error occurred";

  return {
    content: [
      {
        type: "text",
        text: `# Error

**Operation:** ${operation}
**Error:** ${errorMessage}

Please check your authentication and permissions, then try again.`,
      },
    ],
  };
}

/**
 * Validate required parameters
 */
export function validateRequiredParams(params, requiredFields) {
  const missing = requiredFields.filter((field) => !params[field]);

  if (missing.length > 0) {
    throw new Error(`Missing required parameters: ${missing.join(", ")}`);
  }
}

/**
 * Rate limiting helper (basic implementation)
 */
export class RateLimiter {
  constructor(maxRequests = 100, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = [];
  }

  canMakeRequest() {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Remove old requests
    this.requests = this.requests.filter((time) => time > windowStart);

    // Check if we can make a new request
    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return true;
    }

    return false;
  }

  getWaitTime() {
    if (this.requests.length === 0) return 0;

    const oldestRequest = Math.min(...this.requests);
    const waitTime = this.windowMs - (Date.now() - oldestRequest);

    return Math.max(0, waitTime);
  }
}
