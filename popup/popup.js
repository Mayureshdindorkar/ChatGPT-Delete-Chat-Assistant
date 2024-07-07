
const execute_script = (tabId, scriptToBeExecuted) => {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['scripts/sharedConstants.js']
  },
    () => {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [scriptToBeExecuted]
      });
    }
  );
}

const addButtonEventHandler = (buttonId, scriptPath) => {
  let button = document.getElementById(buttonId);
  button.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab) {
        execute_script(tab.id, scriptPath);
      }
    });
  });
}

const mapButtonsWithScripts = () => {
  addButtonEventHandler('select-conversations', 'scripts/selectConversations.js');
  addButtonEventHandler('deselect-conversations', 'scripts/deselectConversations.js');
  addButtonEventHandler('delete-selections', 'scripts/deleteSelections.js');
  addButtonEventHandler('select-all-conversations', 'scripts/selectAllConversations.js');
}

console.log('popup.js file called')
mapButtonsWithScripts();
