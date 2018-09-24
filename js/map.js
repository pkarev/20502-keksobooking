'use strict';

var MAX_GUESTS = 12;
var MAP_MARKER_Y_MIN = 130;
var MAP_MERKER_Y_MAX = 630;
var MAP_MARKER_WIDTH = 50;
var MAP_MARKER_HEIGHT = 70;
var MAP_MAIN_MARKER_PIN_HEIGHT = 20;

var bookings = new Array(8);

var offerAvatarIndexes = generateAvatarIndexes(bookings.length);
var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offerTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Бунгало',
  bungalo: 'Дом'
};

var offerCheckins = ['12:00', '13:00', '14:00'];
var offerCheckouts = ['12:00', '13:00', '14:00'];
var offerFeaturesList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var map = document.querySelector('.map');
var mapCard;
var mapPinMain = map.querySelector('.map__pin--main');
var mapPinMainWidth = mapPinMain.getBoundingClientRect().width;
var mapPinMainHeight = mapPinMain.getBoundingClientRect().height;
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinMinX = MAP_MARKER_WIDTH / 2;
var mapPinMaxX = map.getBoundingClientRect().width - MAP_MARKER_WIDTH / 2;
var mapPinMinY = MAP_MARKER_Y_MIN;
var mapPinMaxY = MAP_MERKER_Y_MAX;
var isMapMainMarkerPinned = false;

generateBookings(bookings);

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

mapPinMain.addEventListener('mouseup', activateBookingPage, {once: true});

function generateBookings(array) {
  for (var i = 0; i < array.length; i++) {
    var booking = {};

    booking.author = {};
    booking.author.avatar = 'img/avatars/user' + takeRandomFromArray(offerAvatarIndexes) + '.png';

    booking.location = {};
    booking.location.x = randomIntFromInterval(mapPinMinX, mapPinMaxX);
    booking.location.y = randomIntFromInterval(mapPinMinY, mapPinMaxY);

    booking.offer = {};
    booking.offer.title = takeRandomFromArray(offerTitles);
    booking.offer.address = booking.location.x + ', ' + booking.location.y;
    booking.offer.price = randomIntFromInterval(1000, 1000000);
    booking.offer.type = Object.keys(offerTypes)[Math.floor(Math.random() * Object.keys(offerTypes).length)];
    booking.offer.guests = Math.floor(Math.random() * MAX_GUESTS) + 1;
    booking.offer.rooms = randomIntFromInterval(1, 5);
    booking.offer.checkin = offerCheckins[Math.floor(Math.random() * offerCheckins.length)];
    booking.offer.checkout = offerCheckouts[Math.floor(Math.random() * offerCheckouts.length)];
    booking.offer.features = getFeatures(offerFeaturesList);
    booking.offer.description = '';
    booking.offer.photos = shuffleArray(offerPhotos);

    bookings[i] = booking;
  }
}

function createCardElement(cardParams) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = cardParams.offer.title;
  cardElement.querySelector('.popup__text--price').textContent = cardParams.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = offerTypes[cardParams.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = cardParams.offer.rooms + ' комнаты для ' + cardParams.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardParams.offer.checkin + ', выезд до ' + cardParams.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = cardParams.offer.description;
  cardElement.querySelector('.popup__avatar').src = cardParams.author.avatar;

  var cardPhotosContainer = cardElement.querySelector('.popup__photos');
  var photoElementTemplate = cardElement.querySelector('.popup__photo');
  var photoFragment = document.createDocumentFragment();

  for (var i = 0; i < cardParams.offer.photos.length; i++) {
    var photo = photoElementTemplate.cloneNode(true);
    photo.src = cardParams.offer.photos[i];
    photoFragment.appendChild(photo);
  }

  cardPhotosContainer.innerHTML = '';
  cardPhotosContainer.appendChild(photoFragment);

  var cardFeaturesContainer = cardElement.querySelector('.popup__features');
  var featureElementTemplate = cardElement.querySelector('.popup__feature');
  featureElementTemplate.classList = 'popup__feature';

  var featuresFragment = document.createDocumentFragment();
  var featuresArray = cardParams.offer.features.split(', ');

  for (var j = 0; j < featuresArray.length; j++) {
    var feature = featureElementTemplate.cloneNode(true);
    var featureClass = 'popup__feature--' + featuresArray[j];
    feature.classList.add(featureClass);
    featuresFragment.appendChild(feature);
  }

  cardFeaturesContainer.innerHTML = '';
  cardFeaturesContainer.appendChild(featuresFragment);

  return cardElement;
}

function createPinElement(pinParams) {
  var pinElement = mapPinTemplate.cloneNode(true);

  pinElement.style.left = pinParams.location.x - MAP_MARKER_WIDTH / 2 + 'px';
  pinElement.style.top = pinParams.location.y - MAP_MARKER_HEIGHT + 'px';
  pinElement.querySelector('img').src = pinParams.author.avatar;
  pinElement.querySelector('img').alt = pinParams.offer.title;

  return pinElement;
}

function renderPins(array) {
  var pinsFragment = document.createDocumentFragment();
  array.forEach(function (booking) {
    pinsFragment.appendChild(createPinElement(booking));
  });

  document.querySelector('.map__pins').appendChild(pinsFragment);
}

function takeRandomFromArray(array) {
  var index = Math.floor(Math.random() * array.length);
  var item = array[index];
  array.splice(index, 1);

  return item;
}

function generateAvatarIndexes(length) {
  var array = [];
  for (var j = 1; j <= length; j++) {
    array.push('0' + j);
  }

  return array;
}

function getFeatures(features) {
  var featuresList = features.slice();
  var offerFeatures = '';

  for (var k = 0; k < featuresList.length; k++) {
    offerFeatures += takeRandomFromArray(featuresList);
    if (k < featuresList.length - 1) {
      offerFeatures += ', ';
    }
  }

  return offerFeatures;
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffleArray(array) {
  var arrayCopy = array.slice();
  for (var l = arrayCopy.length - 1; l > 0; l--) {
    var m = Math.floor(Math.random() * (l + 1));
    var temp = arrayCopy[l];
    arrayCopy[l] = arrayCopy[m];
    arrayCopy[m] = temp;
  }

  return arrayCopy;
}

var adForm = document.querySelector('.ad-form');
var adFormAddress = adForm.querySelector('#address');
var mapFiltersForm = document.querySelector('.map__filters');

function activateBookingPage() {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFiltersForm.classList.remove('map__filters--disabled');
  enableFormFields(adForm);
  enableFormFields(mapFiltersForm);
  setAdFormAddress(isMapMainMarkerPinned);
  isMapMainMarkerPinned = true;
  renderPins(bookings);
}

function setAdFormAddress(isPinned) {
  var mapPinMainX = mapPinMain.offsetLeft;
  var mapPinMainY = mapPinMain.offsetTop;
  var address;
  if (isPinned) {
    address = (mapPinMainX + mapPinMainWidth / 2) + ', ' + (mapPinMainY + mapPinMainHeight + MAP_MAIN_MARKER_PIN_HEIGHT);
  } else {
    address = (mapPinMainX + mapPinMainWidth / 2) + ', ' + (mapPinMainY + mapPinMainHeight);
  }

  adFormAddress.setAttribute('value', address);
}

function enableFormFields(form) {
  var inputs = form.querySelectorAll('input');
  var selects = form.querySelectorAll('select');
  inputs.forEach(function (input) {
    input.removeAttribute('disabled');
  });
  selects.forEach(function (select) {
    select.removeAttribute('disabled');
  });
}

map.addEventListener('click', function (evt) {
  var target = evt.target;

  while (target !== map) {
    if (target.classList.toString() === 'map__pin') {
      var clickedBooking = getBookingByPinLocation(target);
      renderMapCard(clickedBooking);

      return;
    }

    target = target.parentNode;
  }
});

function getBookingByPinLocation(pin) {
  var clickedPinLocation = (parseInt(pin.style.left, 10) + MAP_MARKER_WIDTH / 2) + ', ' + (parseInt(pin.style.top, 10) + MAP_MARKER_HEIGHT);
  var currentBooking = bookings.find(function (booking) {
    return booking.offer.address === clickedPinLocation;
  });

  return currentBooking;
}

function renderMapCard(cardData) {
  if (mapCard) {
    mapCard.innerHTML = createCardElement(cardData).innerHTML;
  } else {
    map.appendChild(createCardElement(cardData));
    mapCard = map.querySelector('.map__card');
  }

  var popupClose = map.querySelector('.popup__close');
  popupClose.addEventListener('click', function () {
    closeMapCard();
  });

  mapCard.style.display = 'block';
}

document.addEventListener('keydown', onMapCardEscPress);

function onMapCardEscPress(evt) {
  if (evt.keyCode === 27) {
    closeMapCard();
  }
}

function closeMapCard() {
  mapCard.style.display = 'none';
}

