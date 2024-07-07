
if (typeof window.globalsLoaded !== 'undefined') {
    console.log('sharedConstants.js file is already loaded.');
} else {
    // Initializing the variables
    window.globalsLoaded = true;
    window.lastChecked = null;
    window.Selectors = {
        conversationsCheckbox: '.conversation-checkbox:checked',
        confirmDeleteButton: 'button.btn.btn-danger',
        threeDotButton: '[id^="radix-"]',
        CONVERSATION_SELECTOR: 'div > div > div > div > div > div > nav > div > div > div > div > ol > li > div > a',
        TITLE_SELECTOR: '.relative.grow.overflow-hidden.whitespace-nowrap',
    };
    window.CHECKBOX_CLASS = 'conversation-checkbox';
}
