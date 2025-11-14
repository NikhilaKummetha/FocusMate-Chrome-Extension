let timer;
let remainingTime = 0;

const display = document.getElementById("timerDisplay");
const startBtn = document.getElementById("startTimer");
const stopBtn = document.getElementById("stopTimer");

startBtn.addEventListener("click", () => {
  const minutes = parseInt(document.getElementById("minutes").value);
  remainingTime = minutes * 60;
  startTimer();
});

stopBtn.addEventListener("click", stopTimer);

function startTimer() {
  if (timer) clearInterval(timer);

  timer = setInterval(() => {
    const min = Math.floor(remainingTime / 60);
    const sec = remainingTime % 60;
    display.textContent = `${min}:${sec < 10 ? "0" + sec : sec}`;

    if (remainingTime <= 0) {
      clearInterval(timer);
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icons/icon128.png",
        title: "Focus Session Complete!",
        message: "Time for a short break! 🎉"
      });
    }
    remainingTime--;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  display.textContent = "Stopped.";
}
