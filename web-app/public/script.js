document.addEventListener('DOMContentLoaded', () => {
    const inputCode = document.getElementById('input');
    const outputCode = document.getElementById('output');
    const deobfuscateBtn = document.getElementById('deobfuscate');
    const copyBtn = document.getElementById('copy');
    const formatBtn = document.getElementById('format');
    const clearBtn = document.getElementById('clear');
    const errorDiv = document.getElementById('error');

    // Load saved code if exists and format it
    const savedCode = localStorage.getItem('lastInput');
    if (savedCode) {
        inputCode.textContent = formatCode(savedCode);
        updateHighlighting(inputCode);
    }

    // Save input code when it changes
    let saveTimeout;
    inputCode.addEventListener('input', () => {
        updateHighlighting(inputCode);
        // Debounce saving to localStorage
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            localStorage.setItem('lastInput', inputCode.textContent);
        }, 500);
    });

    // Clear localStorage when clearing the input
    clearBtn.addEventListener('click', () => {
        inputCode.textContent = '';
        outputCode.textContent = '';
        localStorage.removeItem('lastInput');
        updateHighlighting(inputCode);
        updateHighlighting(outputCode);
        showToast('Editor cleared', 'success');
    });

    // Format code using prettier
    function formatCode(code) {
        try {
            return prettier.format(code, {
                parser: "babel",
                plugins: prettierPlugins,
                semi: true,
                singleQuote: true,
                tabWidth: 4
            });
        } catch (e) {
            return code;
        }
    }

    // Update syntax highlighting
    function updateHighlighting(element) {
        Prism.highlightElement(element);
    }

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        // Add icon based on type
        let icon = '';
        switch(type) {
            case 'error':
                icon = '❌';
                break;
            case 'success':
                icon = '✓';
                break;
            default:
                icon = 'ℹ';
        }
        
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
        `;
        
        document.getElementById('toast-container').appendChild(toast);

        // Remove toast after animation
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    deobfuscateBtn.addEventListener('click', async () => {
        const code = inputCode.textContent;
        if (!code.trim()) {
            showToast('Please enter some code to deobfuscate', 'error');
            return;
        }

        try {
            deobfuscateBtn.classList.add('loading');
            deobfuscateBtn.disabled = true;

            const response = await fetch('/deobfuscate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();

            if (data.success) {
                outputCode.textContent = formatCode(data.deobfuscatedCode);
                updateHighlighting(outputCode);
                showToast('Code deobfuscated successfully!', 'success');
            } else {
                showToast(data.error, 'error');
            }
        } catch (error) {
            showToast('An error occurred while processing the code', 'error');
        } finally {
            deobfuscateBtn.classList.remove('loading');
            deobfuscateBtn.disabled = false;
        }
    });

    formatBtn.addEventListener('click', () => {
        try {
            inputCode.textContent = formatCode(inputCode.textContent);
            updateHighlighting(inputCode);
            showToast('Code formatted successfully!', 'success');
        } catch (e) {
            showToast('Failed to format code: Invalid JavaScript', 'error');
        }
    });

    copyBtn.addEventListener('click', () => {
        const textToCopy = outputCode.textContent;
        if (!textToCopy) {
            showToast('No output to copy', 'error');
            return;
        }

        navigator.clipboard.writeText(textToCopy)
            .then(() => showToast('Copied to clipboard!', 'success'))
            .catch(() => showToast('Failed to copy to clipboard', 'error'));
    });
});