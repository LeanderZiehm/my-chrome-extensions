let popupWindowId = null;

chrome.action.onClicked.addListener(() => {
  if (popupWindowId) {
    // Close if already open
    chrome.windows.remove(popupWindowId);
    popupWindowId = null;
  } else {
    // Open new popup
    chrome.windows.create(
      {
        url: "popup.html",
        type: "popup",
        width: 400,
        height: 300
      },
      (newWindow) => {
        popupWindowId = newWindow.id;
        // Reset popupWindowId when window is closed manually
        chrome.windows.onRemoved.addListener(function listener(windowId) {
          if (windowId === popupWindowId) {
            popupWindowId = null;
            chrome.windows.onRemoved.removeListener(listener);
          }
        });
      }
    );
  }
});
