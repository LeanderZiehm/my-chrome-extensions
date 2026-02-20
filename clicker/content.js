let clickTimeout = null;
let running = false;

let mouseX = 0;
let mouseY = 0;

let trackerBox = null;
let trackerLabel = null;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (trackerBox) {
    trackerBox.style.left = (mouseX - 15) + "px";
    trackerBox.style.top = (mouseY - 15) + "px";
  }

  if (trackerLabel) {
    trackerLabel.style.left = (mouseX + 20) + "px";
    trackerLabel.style.top = (mouseY - 25) + "px";
    trackerLabel.textContent = `X: ${mouseX} Y: ${mouseY}`;
  }
});

function createCursorTracker() {
  if (trackerBox) return;

  trackerBox = document.createElement("div");
  trackerBox.style.position = "fixed";
  trackerBox.style.width = "30px";
  trackerBox.style.height = "30px";
  trackerBox.style.border = "2px solid lime";
  trackerBox.style.pointerEvents = "none";
  trackerBox.style.zIndex = "999999";
  trackerBox.style.boxSizing = "border-box";

  trackerLabel = document.createElement("div");
  trackerLabel.style.position = "fixed";
  trackerLabel.style.background = "black";
  trackerLabel.style.color = "lime";
  trackerLabel.style.padding = "2px 6px";
  trackerLabel.style.fontSize = "12px";
  trackerLabel.style.fontFamily = "monospace";
  trackerLabel.style.pointerEvents = "none";
  trackerLabel.style.zIndex = "999999";

  document.body.appendChild(trackerBox);
  document.body.appendChild(trackerLabel);
}

function removeCursorTracker() {
  if (trackerBox) trackerBox.remove();
  if (trackerLabel) trackerLabel.remove();
  trackerBox = null;
  trackerLabel = null;
}

function createOverlay() {
  let overlay = document.getElementById("autoclicker-overlay");
  if (overlay) return overlay;

  overlay = document.createElement("div");
  overlay.id = "autoclicker-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "black";
  overlay.style.opacity = "0";
  overlay.style.pointerEvents = "none";
  overlay.style.zIndex = "999998";
  overlay.style.transition = "opacity 0.1s ease-in-out";
  document.body.appendChild(overlay);

  return overlay;
}

function randomize(base, deviation) {
  const dev = Math.max(0, deviation);
  return Math.max(1, base + (Math.random() * dev * 2 - dev));
}

function simulateClickAt(x, y) {
  const target = document.elementFromPoint(x, y);
  if (!target) return;

  ["mousedown", "mouseup", "click"].forEach(type => {
    target.dispatchEvent(new MouseEvent(type, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y
    }));
  });
}

function startClicking(settings) {
  if (running) return;
  running = true;

  createCursorTracker();
  const overlay = createOverlay();

  let countdown = settings.countdown || 0;

  if (countdown > 0) {
    const countdownEl = document.createElement("div");
    countdownEl.style.position = "fixed";
    countdownEl.style.top = "20px";
    countdownEl.style.right = "20px";
    countdownEl.style.background = "red";
    countdownEl.style.color = "white";
    countdownEl.style.padding = "10px";
    countdownEl.style.fontSize = "20px";
    countdownEl.style.zIndex = "999999";
    document.body.appendChild(countdownEl);

    const interval = setInterval(() => {
      if (countdown > 0) {
        countdownEl.textContent = `Starting in ${countdown}...`;
        countdown--;
      } else {
        clearInterval(interval);
        countdownEl.remove();
        runClicks(settings, overlay);
      }
    }, 1000);
  } else {
    runClicks(settings, overlay);
  }
}

function runClicks(settings, overlay) {
  function clickLoop() {
    if (!running) return;

    overlay.style.opacity = "0.8";
    setTimeout(() => overlay.style.opacity = "0", 200);

    simulateClickAt(mouseX, mouseY);

    const next = randomize(settings.interval || 1000, settings.deviation || 0);
    clickTimeout = setTimeout(clickLoop, next);
  }

  clickLoop();
}

function stopClicking() {
  running = false;
  if (clickTimeout) clearTimeout(clickTimeout);
  removeCursorTracker();
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "start") {
    chrome.storage.local.get(["interval", "deviation", "countdown"], (settings) => {
      startClicking(settings);
    });
  }

  if (msg.action === "stop") {
    stopClicking();
  }
});