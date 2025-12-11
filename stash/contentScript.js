chrome.runtime.onMessage.addListener((msg) => {
  if (!msg || !msg.type) return;

  // Create popup
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.right = "20px";
  popup.style.zIndex = "999999";
  popup.style.padding = "12px 18px";
  popup.style.borderRadius = "6px";
  popup.style.fontSize = "14px";
  popup.style.fontFamily = "Arial, sans-serif";
  popup.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
  popup.style.color = "white";

  if (msg.type === "SUCCESS") {
    popup.style.background = "#28a745";
    popup.textContent = msg.message;

    // Play success sound
    // new Audio(chrome.runtime.getURL("sounds/success.mp3")).play();
  }

  if (msg.type === "ERROR") {
    popup.style.background = "#d9534f";
    popup.textContent = msg.message;

    // new Audio(chrome.runtime.getURL("sounds/error.mp3")).play();
  }

  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 2500);
});
