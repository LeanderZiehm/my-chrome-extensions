const intervalInput = document.getElementById("interval");
const deviationInput = document.getElementById("deviation");
const countdownInput = document.getElementById("countdown");

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["interval", "deviation", "countdown"], (data) => {
    intervalInput.value = data.interval || 1000;
    deviationInput.value = data.deviation || 100;
    countdownInput.value = data.countdown || 3;
  });
});

document.getElementById("save").addEventListener("click", () => {
  chrome.storage.local.set({
    interval: parseInt(intervalInput.value),
    deviation: parseInt(deviationInput.value),
    countdown: parseInt(countdownInput.value)
  });
});

document.getElementById("start").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "start" });
  });
});

document.getElementById("stop").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "stop" });
  });
});