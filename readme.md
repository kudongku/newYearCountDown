# 2024년 새해까지 얼마나 남았는지 알려주는 카운트다운입니다.

> > 모바일 환경에서 세팅은 안되어있습니다. 세로로 보지말고, 가로로 봐주세요.

## html

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>새해 카운트다운</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="container">
      <div class="countdown">
        <h1 class="title">2024까지</h1>
        <div id="timer">
          <div class="flip_btn1">
            <div class="front1"></div>
            <div class="back1">days</div>
          </div>
          <div class="flip_btn2">
            <div class="front2">hours</div>
            <div class="back2">hours</div>
          </div>
          <div class="flip_btn3">
            <div class="front3">minutes</div>
            <div class="back3">minutes</div>
          </div>
          <div class="flip_btn4">
            <div class="front4">seconds</div>
            <div class="back4">seconds</div>
          </div>
        </div>
        <h2 class="title2">남았어요</h2>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

아주 단순한 구조로 body 대신 container을 사용했다.
그 안에 countdown div가 있고,
그 안에

1. 2024까지
2. 남은 시간
3. 남았어요
   가 병렬적으로 있다.
   남은 시간은 front와 back이 있는데, 이는 hover시에 flip되는 효과를 주기 위함이다.

## CSS

```
@import url('https://fonts.googleapis.com/css2?family=Bagel+Fat+One&display=swap');
* {
  /*기본적으로 먹이는 설정*/
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  /* 넓이는 %로, 높이는 vh로 써야 먹힘 */
  width: 100%;
  height: 100vh;
  background-color: black;
}
.countdown {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  /* 3d효과 */
  perspective: 1000px;
}
.countdown > h1 {
  font-family: 'Bagel Fat One';
  font-size: 100px; /* 기본 글자 크기 */
}
h2 {
  font-family: 'Bagel Fat One';
  font-size: 100px; /* 기본 글자 크기 */
  font-weight: lighter;
}
```

이것들은 항상 내가 주는 설정들,
다른 요소들을 작성하기 편하다.

```
div[class*='flip_btn'] {
  width: 150px;
  height: 100px;
  color: white;
  text-align: center;
  line-height: 100px;
  transform-style: preserve-3d;
  transition: 0.5s;
  cursor: pointer;
  flex: 1 0 auto; /* 유연한 너비를 가짐 */
  margin: 5px; /* 요소들 사이의 간격 설정 */
}
div[class*='flip_btn']:hover {
  transform: rotateX(-90deg);
}
div[class*='front'] {
  background-color: rgb(74, 74, 74);
  height: 100px;
  transform: translateZ(50px);
}
div[class*='back'] {
  background-color: rgb(90, 90, 90);
  height: 100px;
  transform: rotateX(90deg) translateZ(150px);
}
#timer {
  margin-top: 20px;
  font-size: 30px;
  display: flex;
  justify-content: space-around; /* 요소들을 동일한 간격으로 배치합니다. */
  align-items: center; /* 요소들을 수직으로 가운데 정렬합니다. */
}

```

이 설정들은 3d 효과를 주기위한 설정들이다.
3D 효과 설정을 이해하려면 엄청난 공간지각능력을 이용해야된다.
나는 학교지각능력이 있다.

## JS

```
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
```

일차적으로 getTimeRemaining함수는 현재시각을 새해시각에 빼서 남은 시간을 구해주는 함수이다.
그 구한 시간 객체는 updateCountdown로 넘어가는데,
이 함수는 div박스를 인식해서 거기에 text를 넣어준다.
이 함수를 clearInterval(interval)을 통해 1초마다 업데이트를 해준다.
