const mainNav = document.querySelector('.main-nav');

if (mainNav) {
  const menuToggle = mainNav.querySelector('button');
  const menuLinks = mainNav.querySelectorAll('a');

  mainNav.classList.remove('main-nav--nojs');

  menuToggle.addEventListener('click', () => {
    if (mainNav.classList.contains('main-nav--closed')) {
      mainNav.classList.remove('main-nav--closed');
      mainNav.classList.add('main-nav--opened');
    } else {
      mainNav.classList.add('main-nav--closed');
      mainNav.classList.remove('main-nav--opened');
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.add('main-nav--closed');
      mainNav.classList.remove('main-nav--opened');
    });
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      const id = link.getAttribute('href');
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
}

// ВАЛИДАЦИЯ ПОЛЯ С ТЕЛЕФОНОМ

const inputTel = document.querySelector('input[type="tel"]');

if (inputTel) {
  const onKeypress = (evt) => {
    if (evt.keyCode < 48 || evt.keyCode > 57) {
      evt.preventDefault();
    }
  };

  const onFocus = () => {
    if (inputTel.value.length === 0) {
      inputTel.value = '+7';
      inputTel.selectionStart = inputTel.value.length;
    }
  };

  const onClick = () => {
    if (inputTel.selectionStart < 2) {
      inputTel.selectionStart = inputTel.value.length;
    }
  };

  const onBlur = () => {
    if (inputTel.value === '+7') {
      inputTel.value = '';
    }
  };

  const onKeydown = (evt) => {
    if (evt.key === 'Backspace' && inputTel.value.length <= 2) {
      evt.preventDefault();
    }
  };

  inputTel.addEventListener('keypress', onKeypress);
  inputTel.addEventListener('focus', onFocus);
  inputTel.addEventListener('click', onClick);
  inputTel.addEventListener('blur', onBlur);
  inputTel.addEventListener('keydown', onKeydown);
}

// ЧАСЫ

const updateTime = () => {
  const hourEL = document.querySelector('#hour');
  const minuteEL = document.querySelector('#minute');
  const secondEL = document.querySelector('#second');

  const d = new Date();

  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let date = d.getDate();
  let month = d.getMonth();
  let year = d.getFullYear();

  if (hours >= 0 && hours <= 9) { hours = `0${hours}`; }
  if (minutes >= 0 && minutes <= 9) { minutes = `0${minutes}`; }
  if (seconds >= 0 && seconds <= 9) { seconds = `0${seconds}`; }
  if (date >= 0 && date <= 9) { date = `0${date}`; }
  if (month >= 0 && month <= 9) { month = `0${month}`; }
  if (year >= 0 && year <= 9) { year = `0${year}`; }

  hourEL.innerText = hours;
  minuteEL.innerText = minutes;
  secondEL.innerText = seconds;

  const dateEl = document.querySelector('#date');
  dateEl.innerText = `${date}.${month}.${year}`;

  const dayEl = document.querySelector('#day');
  const daynumber = d.getDay();
  let day = '';

  switch (daynumber) {
    case 0: day = 'воскресенье'; break;
    case 1: day = 'понедельник'; break;
    case 2: day = 'вторник'; break;
    case 3: day = 'среда'; break;
    case 4: day = 'четверг'; break;
    case 5: day = 'пятница'; break;
    case 6: day = 'суббота'; break;
  }

  dayEl.innerText = day;
};

window.addEventListener('load', () => {
  updateTime();
  setInterval(updateTime, 1000);
});
