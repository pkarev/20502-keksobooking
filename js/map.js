'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var MapPinMainInitalPosition = {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop,
  };
  var MainMarkerBoundarie = {
    Y_MIN: (130 - window.adForm.MainMarkerSize.TOTAL_HEIGHT),
    Y_MAX: (630 - window.adForm.MainMarkerSize.TOTAL_HEIGHT),
    X_MIN: 0,
    X_MAX: 1138
  };

  mapPinMain.addEventListener('mousedown', onMainPinMouseDown);
  mapPinMain.addEventListener('keydown', onMainPinEnterPress, {once: true});

  function onMainPinEnterPress(evt) {
    window.util.isEnterPressed(evt, activateBookingPage);
  }

  function activateBookingPage() {
    map.classList.remove('map--faded');
    window.util.enableForm(window.mapFiltersForm.form);
    window.util.enableForm(window.adForm.form);
    window.mapFiltersForm.updatePins(window.mapFiltersForm.filteredPins);
    window.mapFiltersForm.trackFieldChanges();
    map.addEventListener('click', onMapPinClick);
    window.validation.setGuestsForRooms();
    window.adForm.address.addEventListener('keydown', window.adForm.onAdFormAddressType);
    window.adForm.form.addEventListener('submit', window.adForm.onAdFormSubmitClick);
    window.adForm.resetButton.addEventListener('click', window.adForm.onAdFormResetClick);
    window.validation.turnOnValidation();
    mapPinMain.removeEventListener('keydown', onMainPinEnterPress);
  }

  function onMainPinMouseDown(downEvt) {
    downEvt.preventDefault();
    var currentCoords = {
      x: mapPinMain.clientX,
      y: mapPinMain.clientY
    };

    var dragged = false;
    var activated = false;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        y: currentCoords.y - moveEvt.clientY,
        x: currentCoords.x - moveEvt.clientX
      };

      currentCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.left = window.util.getDraggedCoord(mapPinMain.offsetLeft - shift.x, MainMarkerBoundarie.X_MIN, MainMarkerBoundarie.X_MAX) + 'px';
      mapPinMain.style.top = window.util.getDraggedCoord(mapPinMain.offsetTop - shift.y, MainMarkerBoundarie.Y_MIN, MainMarkerBoundarie.Y_MAX) + 'px';

      window.adForm.setAdFormAddress();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (!dragged) {
        return;
      }

      if (activated) {
        return;
      }

      activated = true;
      activateBookingPage();
    }
  }

  function onMapPinClick(evt) {
    var target = evt.target;

    while (target !== map) {
      if (target.classList.toString() === 'map__pin') {
        window.pin.clearPinsActiveClass();
        target.classList.add('map__pin--active');
        window.card.renderMapCard(window.mapFiltersForm.filteredPins[target.dataset.id]);

        return;
      }

      target = target.parentNode;
    }
  }

  function clearPins() {
    var mapPins = document.querySelectorAll('.map__pin');
    [].forEach.call(mapPins, function (pin) {
      if (pin.classList.contains('map__pin--main')) {
        return;
      }
      pin.parentNode.removeChild(pin);
    });
  }

  function resetMap() {
    clearPins();
    window.card.closeMapCard();
    mapPinMain.style.left = MapPinMainInitalPosition.x + 'px';
    mapPinMain.style.top = MapPinMainInitalPosition.y + 'px';
    map.classList.add('map--faded');
    map.removeEventListener('click', onMapPinClick);
  }

  window.map = {
    pinMain: mapPinMain,
    reset: resetMap,
    clearPins: clearPins,
    onMainPinEnterPress: onMainPinEnterPress,
    onMainPinMouseDown: onMainPinMouseDown
  };

})();


