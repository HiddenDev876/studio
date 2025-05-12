
# TextTransformer AI Tools Chrome Extension

This directory contains the files needed to build the TextTransformer Chrome Extension.

## Features

Allows you to quickly access TextTransformer's AI tools directly from your browser toolbar:
*   Polish Email
*   Summarize Content
*   Generate Content
*   Translate Text

## Setup and Installation

### 1. Configure Backend URL

*   Open `extension/popup.js`.
*   Find the line `const API_BASE_URL = "http://localhost:9002";`.
*   **For Development:** Keep this URL if your Next.js app is running locally on port 9002.
*   **For Production:** Change this URL to the actual domain where your TextTransformer Next.js application is deployed (e.g., `"https://www.your-text-transformer-app.com"`).
*   Also, update the `host_permissions` in `extension/manifest.json` to include your production domain pattern (e.g., `"*://*.your-text-transformer-app.com/*"`).

### 2. Add Icons

*   This folder currently contains placeholder `icon16.png`, `icon48.png`, and `icon128.png` files inside the `icons/` subdirectory.
*   **Replace these placeholders** with your actual extension icons (ensure they are PNG format and the correct dimensions).

### 3. Build Your Next.js App (If Deploying)

*   If you are preparing the extension for a deployed version of your app, make sure your Next.js application is built and running at the URL specified in `API_BASE_URL`.

### 4. Load the Extension in Chrome (Development)

*   Open Google Chrome.
*   Navigate to `chrome://extensions/`.
*   Enable "Developer mode" using the toggle switch in the top-right corner.
*   Click the "Load unpacked" button.
*   Select the `extension` directory (the directory containing `manifest.json`, not the `manifest.json` file itself).
*   The TextTransformer extension icon should appear in your browser toolbar.

### 5. Packaging for Distribution (Manual Upload)

*   Once you have tested the extension and are ready to distribute it (e.g., via the Chrome Web Store):
    *   Make sure the `API_BASE_URL` in `popup.js` and `host_permissions` in `manifest.json` are set to your production URLs.
    *   Ensure you have replaced the placeholder icons.
    *   Create a ZIP archive containing **only the contents** of the `extension` directory (`manifest.json`, `popup.html`, `popup.js`, and the `icons` folder). Do **not** include the `extension` directory itself in the zip file's root.
        *   On Mac: Select all files/folders inside `extension`, right-click, and choose "Compress X items".
        *   On Windows: Select all files/folders inside `extension`, right-click, select "Send to" > "Compressed (zipped) folder".
    *   This ZIP file is what you will upload to the Chrome Web Store developer dashboard.

## Usage

*   Click the TextTransformer icon in your Chrome toolbar.
*   The popup window will appear.
*   Use the different sections within the popup to access the AI tools.
*   Enter your text or prompt and click the corresponding button (e.g., "Polish", "Summarize").
*   The results will appear in the designated output area below the button. Loading indicators and error messages will be displayed as needed.
