'use strict';

(function () {
  var MAX_GUESTS = 12;
  var MAP_MARKER_WIDTH = 50;
  var MAP_MARKER_Y_MIN = 130;
  var MAP_MARKER_Y_MAX = 630;

  var map = document.querySelector('.map');
  var mapPinMinX = MAP_MARKER_WIDTH / 2;
  var mapPinMaxX = map.getBoundingClientRect().width - MAP_MARKER_WIDTH / 2;
  var mapPinMinY = MAP_MARKER_Y_MIN;
  var mapPinMaxY = MAP_MARKER_Y_MAX;
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

  generateBookings(bookings);

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
      booking.offer.photos = window.util.shuffleArray(offerPhotos);

      bookings[i] = booking;
    }
  }

  function generateAvatarIndexes(length) {
    var array = [];
    for (var j = 1; j <= length; j++) {
      array.push('0' + j);
    }

    return array;
  }

  function takeRandomFromArray(array) {
    var index = Math.floor(Math.random() * array.length);
    var item = array[index];
    array.splice(index, 1);

    return item;
  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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

  window.data = {
    bookings: bookings,
    mainMarkerYMin: MAP_MARKER_Y_MIN,
    mainMarkerYMax: MAP_MARKER_Y_MAX,
    offerTypes: offerTypes
  };
})();
