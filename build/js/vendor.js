/* global L:readonly */

const TEXT = `

Санкт-Петербyрг - город федерального значения, второй по численности населения город России.
Основан в 1703 году царём Петром I.
В 1712—1918 годах — столица Российского государства.
Назван в честь Святого Петра, небесного покровителя царя-основателя, но со временем стал всё больше ассоциироваться с именем самого Петра I.
Расположен на побережье Финского залива и в устье реки Невы.
Население: 5 384 342 чел. (2021г.)
Санкт-Петербург — самый северный в мире город с населением более одного миллиона человек.
Наиболее значимые культурно-туристические объекты: Эрмитаж, Кунсткамера, Мариинский театр, Российская национальная библиотека, Русский музей, Петропавловская крепость, Исаакиевский собор, Невский проспект.

`;

const map = L.map('map')
  .setView({
    lat: 59.94318,
    lng: 30.31579,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/icon-pin.svg',
  iconSize: [60, 70],
  iconAnchor: [35, 60],
});

const mainPinMarker = L.marker(
  {
    lat: 59.93918,
    lng: 30.31579,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker
  .addTo(map)
  .bindPopup(TEXT);
