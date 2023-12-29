// Function to calculate time remaining until New Year
function getTimeRemaining() {
  const now = new Date();
  const newYear = new Date(now.getFullYear() + 1, 0, 1);
  const timeRemaining = newYear - now;

  const seconds = Math.floor((timeRemaining / 1000) % 60);
  const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  return {
    total: timeRemaining,
    days,
    hours,
    minutes,
    seconds,
  };
}

// Function to update the countdown display
function updateCountdown() {
  const timer = document.getElementById('timer');
  const daysSpan = document.getElementById('days');
  const hoursSpan = document.getElementById('hours');
  const minutesSpan = document.getElementById('minutes');
  const secondsSpan = document.getElementById('seconds');

  const time = getTimeRemaining();

  daysSpan.textContent = time.days + 'd';
  hoursSpan.textContent = ('0' + time.hours).slice(-2) + 'h';
  minutesSpan.textContent = ('0' + time.minutes).slice(-2) + 'm';
  secondsSpan.textContent = ('0' + time.seconds).slice(-2) + 's';

  if (time.total <= 0) {
    clearInterval(interval);
  }
}

// Initial call to update countdown
updateCountdown();

// Update the countdown every second
const interval = setInterval(updateCountdown, 1000);
