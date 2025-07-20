#!/usr/bin/env node

/**
 * Google OAuth2 Setup Helper
 * Run this script to complete Google Workspace authentication
 */

import { google } from "googleapis";
import fs from "fs";
import http from "http";
import url from "url";
import { exec } from "child_process";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const TOKEN_PATH = ".google-token.json";

// Validate required environment variables
if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("❌ Missing required environment variables!");
  console.error("\nPlease set the following in your .env file:");
  console.error("- GOOGLE_CLIENT_ID=your_client_id_here");
  console.error("- GOOGLE_CLIENT_SECRET=your_client_secret_here");
  console.error("\nYou can copy env.example to .env and fill in your values.");
  console.error(
    "Get your credentials at: https://console.cloud.google.com/apis/credentials"
  );
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "http://localhost:8080"
);

const SCOPES = [
  "https://www.googleapis.com/auth/documents.readonly",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
  "https://www.googleapis.com/auth/gmail.readonly",
];

async function getNewToken() {
  return new Promise((resolve, reject) => {
    // Create a local server to handle the OAuth callback
    const server = http.createServer(async (req, res) => {
      const queryObject = url.parse(req.url, true).query;

      if (queryObject.code) {
        // Send success response
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
          <html>
            <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
              <h1 style="color: green;">✅ Authentication Successful!</h1>
              <p>You can now close this tab and return to your terminal.</p>
              <p>Google Workspace integration is now active in Cursor.</p>
            </body>
          </html>
        `);

        server.close();

        try {
          // Exchange code for tokens
          const { tokens } = await oauth2Client.getToken(queryObject.code);

          // Save the token
          fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));

          console.log("\n✅ Token saved successfully!");
          console.log(`📁 Token saved to: ${TOKEN_PATH}`);
          console.log("\n🎉 Google Workspace authentication is now complete!");
          console.log("\nYou can now:");
          console.log("- Restart Cursor");
          console.log('- Try: "Read the design doc at [Google Docs URL]"');
          console.log(
            "- Try: \"Search for 'authentication' in that document\""
          );
          console.log(
            "\n💡 To re-authenticate in the future, run: npm run auth:google"
          );

          resolve(tokens);
        } catch (error) {
          console.error("\n❌ Error retrieving access token:", error.message);
          reject(error);
        }
      } else if (queryObject.error) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end(`
          <html>
            <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
              <h1 style="color: red;">❌ Authentication Failed</h1>
              <p>Error: ${queryObject.error}</p>
              <p>Please try again.</p>
            </body>
          </html>
        `);
        server.close();
        reject(new Error(`Authentication failed: ${queryObject.error}`));
      }
    });

    server.listen(8080, () => {
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
      });

      console.log("📋 Google Workspace OAuth2 Setup");
      console.log("================================\n");
      console.log("🌐 Opening browser for authentication...");
      console.log("   If it doesn't open automatically, visit this URL:");
      console.log("\n" + authUrl + "\n");
      console.log("⏳ Waiting for authentication to complete...\n");

      // Try to open the URL in the default browser
      const start =
        process.platform === "darwin"
          ? "open"
          : process.platform === "win32"
          ? "start"
          : "xdg-open";

      exec(`${start} "${authUrl}"`, (err) => {
        if (err) {
          console.log("⚠️  Could not open browser automatically.");
          console.log(
            "   Please copy and paste the URL above into your browser."
          );
        }
      });
    });

    server.on("error", (err) => {
      console.error("❌ Server error:", err.message);
      reject(err);
    });
  });
}

async function main() {
  try {
    // Check if token already exists
    if (fs.existsSync(TOKEN_PATH)) {
      console.log("✅ Token file already exists at:", TOKEN_PATH);
      console.log(
        "🔄 If you want to re-authenticate, delete this file and run: npm run auth:google"
      );
      return;
    }

    await getNewToken();
  } catch (error) {
    console.error("❌ Setup failed:", error.message);
    process.exit(1);
  }
}

main();
