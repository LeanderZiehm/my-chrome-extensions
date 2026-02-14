const apiUrl = "https://todo-api.leanderziehm.com/texts";
const inputField = document.getElementById("inputField");
const submitBtn = document.getElementById("submitBtn");
const messagesDiv = document.getElementById("messages");

async function sendPost(messageEl, text) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) throw new Error("Failed");

    const data = await response.json();
    messageEl.classList.remove("pending");
    messageEl.classList.add("success");
    messageEl.querySelector(".text").textContent = text;
    const retryBtn = messageEl.querySelector(".retry-btn");
    if (retryBtn) retryBtn.remove();
    console.log("Success:", data);
  } catch (err) {
    console.error("Error:", err);
    let retryBtn = messageEl.querySelector(".retry-btn");
    if (!retryBtn) {
      retryBtn = document.createElement("button");
      retryBtn.textContent = "Retry";
      retryBtn.className = "retry-btn";
      retryBtn.onclick = () => {
        messageEl.classList.add("pending");
        retryBtn.remove();
        sendPost(messageEl, text);
      };
      messageEl.appendChild(retryBtn);
    }
  }
}

function addMessage(text) {
  const messageEl = document.createElement("div");
  messageEl.className = "message pending";
  const textEl = document.createElement("span");
  textEl.className = "text";
  textEl.textContent = text;
  messageEl.appendChild(textEl);
  messagesDiv.appendChild(messageEl);
  sendPost(messageEl, text);
}

function handleSend() {
  const text = inputField.value.trim();
  if (!text) return;
  inputField.value = ""; // clear instantly
  addMessage(text);
}

submitBtn.addEventListener("click", handleSend);
inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSend();
});

// Auto-focus input when popup opens
document.addEventListener("DOMContentLoaded", () => {
  inputField.focus();
});