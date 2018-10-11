'use strict';

(function () {
  var MAX_PINS_TO_SHOW = 5;
  var OrdinaryMarkerSize = {
    width: 50,
    height: 70
  };
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function createPin(pinParams, index) {
    var pinElement = mapPinTemplate.cloneNode(true);

    pinElement.style.left = pinParams.location.x - OrdinaryMarkerSize.width / 2 + 'px';
    pinElement.style.top = pinParams.location.y - OrdinaryMarkerSize.height + 'px';
    pinElement.querySelector('img').src = pinParams.author.avatar;
    pinElement.querySelector('img').alt = pinParams.offer.title;
    pinElement.dataset.id = index;

    return pinElement;
  }

  function renderPins(pins) {
    var pinsFragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length && i < MAX_PINS_TO_SHOW; i++) {
      pinsFragment.appendChild(window.pin.createPin(pins[i], i));
    }

    document.querySelector('.map__pins').appendChild(pinsFragment);
  }

  function clearPinsActiveClass() {
    var mapPins = document.querySelectorAll('.map__pin');
    [].forEach.call(mapPins, function (pin) {
      if (pin.classList.contains('map__pin--main')) {
        return;
      }
      pin.classList.remove('map__pin--active');
    });
  }

  window.pin = {
    ordinaryMarkerWidth: OrdinaryMarkerSize.width,
    ordinaryMarkerHeight: OrdinaryMarkerSize.height,

    createPin: createPin,
    renderPins: renderPins,
    clearPinsActiveClass: clearPinsActiveClass
  };
})();

