
// -------------- Utility functions ----------------- //

// returns the checked conversations
function getSelectedConversations () { return [...document.querySelectorAll(Selectors.conversationsCheckbox)] };

// deletes the checkboxes from all conversations
function deleteCheckboxesFromAllConversations () {
  document.querySelectorAll(`.${CHECKBOX_CLASS}`).forEach(checkbox => checkbox.remove());
}

// The resolve parameter is a function that is called when timeout occurs.
function wait(milisec) {
  return new Promise(resolve => setTimeout(resolve, milisec));
}

// selects the 'Delete' option from three dot dropdown
async function waitForDeleteButton (parent = document, timeout = 2000) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    const elements = parent.querySelectorAll('div[role="menuitem"]');
    for (const element of elements) {
      const doesDeleteButtonExists = element.textContent.trim() === 'Delete' || element.querySelector('.text-token-text-error'); // // el.querySelector('.text-token-text-error') == dustbin icon in dropdown menu.
      if (doesDeleteButtonExists) return element;
    }
    await wait(100);
  }
  return null;
};

async function deleteConversation (checkbox) {
  await wait(100);
  const conversationElement = checkbox.parentElement;

  // Hower the mouse on the conversation
  conversationElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, cancelable: true }));
  await wait(200); // Wait for the three dots to appear
  const threeDotButton = await waitForElement(Selectors.threeDotButton, conversationElement.parentElement);
  // Creates a pointerdown event (pointerDownEvent) to simulate a mouse click and Click on the three dots button
  threeDotButton.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, pointerType: 'mouse' }));
  await wait(300); // Wait for the dropdown of three dots to appear

  // Click on the 'Delete' option from the dropdown
  const deleteButton = await waitForDeleteButton();
  if (deleteButton) {
    deleteButton.click();

    // wait for confirmation dialog & select the 'Delete' button from it
    const confirmButton = await waitForElement(Selectors.confirmDeleteButton);
    if (confirmButton) {
      confirmButton.click();
      // Wait for the confirmation dialog to disappear
      await waitForElementToDisappear(Selectors.confirmDeleteButton);
    }
  }
};

// selects the specified element from the dom, using specified selecter.
async function waitForElement (selector, parent = document, timeoutTime = 2000) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeoutTime) {
    const element = parent.querySelector(selector);
    if (element) return element;
    await wait(100);
  }
  throw new Error(`Could not find '${selector}' within ${timeoutTime} miliseconds`);
};

// if the element dont disappear in specified time, the it gives error.
async function waitForElementToDisappear (selector, timeoutTime = 2000) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeoutTime) {
    if (!document.querySelector(selector)) return; // Element has disappeared
    await wait(100);
  }
  throw new Error(`Could not find '${selector}' within ${timeoutTime} miliseconds`);
};
// ------------------------------------------------- //

async function deleteSelections () {
  const selectedConversations = getSelectedConversations();
  let n = selectedConversations.length;
  if (n === 0) {
    deleteCheckboxesFromAllConversations(); return;   // No conversation is selected for deletion
  }
  for (let i = 0; i < n; i++) {
    await deleteConversation(selectedConversations[i]);
  }
}

console.log('deleteSelections.js file invoked');
deleteSelections();
