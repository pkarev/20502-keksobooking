'use strict';

(function () {
  var MAP_MARKER_WIDTH = 50;
  var MAP_MARKER_HEIGHT = 70;
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function createPin(pinParams) {
    var pinElement = mapPinTemplate.cloneNode(true);

    pinElement.style.left = pinParams.location.x - MAP_MARKER_WIDTH / 2 + 'px';
    pinElement.style.top = pinParams.location.y - MAP_MARKER_HEIGHT + 'px';
    pinElement.querySelector('img').src = pinParams.author.avatar;
    pinElement.querySelector('img').alt = pinParams.offer.title;

    return pinElement;
  }

  function renderPins() {
    var pinsFragment = document.createDocumentFragment();
    window.data.bookings.forEach(function (booking) {
      pinsFragment.appendChild(window.pin.createPin(booking));
    });

    document.querySelector('.map__pins').appendChild(pinsFragment);
  }

  window.pin = {
    mapMarkerWidth: MAP_MARKER_WIDTH,
    mapMarkerHeight: MAP_MARKER_HEIGHT,

    createPin: createPin,
    renderPins: renderPins
  };
})();

