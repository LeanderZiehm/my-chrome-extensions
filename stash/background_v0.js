chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || !tab.url) {
    console.error("No active tab found.");
    return;
  }
    const apiUrl = `https://api.tracker.leanderziehm.com/texts`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "accept": "application/json",
	"Content-Type": "application/json"
      },
	body: JSON.stringify({"text": "stash(read-later):"+tab.url})
    });

    console.log("API response:", await response.text());
  } catch (error) {
    console.error("Error sending URL:", error);
  }
});
