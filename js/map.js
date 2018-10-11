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

  mapPinMain.addEventListener('mouseup', activateBookingPage, {once: true});
  mapPinMain.addEventListener('keydown', onMainPinEnterPress, {once: true});

  function onMainPinEnterPress(evt) {
    window.util.isEnterPressed(evt, activateBookingPage);
  }

  function activateBookingPage() {
    map.classList.remove('map--faded');
    window.util.enableForm(window.mapFiltersForm.form);
    window.adForm.setInitialAdFormAddress();
    window.mapFiltersForm.updatePins(window.mapFiltersForm.filteredPins);
    window.setAvailableGuestsOptions();

    mapPinMain.addEventListener('mousedown', onMouseDown);
  }

  function onMouseDown(downEvt) {
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

      mapPinMain.style.left = window.util.getDraggedCoord(mapPinMain.offsetLeft - shift.x, MainMarkerBoundarie.X_MIN, MainMarkerBoundarie.X_MAX) + 'px';
      mapPinMain.style.top = window.util.getDraggedCoord(mapPinMain.offsetTop - shift.y, MainMarkerBoundarie.Y_MIN, MainMarkerBoundarie.Y_MAX) + 'px';

      window.adForm.setAdFormAddress();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.adForm.setAdFormAddress();
    }
  }

  map.addEventListener('click', function (evt) {
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
  });

  function resetMap() {
    mapPinMain.style.left = MapPinMainInitalPosition.x + 'px';
    mapPinMain.style.top = MapPinMainInitalPosition.y + 'px';
    map.classList.add('map--faded');
  }

  window.map = {
    pinMain: mapPinMain,
    reset: resetMap,
    activateBookingPage: activateBookingPage,
    onMainPinEnterPress: onMainPinEnterPress,
    onMouseDown: onMouseDown
  };

})();


