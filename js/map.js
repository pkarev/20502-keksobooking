'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var isMapMainMarkerPinned = false;

  mapPinMain.addEventListener('mouseup', activateBookingPage, {once: true});

  function activateBookingPage() {
    map.classList.remove('map--faded');
    window.form.enableForms();
    window.form.setAdFormAddress(isMapMainMarkerPinned);
    isMapMainMarkerPinned = true;
    window.pin.renderPins();
    window.setAvailableGuestsOptions();

    mapPinMain.addEventListener('mousedown', function (downEvt) {
      downEvt.preventDefault();

      var currentCoords = {
        x: mapPinMain.clientX,
        y: mapPinMain.clientY
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          y: currentCoords.y - moveEvt.clientY,
          x: currentCoords.x - moveEvt.clientX
        };

        currentCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (mapPinMain.offsetLeft - shift.x >= 0 && mapPinMain.offsetParent.clientWidth - mapPinMain.offsetLeft - mapPinMain.clientWidth >= 0) {
          mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        } else if (mapPinMain.offsetParent.clientWidth - mapPinMain.offsetLeft - mapPinMain.clientWidth < 0) {
          mapPinMain.style.left = (mapPinMain.offsetParent.clientWidth - mapPinMain.clientWidth) + 'px';
        }

        if (mapPinMain.offsetTop - shift.y >= window.data.mainMarkerYMin - mapPinMain.clientHeight && mapPinMain.offsetTop - shift.y <= window.data.mainMarkerYMax - mapPinMain.clientHeight) {
          mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        }

        window.form.setAdFormAddress();
      }

      function onMouseUp(upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        window.form.setAdFormAddress();
      }
    });
  }

  map.addEventListener('click', function (evt) {
    var target = evt.target;

    while (target !== map) {
      if (target.classList.toString() === 'map__pin') {
        var clickedBooking = getBookingByPinLocation(target);
        window.card.renderMapCard(clickedBooking);

        return;
      }

      target = target.parentNode;
    }
  });

  function getBookingByPinLocation(pin) {
    var clickedPinLocation = (parseInt(pin.style.left, 10) + window.pin.mapMarkerWidth / 2) + ', ' + (parseInt(pin.style.top, 10) + window.pin.mapMarkerHeight);
    var currentBooking = window.data.bookings.find(function (booking) {
      return booking.offer.address === clickedPinLocation;
    });

    return currentBooking;
  }

  document.addEventListener('keydown', onMapCardEscPress);

  function onMapCardEscPress(evt) {
    window.util.isEscPressed(evt, window.card.closeMapCard);
  }
})();


