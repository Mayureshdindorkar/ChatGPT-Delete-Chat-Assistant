
function deselectConversationsAndReload () {
  document.querySelectorAll(`.${CHECKBOX_CLASS}`).forEach(checkbox => checkbox.remove());
};

console.log('deselectConversations.js file invoked');
deselectConversationsAndReload();
