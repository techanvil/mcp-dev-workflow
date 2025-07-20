/**
 * Common utilities for Figma MCP Server
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
 * Create error response for MCP
 */
export function createErrorResponse(error, toolName) {
  return {
    content: [
      {
        type: "text",
        text: `Error in ${toolName}: ${error.message}`,
      },
    ],
  };
}

/**
 * Format Figma color to CSS format
 */
export function formatColor(figmaColor) {
  if (!figmaColor) return "transparent";

  const { r, g, b, a = 1 } = figmaColor;

  // Convert from 0-1 range to 0-255 range
  const red = Math.round(r * 255);
  const green = Math.round(g * 255);
  const blue = Math.round(b * 255);

  if (a === 1) {
    // Return hex if fully opaque
    return `#${red.toString(16).padStart(2, "0")}${green
      .toString(16)
      .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;
  } else {
    // Return rgba if has transparency
    return `rgba(${red}, ${green}, ${blue}, ${a.toFixed(3)})`;
  }
}

/**
 * Format typography information
 */
export function formatTypography(textStyle) {
  if (!textStyle) return null;

  return {
    fontFamily: textStyle.fontFamily,
    fontWeight: textStyle.fontWeight,
    fontSize: `${textStyle.fontSize}px`,
    lineHeight: textStyle.lineHeightPx
      ? `${textStyle.lineHeightPx}px`
      : textStyle.lineHeightPercentFontSize
      ? `${textStyle.lineHeightPercentFontSize}%`
      : "normal",
    letterSpacing: textStyle.letterSpacing
      ? `${textStyle.letterSpacing}px`
      : "normal",
    textAlign: textStyle.textAlignHorizontal?.toLowerCase() || "left",
  };
}

/**
 * Extract design tokens from Figma nodes
 */
export function extractDesignTokens(nodes) {
  const tokens = {
    colors: {},
    typography: {},
    spacing: {},
    effects: {},
  };

  function processNode(node, path = []) {
    // Extract colors from fills
    if (node.fills && Array.isArray(node.fills)) {
      node.fills.forEach((fill, index) => {
        if (fill.type === "SOLID" && fill.color) {
          const colorName = node.name || `${path.join("-")}-fill-${index}`;
          tokens.colors[colorName] = formatColor(fill.color);
        }
      });
    }

    // Extract colors from strokes
    if (node.strokes && Array.isArray(node.strokes)) {
      node.strokes.forEach((stroke, index) => {
        if (stroke.type === "SOLID" && stroke.color) {
          const colorName = `${node.name || path.join("-")}-stroke-${index}`;
          tokens.colors[colorName] = formatColor(stroke.color);
        }
      });
    }

    // Extract typography from text nodes
    if (node.type === "TEXT" && node.style) {
      const typographyName = node.name || path.join("-");
      tokens.typography[typographyName] = formatTypography(node.style);
    }

    // Extract spacing information
    if (node.paddingLeft !== undefined || node.paddingTop !== undefined) {
      const spacingName = node.name || path.join("-");
      tokens.spacing[spacingName] = {
        paddingTop: node.paddingTop || 0,
        paddingRight: node.paddingRight || 0,
        paddingBottom: node.paddingBottom || 0,
        paddingLeft: node.paddingLeft || 0,
      };
    }

    // Extract effects (shadows, blurs)
    if (node.effects && Array.isArray(node.effects)) {
      node.effects.forEach((effect, index) => {
        if (effect.visible !== false) {
          const effectName = `${node.name || path.join("-")}-effect-${index}`;
          tokens.effects[effectName] = {
            type: effect.type,
            ...effect,
          };
        }
      });
    }

    // Recursively process children
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child) => {
        processNode(child, [...path, node.name || node.type]);
      });
    }
  }

  if (Array.isArray(nodes)) {
    nodes.forEach((node) => processNode(node));
  } else {
    processNode(nodes);
  }

  return tokens;
}

/**
 * Filter nodes by type
 */
export function filterNodesByType(nodes, nodeType) {
  const result = [];

  function traverse(node) {
    if (node.type === nodeType) {
      result.push(node);
    }
    if (node.children) {
      node.children.forEach(traverse);
    }
  }

  if (Array.isArray(nodes)) {
    nodes.forEach(traverse);
  } else {
    traverse(nodes);
  }

  return result;
}

/**
 * Search nodes by name or text content
 */
export function searchNodes(nodes, searchTerm, options = {}) {
  const {
    includeType = true,
    includeText = true,
    caseSensitive = false,
  } = options;
  const result = [];
  const term = caseSensitive ? searchTerm : searchTerm.toLowerCase();

  function traverse(node, path = []) {
    let matches = false;

    // Search in node name
    if (includeType && node.name) {
      const name = caseSensitive ? node.name : node.name.toLowerCase();
      if (name.includes(term)) {
        matches = true;
      }
    }

    // Search in text content
    if (includeText && node.characters) {
      const text = caseSensitive
        ? node.characters
        : node.characters.toLowerCase();
      if (text.includes(term)) {
        matches = true;
      }
    }

    if (matches) {
      result.push({
        ...node,
        path: [...path, node.name || node.type],
      });
    }

    // Recursively search children
    if (node.children) {
      node.children.forEach((child) => {
        traverse(child, [...path, node.name || node.type]);
      });
    }
  }

  if (Array.isArray(nodes)) {
    nodes.forEach((node) => traverse(node));
  } else {
    traverse(nodes);
  }

  return result;
}

/**
 * Rate limiting helper (basic implementation)
 */
export class RateLimiter {
  constructor(maxRequests = 300, windowMs = 60000) {
    // Figma allows 300 requests per minute
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
