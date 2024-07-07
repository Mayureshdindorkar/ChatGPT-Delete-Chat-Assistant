
// return new checkbox
function createCheckbox(index) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = CHECKBOX_CLASS;
    checkbox.dataset.index = index;
    checkbox.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    return checkbox;
}

// Function to select checkboxes of all conversations
function selectAllConversations() {
    document.querySelectorAll(Selectors.CONVERSATION_SELECTOR).forEach((conversation, index) => {
        let checkbox = conversation.querySelector(`.${CHECKBOX_CLASS}`);
        if (!checkbox) {    // If the checkbox does not exist, create and insert it
            checkbox = createCheckbox(index);
            conversation.insertAdjacentElement('afterbegin', checkbox);
        }
        if (!checkbox.checked) checkbox.checked = true; // Check the checkbox if it is not already checked
    });
}

console.log('selectAllConversations.js file invoked');
selectAllConversations();
