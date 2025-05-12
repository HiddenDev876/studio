
// Configuration - CHANGE THIS FOR PRODUCTION
const API_BASE_URL = "http://localhost:9002"; // Use your deployed app's URL in production

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
        // Use textContent to prevent potential XSS if the result contained HTML
        outputArea.textContent = result;
    }
    hideError(toolPrefix); // Hide error if successful
}

function displayError(toolPrefix, error) {
    const errorArea = document.getElementById(`${toolPrefix}-error`);
    if (errorArea) {
        console.error(`Error in ${toolPrefix}:`, error);
        errorArea.textContent = `Error: ${error.message || 'An unknown error occurred.'}`;
        errorArea.style.display = 'block';
    }
     // Clear previous results on error
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
                errorMessage = errorData.error || errorMessage;
            } catch (e) {
                // Ignore if response is not JSON
            }
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error("API Call failed:", error);
        throw error; // Re-throw the error to be caught by the caller
    }
}

// --- Event Listeners ---

// Polish Email
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
        const result = await callApi('/api/ai/polish-email', { text: input });
        displayResult(toolPrefix, result.improvedText);
    } catch (error) {
        displayError(toolPrefix, error);
    } finally {
        setLoading(toolPrefix, false);
    }
});

// Summarize Content
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
        const result = await callApi('/api/ai/summarize', { text: input });
        displayResult(toolPrefix, result.summary);
    } catch (error) {
        displayError(toolPrefix, error);
    } finally {
        setLoading(toolPrefix, false);
    }
});

// Generate Content
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
        const result = await callApi('/api/ai/generate-content', { prompt: prompt });
        displayResult(toolPrefix, result.generatedContent);
    } catch (error) {
        displayError(toolPrefix, error);
    } finally {
        setLoading(toolPrefix, false);
    }
});

// Translate Text
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
        const result = await callApi('/api/ai/translate', { text, targetLanguage });
        displayResult(toolPrefix, result.translatedText);
    } catch (error) {
        displayError(toolPrefix, error);
    } finally {
        setLoading(toolPrefix, false);
    }
});

// Grammar Check
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
        const result = await callApi('/api/ai/grammar-check', { text: input });
        displayResult(toolPrefix, result.correctedText);
    } catch (error) {
        displayError(toolPrefix, error);
    } finally {
        setLoading(toolPrefix, false);
    }
});
