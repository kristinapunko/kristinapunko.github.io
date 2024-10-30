document.addEventListener('DOMContentLoaded', () => {
    let translations = {};

    // Function to load the translation file
    async function loadLanguage(lang) {
        try {
            // If you use VS Code's LiveServer, you can make a local request:
            //const response = await fetch(`/locales/${lang}.json`);

            // If you don’t use LiveServer, upload your "locales" directory to GitHub
            // and organize the request for GitHub Pages:
            const response = await fetch(`https://kristinapunko.github.io/pr7/locales/${lang}.json`);

            translations = await response.json();
            updateText();
        } catch (error) {
            console.error('Error loading translation:', error);
        }
    }

    // Function to update the text on the page
    function updateText() {
        document.getElementById('greeting').textContent = translations['greeting'] || 'greeting';
        document.getElementById('farewell').textContent = translations['farewell'] || 'farewell';
    }

    // Language change handler
    document.getElementById('language-selector').addEventListener('change', function () {
        const selectedLanguage = this.value;
        loadLanguage(selectedLanguage);
    });

    // Load the default language
    loadLanguage("en");
});
