// Configuration
const API_BASE_URL = "http://localhost:3400"; // Updated to common Genkit dev server port

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
            errorMessageText += ` Ensure your AI backend server is running at ${API_BASE_URL} and the flow name is correct.`;
        }
        errorArea.textContent = errorMessageText;
        errorArea.style.display = 'block';
    }
    const outputArea = document.getElementById(`${toolPrefix}-output`);
    if (outputArea) {
        outputArea.textContent = ''; // Clear previous results on error
    }
}


function hideError(toolPrefix) {
    const errorArea = document.getElementById(`${toolPrefix}-error`);
    if (errorArea) {
        errorArea.textContent = '';
        errorArea.style.display = 'none';
    }
}

async function callApi(flowName, body) {
    try {
        const response = await fetch(`${API_BASE_URL}/${flowName}`, { // Endpoint is now /<flowName>
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            let errorMessage = `API Error: ${response.status} ${response.statusText}`;
            try {
                const errorData = await response.json(); // Try to parse error response
                errorMessage = errorData.error || errorData.message || errorMessage;
            } catch (e) {
                // If response is not JSON, use the text
                const textError = await response.text();
                errorMessage = textError || errorMessage;
            }
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error("API Call failed:", error);
        throw error; // Re-throw to be caught by individual tool handlers
    }
}

// --- Event Listeners ---

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
        const result = await callApi('improveWritingFlow', { text: input }); 
        displayResult(toolPrefix, result.improvedText);
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
        const result = await callApi('summarizeTextFlow', { text: input });
        displayResult(toolPrefix, result.summary);
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
        const result = await callApi('generateContentFlow', { prompt: prompt });
        displayResult(toolPrefix, result.generatedContent); 
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
        const result = await callApi('translateTextFlow', { text, targetLanguage });
        displayResult(toolPrefix, result.translatedText); 
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
        const result = await callApi('grammarCheckFlow', { text: input });
        displayResult(toolPrefix, result.correctedText); 
    } catch (error) {
        displayError(toolPrefix, error);
    } finally {
        setLoading(toolPrefix, false);
    }
});

// Initial message to guide the user about the backend server if it's the default.
const initialMessageContainer = document.querySelector('.container');
if (initialMessageContainer && API_BASE_URL === "http://localhost:3400") {
    const infoDiv = document.createElement('div');
    infoDiv.textContent = `Ensure your Genkit AI backend is running and accessible at ${API_BASE_URL}. Start it with 'npm run genkit:dev' or 'npm run genkit:watch'.`;
    infoDiv.style.backgroundColor = "#e6f7ff";
    infoDiv.style.padding = "10px";
    infoDiv.style.marginTop = "10px";
    infoDiv.style.border = "1px solid #91d5ff";
    infoDiv.style.borderRadius = "4px";
    infoDiv.style.fontSize = "13px";
    initialMessageContainer.insertBefore(infoDiv, initialMessageContainer.firstChild);
}
