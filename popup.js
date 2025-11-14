// ---- Motivational Quotes ----
const quotes = [
  "Believe you can and you're halfway there.",
  "Don’t watch the clock; do what it does. Keep going.",
  "The secret of getting ahead is getting started.",
  "Push yourself, because no one else is going to do it for you.",
  "It always seems impossible until it’s done."
];

document.getElementById("quote").innerText =
  quotes[Math.floor(Math.random() * quotes.length)];

// ---- To-Do List Logic ----
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Load tasks when popup opens
chrome.storage.sync.get(["tasks"], (data) => {
  const tasks = data.tasks || [];
  tasks.forEach(addTaskToDOM);
});

addTaskBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (!task) return;

  addTaskToDOM(task);
  saveTask(task);
  taskInput.value = "";
});

function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.textContent = task;

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.style.marginLeft = "10px";
  delBtn.onclick = () => removeTask(task, li);

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTask(task) {
  chrome.storage.sync.get(["tasks"], (data) => {
    const tasks = data.tasks || [];
    tasks.push(task);
    chrome.storage.sync.set({ tasks });
  });
}

function removeTask(task, li) {
  li.remove();
  chrome.storage.sync.get(["tasks"], (data) => {
    const tasks = data.tasks.filter((t) => t !== task);
    chrome.storage.sync.set({ tasks });
  });
}

// ---- Focus Timer Section (Persistent Countdown) ----
let countdownInterval;

function updateCountdown(seconds) {
  clearInterval(countdownInterval);
  updateDisplay(seconds);

  countdownInterval = setInterval(() => {
    seconds--;
    updateDisplay(seconds);
    if (seconds <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("focusStatus").textContent = "Focus Complete! 🎯";
    }
  }, 1000);
}

function updateDisplay(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  document.getElementById("timerDisplay").textContent =
    `Time Left: ${min}:${sec < 10 ? "0" + sec : sec}`;
}

// Start focus
document.getElementById("startFocus").addEventListener("click", () => {
  const minutes = parseInt(document.getElementById("focusMinutes").value);
  if (isNaN(minutes) || minutes <= 0) {
    document.getElementById("focusStatus").textContent = "Enter valid minutes!";
    return;
  }

  chrome.runtime.sendMessage({ action: "startFocus", minutes: minutes }, (response) => {
    document.getElementById("focusStatus").textContent = response.status;
    updateCountdown(minutes * 60);
  });
});

// Stop focus
document.getElementById("stopFocus").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "stopFocus" }, (response) => {
    document.getElementById("focusStatus").textContent = response.status;
    clearInterval(countdownInterval);
    document.getElementById("timerDisplay").textContent = "Time Left: --:--";
  });
});

// When popup opens, check if a session is active
document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ action: "getStatus" }, (response) => {
    if (response.active && response.remaining > 0) {
      document.getElementById("focusStatus").textContent = "Focus in progress ⏱";
      updateCountdown(response.remaining);
    } else {
      document.getElementById("focusStatus").textContent = "No focus session active.";
    }
  });
});
