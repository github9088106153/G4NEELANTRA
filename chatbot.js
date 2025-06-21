// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBljlXEq6FlJzspuEvxtlwq5YI9bxnwPYI",
  authDomain: "neelantra-3eb7d.firebaseapp.com",
  projectId: "neelantra-3eb7d",
  storageBucket: "neelantra-3eb7d.appspot.com",
  messagingSenderId: "733657494531",
  appId: "1:733657494531:web:04c2b887e7a765828b0a36",
  databaseURL: "https://neelantra-3eb7d-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

firebase.initializeApp(firebaseConfig);

// Reference to FAQ data
const dbRef = firebase.database().ref("faq");

// UI Elements
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Handle sending message
sendBtn.addEventListener("click", handleUserMessage);
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") handleUserMessage();
});

function handleUserMessage() {
  const question = userInput.value.trim();
  if (!question) return;

  displayMessage("You", question);
  userInput.value = "";

  dbRef.once("value", (snapshot) => {
    const data = snapshot.val();
    let foundAnswer = null;

    for (const key in data) {
      const faq = data[key];
      if (
        faq.question.toLowerCase().includes(question.toLowerCase()) ||
        question.toLowerCase().includes(faq.question.toLowerCase())
      ) {
        foundAnswer = faq.answer;
        break;
      }
    }

    if (foundAnswer) {
      displayMessage("Bot", foundAnswer);
    } else {
      displayMessage("Bot", "Sorry, I don't have an answer for that yet.");
    }
  });
}

// Function to display chat messages
function displayMessage(sender, message) {
  const msgDiv = document.createElement("div");
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  msgDiv.classList.add("message");
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
