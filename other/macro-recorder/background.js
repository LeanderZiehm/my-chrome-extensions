// Map shortcut keys to slot values
const SHORTCUT_KEYS = {
  "run-slot-1": "1",
  "run-slot-2": "2"
};

chrome.commands.onCommand.addListener(async (command) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.url) return;

  const origin = new URL(tab.url).origin;

  chrome.storage.local.get(origin, (data) => {
    const macros = data[origin] || [];
    const slotValue = SHORTCUT_KEYS[command];

    const macro = macros.find((m) => m.shortcut === slotValue);
    if (!macro) return;

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });

    chrome.tabs.sendMessage(tab.id, {
      type: "PLAY_MACRO",
      clicks: macro.clicks
    });
  });
});
