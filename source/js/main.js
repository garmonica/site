const mainNav = document.querySelector('.main-nav');

if (mainNav) {
  const menuToggle = mainNav.querySelector('button');
  const menuLinks = mainNav.querySelectorAll('a');
  const body = document.querySelector('body');

  mainNav.classList.remove('main-nav--nojs');

  const openMenu = () => {
    mainNav.classList.remove('main-nav--closed');
    mainNav.classList.add('main-nav--opened');
    body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mainNav.classList.add('main-nav--closed');
    mainNav.classList.remove('main-nav--opened');
    body.style.overflow = 'auto';
  };

  menuToggle.addEventListener('click', () => {
    if (mainNav.classList.contains('main-nav--closed')) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      closeMenu();
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
  let month = d.getMonth() + 1;
  const year = d.getFullYear();

  if (hours >= 0 && hours <= 9) { hours = `0${hours}`; }
  if (minutes >= 0 && minutes <= 9) { minutes = `0${minutes}`; }
  if (seconds >= 0 && seconds <= 9) { seconds = `0${seconds}`; }
  if (date >= 0 && date <= 9) { date = `0${date}`; }
  if (month >= 0 && month <= 9) { month = `0${month}`; }

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

// отправка на почту

const sendForm = () => {
  const regForm = document.querySelectorAll('.order__form');

  if (!regForm) {
    return;
  }

  regForm.forEach((element) => {
    element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const name = element.querySelector('input[type="text"]').value;
      const tel = element.querySelector('input[type="tel"]').value;

      const xhr = new XMLHttpRequest();
      //name и tel - переменные, которые объявляются в php
      const body = `&name=${name} &tel=${tel}`;

      xhr.open('POST', 'php/sendmail.php', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(body);

      setTimeout(() => {
        element.reset();
      }, 100);

    });
  });
};

sendForm();

// SLIDER BEGINNING ---------------------------------

const btnPrev = document.querySelector('.slider__prev');
const btnNext = document.querySelector('.slider__next');
const circleButtonsBlock = document.querySelector('.slider__circle-buttons');

const images = document.querySelectorAll('.slider__photo');

const pause = document.querySelector('.slider__auto-button--pause');
const play = document.querySelector('.slider__auto-button--play');

let isPaused = false;
let currentIndex = 0;

let isStorageSupport = true;
let storageIsPaused = '';
let storageCurrentIndex = '';

try {
  storageIsPaused = localStorage.getItem('paused');
  storageCurrentIndex = localStorage.getItem('index');
} catch (err) {
  isStorageSupport = false;
}

if (storageIsPaused || storageCurrentIndex) {
  isPaused = storageIsPaused === 'true';
  currentIndex = Number(storageCurrentIndex);
}

const writeInLocalStoragePaused = () => {
  if (isStorageSupport) {
    localStorage.setItem('paused', isPaused);
  }
};

const writeInLocalStorageIndex = () => {
  if (isStorageSupport) {
    localStorage.setItem('index', currentIndex);
  }
};

const circleButtons = [];
for (let i = 1; i <= images.length; i++) {
  const circleButton = document.createElement('button');
  circleButtonsBlock.appendChild(circleButton);
  circleButtons.push(circleButton);
}

images[currentIndex].classList.add('slider__photo-active');
circleButtons[currentIndex].classList.add('active');

const onNext = () => {
  images[currentIndex].classList.remove('slider__photo-active');
  circleButtons[currentIndex].classList.remove('active');
  currentIndex++;
  writeInLocalStorageIndex();
  if (currentIndex >= images.length) {
    currentIndex = 0;
    writeInLocalStorageIndex();
  }
  images[currentIndex].classList.add('slider__photo-active');
  circleButtons[currentIndex].classList.add('active');

  startAutoplay();
};

const onPrev = () => {
  images[currentIndex].classList.remove('slider__photo-active');
  circleButtons[currentIndex].classList.remove('active');
  currentIndex--;
  writeInLocalStorageIndex();
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
    writeInLocalStorageIndex();
  }
  images[currentIndex].classList.add('slider__photo-active');
  circleButtons[currentIndex].classList.add('active');

  startAutoplay();
};

btnNext.addEventListener('click', onNext);
btnPrev.addEventListener('click', onPrev);

circleButtons.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    circleButtons[currentIndex].classList.remove('active');
    images.forEach((img) => img.classList.remove('slider__photo-active'));
    images[i].classList.add('slider__photo-active');
    currentIndex = i;
    writeInLocalStorageIndex();
    circleButtons[currentIndex].classList.add('active');

    startAutoplay();
  });
});

let interval;

const stopAutoplay = () => {
  if (isPaused === true) {
    clearInterval(interval);
    pause.classList.add('slider__auto-button--active');
    play.classList.remove('slider__auto-button--active');
  }
};

const startAutoplay = () => {
  if (isPaused === false) {
    clearInterval(interval);
    interval = setInterval(onNext, 2000);
    play.classList.add('slider__auto-button--active');
    pause.classList.remove('slider__auto-button--active');
  }
};

stopAutoplay();
startAutoplay();

pause.addEventListener('click', () => {
  isPaused = true;
  writeInLocalStoragePaused();
  stopAutoplay();
});

play.addEventListener('click', () => {
  isPaused = false;
  writeInLocalStoragePaused();
  startAutoplay();
});

window.addEventListener('keydown', (evt) => {
  if (evt.key === 'ArrowRight' || evt.key === 'Enter') {
    onNext();
    startAutoplay();
  }
});

window.addEventListener('keydown', (evt) => {
  if (evt.key === 'ArrowLeft' || evt.key === 'Backspace') {
    onPrev();
    startAutoplay();
  }
});

// SLIDER ENDING --------------------------------------------------
