let isRecording = false;
let clicks = [];
let startTime = 0;
let overlay = null;

// Generate a simple selector
function getSelector(el) {
  if (el.id) return `#${el.id}`;
  return el.tagName.toLowerCase();
}

// Inject overlay for user feedback
function createOverlay() {
  overlay = document.createElement("div");
  overlay.id = "click-macro-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "10px";
  overlay.style.right = "10px";
  overlay.style.padding = "10px 15px";
  overlay.style.backgroundColor = "rgba(255,0,0,0.8)";
  overlay.style.color = "white";
  overlay.style.fontWeight = "bold";
  overlay.style.zIndex = 999999;
  overlay.style.borderRadius = "5px";
  overlay.style.cursor = "pointer";
  overlay.style.whiteSpace = "pre";
  overlay.style.textAlign = "center";
  overlay.style.animation = "blink 1s step-start infinite";
  overlay.innerText = "RECORDING CLICKS\n[Click to Stop]";
  document.body.appendChild(overlay);

  overlay.onclick = stopRecording;

  // Add blinking animation
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0.2; }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

// Start recording
function startRecording() {
  if (isRecording) return;
  isRecording = true;
  clicks = [];
  startTime = Date.now();
  createOverlay();
}

function saveClicks() {
  const origin = window.location.origin;

  chrome.storage.local.get(origin, (data) => {
    const siteMacros = data[origin] || [];
    siteMacros.push({
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      clicks
    });
    chrome.storage.local.set({ [origin]: siteMacros }, () => {
      console.log("Recorded clicks saved:", clicks);
    });
  });
}

// Stop recording
function stopRecording() {
  isRecording = false;
  if (overlay) overlay.remove();
  overlay = null;

  saveClicks();
}


// // Capture clicks
// document.addEventListener(
//   "click",
//   (e) => {
//     if (!isRecording) return;
//     clicks.push({
//       selector: getSelector(e.target),
//       time: Date.now() - startTime
//     });
//   },
//   true
// );

// Listen for messages
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "START_RECORDING") {
    startRecording();
  }
});



// Capture clicks
document.addEventListener(
  "click",
  (e) => {
    if (!isRecording) return;

    const clickData = {
      selector: getSelector(e.target),
      time: Date.now() - startTime
    };
    clicks.push(clickData);

    // Create a circle at the click position
    const circle = document.createElement("div");
    circle.style.position = "absolute";
    circle.style.left = `${e.pageX - 5}px`;
    circle.style.top = `${e.pageY - 5}px`;
    circle.style.width = "10px";
    circle.style.height = "10px";
    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = "rgba(0, 255, 0, 0.7)";
    circle.style.zIndex = 999999;
    circle.style.pointerEvents = "none";
    document.body.appendChild(circle);

    // Fade out circle
    setTimeout(() => circle.remove(), 1000);
  },
  true
);
