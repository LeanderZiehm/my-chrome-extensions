let tab;
let origin;

const SHORTCUT_OPTIONS = [
  { value: "", label: "No shortcut" },
  { value: "1", label: "Ctrl+Shift+1" },
  { value: "2", label: "Ctrl+Shift+2" }
];

async function init() {
  [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  origin = new URL(tab.url).origin;

  document.getElementById("start").onclick = startRecording;

  renderMacros();
}

// Start recording by sending message to content script
async function startRecording() {
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });

  chrome.tabs.sendMessage(tab.id, { type: "START_RECORDING" }, () => {
    console.log("Recording started");
  });
}

// Render macros
function renderMacros() {
  chrome.storage.local.get(origin, (data) => {
    const macros = data[origin] || [];
    const container = document.getElementById("macros");
    container.innerHTML = "<h4>Saved Macros</h4>";

    macros.forEach((macro) => {
      const div = document.createElement("div");
      div.className = "macro";

      const nameSpan = document.createElement("span");
      nameSpan.className = "macro-name";
      nameSpan.textContent = `Recorded at ${new Date(macro.timestamp).toLocaleTimeString()} (${macro.clicks.length} clicks)`;

      // Play button
      const playBtn = document.createElement("button");
      playBtn.textContent = "Play";
      playBtn.onclick = () => playMacro(macro);

      // Shortcut select
      const select = document.createElement("select");
      SHORTCUT_OPTIONS.forEach((opt) => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.text = opt.label;
        if (macro.shortcut === opt.value) option.selected = true;
        select.appendChild(option);
      });
      select.onchange = () => assignShortcut(macro.id, select.value);

      div.appendChild(nameSpan);
      div.appendChild(playBtn);
      div.appendChild(select);

      container.appendChild(div);
    });
  });
}

// Play macro in the page
async function playMacro(macro) {
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });

  chrome.tabs.sendMessage(tab.id, {
    type: "PLAY_MACRO",
    clicks: macro.clicks
  });
}

// Assign shortcut
function assignShortcut(macroId, value) {
  chrome.storage.local.get(origin, (data) => {
    const macros = data[origin] || [];
    const macro = macros.find((m) => m.id === macroId);
    if (!macro) return;
    macro.shortcut = value;
    chrome.storage.local.set({ [origin]: macros });
  });
}

document.addEventListener("DOMContentLoaded", init);
