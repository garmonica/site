/* global L:readonly */

const TEXT = 'Санкт-Петербург – русский портовый город на побережье Балтийского моря, который в течение двух веков служил столицей Российской империи. Он был основан в 1703 году Петром I, которому воздвигнут знаменитый памятник "Медный всадник". Город по праву считается культурным центром страны. У туристов пользуются популярностью Мариинский театр, где проходят оперные и балетные спектакли, и Государственный Русский музей с коллекцией русского искусства, которая включает как православные иконы, так и работы художника-абстракциониста Василия Кандинского.';

const map = L.map('map')
  .setView({
    lat: 59.93918,
    lng: 30.31579,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/icon-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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
