// Your script here.
// Select elements
const input = document.getElementById('userInput');
const button = document.querySelector('button');
const countDownDisplay = document.getElementById('countDown');
const endTimeDisplay = document.getElementById('endTime');

let countdownInterval;

function startCountdown(minutes) {
  // Clear any running timer
  clearInterval(countdownInterval);

  const now = Date.now();
  const endTime = now + minutes * 60 * 1000;

  displayEndTime(endTime);
  updateCountdown(endTime); // Display immediately

  // Update every second
  countdownInterval = setInterval(() => {
    updateCountdown(endTime);
  }, 1000);
}

function updateCountdown(endTime) {
  const secondsLeft = Math.round((endTime - Date.now()) / 1000);

  if (secondsLeft <= 0) {
    clearInterval(countdownInterval);
    countDownDisplay.textContent = 'Time\'s up!';
    return;
  }

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  countDownDisplay.textContent = `Time Remaining: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  let hours = end.getHours();
  let minutes = end.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // Convert to 12-hour format

  endTimeDisplay.textContent = `Be back at: ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
}

// Button click to start
button.addEventListener('click', () => {
  const minutes = parseInt(input.value);
  if (!minutes || minutes <= 0) return;
  startCountdown(minutes);
});
