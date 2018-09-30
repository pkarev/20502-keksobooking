'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var MAIN_MARKER_SIZES = {
    width: 65,
    height: 79,
    pinHeight: 14
  };

  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');

  function setAdFormAddress() {
    var mapPinMainX = mapPinMain.offsetLeft;
    var mapPinMainY = mapPinMain.offsetTop;
    var address = (mapPinMainX + MAIN_MARKER_SIZES.width / 2) + ', ' + (mapPinMainY + MAIN_MARKER_SIZES.height + MAIN_MARKER_SIZES.pinHeight);
    adFormAddress.setAttribute('value', address);
  }

  function setInitialAdFormAddress() {
    var mapPinMainX = mapPinMain.offsetLeft;
    var mapPinMainY = mapPinMain.offsetTop;
    var address = (mapPinMainX + MAIN_MARKER_SIZES.width / 2) + ', ' + (mapPinMainY + MAIN_MARKER_SIZES.height);
    adFormAddress.setAttribute('value', address);
  }

  function resetAdForm() {
    adForm.reset();
  }

  function getRank(booking) {
    var rank = 0;

    if (booking.type === bookingType) {
      rank += 1;
    }

    if (booking.price === bookingPrice) {
      rank += 1;
    }

    if (booking.rooms === bookingRooms) {
      rank += 1;
    }

    if (booking.rooms === bookingGuests) {
      rank += 1;
    }

    return rank;
  }

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  function updatePins() {
    window.pin.renderPins(window.bookings.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  }

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), window.onAddNewBookingSuccess, window.error.onAddNewBookingError);
  });

  window.adForm = {
    setAdFormAddress: setAdFormAddress,
    setInitialAdFormAddress: setInitialAdFormAddress,
    resetAdForm: resetAdForm,
    form: adForm
  };
})();
