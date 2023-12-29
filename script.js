updateCountdown();

function updateCountdown() {
  var days = document.querySelector('.front1');
  var hours = document.querySelector('.front2');
  var minutes = document.querySelector('.front3');
  var seconds = document.querySelector('.front4');
  var days2 = document.querySelector('.back1');
  var hours2 = document.querySelector('.back2');
  var minutes2 = document.querySelector('.back3');
  var seconds2 = document.querySelector('.back4');

  const time = getTimeRemaining();

  days.textContent = time.days + '일';
  days2.textContent = time.days + '일';
  hours.textContent = ('0' + time.hours).slice(-2) + '시간';
  hours2.textContent = ('0' + time.hours).slice(-2) + '시간';
  minutes.textContent = ('0' + time.minutes).slice(-2) + '분';
  minutes2.textContent = ('0' + time.minutes).slice(-2) + '분';
  seconds.textContent = ('0' + time.seconds).slice(-2) + '초';
  seconds2.textContent = ('0' + time.seconds).slice(-2) + '초';

  if (time.total <= 0) {
    clearInterval(interval);
  }
}

// Function to calculate time remaining until New Year
function getTimeRemaining() {
  var container = document.querySelector('.container');
  const now = new Date();
  //Fri Dec 29 2023 22:22:57 GMT+0900 (한국 표준시) typeof
  const newYear = new Date(now.getFullYear() + 1, 0, 1);
  //Mon Jan 01 2024 00:00:00 GMT+0900 (한국 표준시)
  const timeRemaining = newYear - now;
  //176933363

  const seconds = Math.floor((timeRemaining / 1000) % 60);
  const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  if ((minutes == 1 || minutes == 0) && days == 0 && hours == 0) {
    container.style = 'background-color: red !important;';
  }

  return {
    total: timeRemaining,
    days,
    hours,
    minutes,
    seconds,
  };
}

const interval = setInterval(updateCountdown, 1000);
