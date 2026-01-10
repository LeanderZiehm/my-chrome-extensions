const apiUrl = "https://todo-api.leanderziehm.com/texts"; // Replace with your API

const inputField = document.getElementById("inputField");
const submitBtn = document.getElementById("submitBtn");
const closeBtn = document.getElementById("closeBtn");
const statusDiv = document.getElementById("status");

// Send POST request
async function sendPost() {
  const text = inputField.value.trim();
  if (!text) return;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    const data = await response.json();
    statusDiv.textContent = "Sent successfully!";
    inputField.value = "";
    console.log(data);
  } catch (err) {
    statusDiv.textContent = "Error sending request.";
    console.error(err);
  }
}

// Click submit
submitBtn.addEventListener("click", sendPost);

// Press Enter to submit
inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendPost();
});

// Close popup
closeBtn.addEventListener("click", () => {
  window.close();
});
