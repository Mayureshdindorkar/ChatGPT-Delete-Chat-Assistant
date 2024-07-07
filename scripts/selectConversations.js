

// -------------- Utility functions ----------------- //

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

// Toggle the checkbox's checked state
function toggleCheckbox(e) {
    e.preventDefault();
    e.stopPropagation();

    // Function to find ancestor element with the checkbox class
    const findAncestorWithCheckbox = (element, selector) => {
        let ancestor = element.parentElement;
        while (ancestor && !ancestor.querySelector(selector)) {
            ancestor = ancestor.parentElement;
        }
        return ancestor;
    };

    // Find parent element with checkbox class
    const parentElement = findAncestorWithCheckbox(e.currentTarget, `.${CHECKBOX_CLASS}`);
    // Toggle checkbox if found
    if (parentElement) {
        const checkbox = parentElement.querySelector(`.${CHECKBOX_CLASS}`);
        if (checkbox) {
            checkbox.checked = !checkbox.checked;
        }
    }
}

// Add click event listener to an element
function addClickEventListener(element) {
    element.addEventListener('click', (e) => {
        toggleCheckbox(e);
        e.stopPropagation();
    });
    element.dataset.hasClickListener = 'true';
}
// ------------------------------------------------- //

function selectConversations() {
    document.querySelectorAll(Selectors.CONVERSATION_SELECTOR).forEach((conversation, index) => {
        let checkbox = conversation.querySelector(`.${CHECKBOX_CLASS}`);
        if (!checkbox) {                                                // if the conversation dont have check box
            checkbox = createCheckbox(index);
            conversation.insertAdjacentElement('afterbegin', checkbox); // inserting the checkbox at start of conversation
        }

        // making conversation title text clickable
        const titleElement = conversation.querySelector(Selectors.TITLE_SELECTOR);
        if (titleElement) {
            titleElement.style.cursor = 'default';

            if (!titleElement.dataset.hasClickListener) {
                addClickEventListener(titleElement);
            }

            // making parent also clickable
            const parentElement = titleElement.parentElement;
            if (parentElement && !parentElement.dataset.hasClickListener) {
                parentElement.style.cursor = 'default';
                addClickEventListener(parentElement);
            }
        }
    });
}

console.log('selectConversations.js file invoked');
selectConversations();
