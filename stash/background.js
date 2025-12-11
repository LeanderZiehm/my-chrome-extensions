chrome.action.onClicked.addListener(async (tab) => {

  if (!tab || !tab.url) {
    console.error("No active tab found.");
    return;
  }

  const apiUrl = `https://api.tracker.leanderziehm.com/texts`;

  // Set badge to "..."
  chrome.action.setBadgeText({ text: "..." });
  chrome.action.setBadgeBackgroundColor({ color: "#999" });

  // Switch to loading icon
  chrome.action.setIcon({ path: "icons/loading.png" });

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "text": "stash(read-later):" + tab.url })
    });

    const text = await response.text();
    console.log("API response:", text);

    // Badge feedback
    chrome.action.setBadgeText({ text: "✔" });
    chrome.action.setBadgeBackgroundColor({ color: "#28a745" });

    // Change icon to success
    chrome.action.setIcon({ path: "icons/success.png" });

    // Notify content script to show success popup + sound
    chrome.tabs.sendMessage(tab.id, {
      type: "SUCCESS",
      message: "URL saved!"
    });

    // Reset after 2 seconds
    setTimeout(() => {
      chrome.action.setBadgeText({ text: "" });
      chrome.action.setIcon({ path: "icons/default.png" });
    }, 2000);

  } catch (error) {
    console.error("Error sending URL:", error);

    // Badge feedback
    chrome.action.setBadgeText({ text: "!" });
    chrome.action.setBadgeBackgroundColor({ color: "#d9534f" });

    // Error icon
    chrome.action.setIcon({ path: "icons/error.png" });

    // Notify content script to show failure popup
    chrome.tabs.sendMessage(tab.id, {
      type: "ERROR",
      message: "Failed to send URL"
    });

    setTimeout(() => {
      chrome.action.setBadgeText({ text: "" });
      chrome.action.setIcon({ path: "icons/default.png" });
    }, 3000);
  }
});
