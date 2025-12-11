chrome.commands.onCommand.addListener((command) => {
  if (command === "open_new_tab") {
    chrome.tabs.create({ url: 'chrome://newtab' });
  }
});

// let lastNewTabId = null;

// chrome.tabs.onCreated.addListener((tab) => {

//   console.log("New tab created",tab.pendingUrl ,tab.pendingUrl)
//   // Check if the newly created tab is the custom new tab page
//   // if (tab.pendingUrl && tab.pendingUrl.includes("chrome-extension://")) {
//   if (tab.pendingUrl && tab.pendingUrl=='chrome://newtab/') {
//     // Close the previous new tab if it exists
//     if (lastNewTabId !== null) {
//       chrome.tabs.remove(lastNewTabId);
//     }
//     // Set the lastNewTabId to the current new tab's ID
//     lastNewTabId = tab.id;
//   }
// });

// chrome.tabs.onRemoved.addListener((tabId) => {
//     console.log("removed tab")
//   // Reset lastNewTabId if the tab is closed
//   if (tabId === lastNewTabId) {
//     lastNewTabId = null;
//   }
// });
  

// chrome.action.onClicked.addListener(function() {
//     chrome.downloads.showDefaultFolder();
// });
