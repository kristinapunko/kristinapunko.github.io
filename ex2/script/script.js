// Translation resources
const resources = {
    en: {
        translation: {
            "greeting": "Hello",
            "farewell": "Goodbye"
        }
    },
    uk: {
        translation: {
            "greeting": "Привіт",
            "farewell": "До побачення"
        }
    }
};

// Initialize i18next
i18next.init({
    lng: 'en', // Default language
    debug: true,
    resources
}, function (err, t) {
    if (err) return console.error(err);
    // Update the text
    updateContent();
});

// Function to update text on the page
function updateContent() {
    document.getElementById('greeting').textContent = i18next.t('greeting');
    document.getElementById('farewell').textContent = i18next.t('farewell');
}

// Language change handler
document.getElementById('language-selector').addEventListener('change', function () {
    const selectedLanguage = this.value;
    i18next.changeLanguage(selectedLanguage, function() {
        updateContent();
    });
});
