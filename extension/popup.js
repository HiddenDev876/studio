// Configuration
// IMPORTANT: For a React app without Next.js API routes, this extension
// would need to call a dedicated backend server where your Genkit flows are exposed.
// The API_BASE_URL should point to that backend.
// For this example, we'll assume such a backend exists at localhost:3001 (placeholder).
// The original Next.js API routes (e.g., /api/ai/polish-email) are NO LONGER VALID.
const API_BASE_URL = "http://localhost:3001"; // Placeholder for your dedicated AI backend

// --- Helper Functions ---

function setLoading(toolPrefix, isLoading) {
    const button = document.getElementById(`${toolPrefix}-button`);
    const loader = document.getElementById(`${toolPrefix}-loader`);
    if (button) button.disabled = isLoading;
    if (loader) loader.style.display = isLoading ? 'block' : 'none';
}

function displayResult(toolPrefix, result) {
    const outputArea = document.getElementById(`${toolPrefix}-output`);
    if (outputArea) {
        outputArea.textContent = result;
    }
    hideError(toolPrefix);
}

function displayError(toolPrefix, error) {
    const errorArea = document.getElementById(`${toolPrefix}-error`);
    if (errorArea) {
        console.error(`Error in ${toolPrefix}:`, error);
        let errorMessageText = `Error: ${error.message || 'An unknown error occurred.'}`;
        if (error.message && error.message.includes("Failed to fetch")) {
            errorMessageText += " Ensure your AI backend server is running and accessible at " + API_BASE_URL;
        }
        errorArea.textContent = errorMessageText;
        errorArea.style.display = 'block';
    }
    const outputArea = document.getElementById(`${toolPrefix}-output`);
    if (outputArea) {
        outputArea.textContent = '';
    }
}


function hideError(toolPrefix) {
    const errorArea = document.getElementById(`${toolPrefix}-error`);
    if (errorArea) {
        errorArea.textContent = '';
        errorArea.style.display = 'none';
    }
}

async function callApi(endpoint, body) {
    // NOTE: The endpoint paths here (e.g., '/polish-email') are placeholders.
    // You need to define these routes on your dedicated backend server that
    // invokes the corresponding Genkit flows.
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            let errorMessage = `API Error: ${response.status} ${response.statusText}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.error || errorData.message || errorMessage;
            } catch (e) {
                // Ignore if response is not JSON
            }
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error("API Call failed:", error);
        throw error;
    }
}

// --- Event Listeners ---
// NOTE: The API endpoints (e.g., '/polish-email') below are illustrative.
// You would need to implement these on your backend server.

document.getElementById('polish-button')?.addEventListener('click', async () => {
    const toolPrefix = 'polish';
    const input = document.getElementById('polish-input').value;
    if (!input) {
        displayError(toolPrefix, { message: "Please enter email text." });
        return;
    }
    hideError(toolPrefix);
    setLoading(toolPrefix, true);
    try {
        // Example: your backend might expose a route like '/api/v1/polish-email'
        const result = await callApi('/polish-email', { text: input }); 
        displayResult(toolPrefix, result.improvedText); // Adjust based on your backend's response structure
    } catch (error) {
        displayError(toolPrefix, error);
    } finally {
        setLoading(toolPrefix, false);
    }
});

document.getElementById('summarize-button')?.addEventListener('click', async () => {
    const toolPrefix = 'summarize';
    const input = document.getElementById('summarize-input').value;
     if (!input) {
        displayError(toolPrefix, { message: "Please enter text to summarize." });
        return;
    }
    hideError(toolPrefix);
    setLoading(toolPrefix, true);
    try {
        const result = await callApi('/summarize', { text: input });
        displayResult(toolPrefix, result.summary); // Adjust based on your backend's response structure
    } catch (error) {
        displayError(toolPrefix, error);
    } finally {
        setLoading(toolPrefix, false);
    }
});

document.getElementById('generate-button')?.addEventListener('click', async () => {
    const toolPrefix = 'generate';
    const prompt = document.getElementById('generate-prompt').value;
    if (!prompt) {
        displayError(toolPrefix, { message: "Please enter a prompt." });
        return;
    }
    hideError(toolPrefix);
    setLoading(toolPrefix, true);
    try {
        const result = await callApi('/generate-content', { prompt: prompt });
        displayResult(toolPrefix, result.generatedContent); // Adjust
    } catch (error) {
        displayError(toolPrefix, error);
    } finally {
        setLoading(toolPrefix, false);
    }
});

document.getElementById('translate-button')?.addEventListener('click', async () => {
    const toolPrefix = 'translate';
    const text = document.getElementById('translate-input').value;
    const targetLanguage = document.getElementById('translate-language').value;
     if (!text) {
        displayError(toolPrefix, { message: "Please enter text to translate." });
        return;
    }
     if (!targetLanguage) {
        displayError(toolPrefix, { message: "Please select a target language." });
        return;
    }
    hideError(toolPrefix);
    setLoading(toolPrefix, true);
    try {
        const result = await callApi('/translate', { text, targetLanguage });
        displayResult(toolPrefix, result.translatedText); // Adjust
    } catch (error) {
        displayError(toolPrefix, error);
    } finally {
        setLoading(toolPrefix, false);
    }
});

document.getElementById('grammar-button')?.addEventListener('click', async () => {
    const toolPrefix = 'grammar';
    const input = document.getElementById('grammar-input').value;
    if (!input) {
        displayError(toolPrefix, { message: "Please enter text to check." });
        return;
    }
    hideError(toolPrefix);
    setLoading(toolPrefix, true);
    try {
        const result = await callApi('/grammar-check', { text: input });
        displayResult(toolPrefix, result.correctedText); // Adjust
    } catch (error) {
        displayError(toolPrefix, error);
    } finally {
        setLoading(toolPrefix, false);
    }
});

// Add a general message if the API_BASE_URL is still the default Next.js one.
if (API_BASE_URL === "http://localhost:9002") {
    console.warn("TextTransformer Extension: API_BASE_URL is set to the default Next.js development server. This extension now requires a separate backend server for AI functionalities after converting the main app to React. Please update API_BASE_URL in popup.js to point to your dedicated AI backend.");
    const container = document.querySelector('.container');
    if (container) {
        const warningDiv = document.createElement('div');
        warningDiv.textContent = "Note: This extension's AI features require a dedicated backend server. The current API URL may not work with the React-converted application. See console for details.";
        warningDiv.style.backgroundColor = "yellow";
        warningDiv.style.padding = "10px";
        warningDiv.style.marginTop = "10px";
        warningDiv.style.border = "1px solid orange";
        container.insertBefore(warningDiv, container.firstChild);
    }
}
