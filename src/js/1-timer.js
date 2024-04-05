import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const btnEl = document.querySelector('[data-start]');
const daySpanEl = document.querySelector('[data-days]');
const hourSpanEl = document.querySelector('[data-hours]');
const minuteSpanEl = document.querySelector('[data-minutes]');
const secondSpanEl = document.querySelector('[data-seconds]');
const inputEl = document.querySelector('#datetime-picker');
btnEl.disabled = true;

let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      btnEl.disabled = false;
      return;
    }
    iziToast.info({
      message: `Please choose a date in the future`,
    });
    btnEl.disabled = true;
  },
};

flatpickr('#datetime-picker', options);
btnEl.addEventListener('click', () => {
  let resultTime = new Date(inputEl.value).getTime() - Date.now();
  btnEl.disabled = true;
  inputEl.disabled = true;
  intervalId = setInterval(() => {
    resultTime -= 1000;
    if (resultTime < 100) {
      inputEl.disabled = false;
      clearInterval(intervalId);
      updateTime();
      return;
    }
    const date = convertMs(resultTime);
    updateTime(date);
    console.log(date);
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTime({
  days = '00',
  hours = '00',
  minutes = '00',
  seconds = '00',
} = {}) {
  daySpanEl.textContent = addLeadingZero(days);
  hourSpanEl.textContent = addLeadingZero(hours);
  minuteSpanEl.textContent = addLeadingZero(minutes);
  secondSpanEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
