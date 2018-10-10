'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var MainMarkerBoundarie = {
    yMin: 37,
    yMax: 537,
    xMin: 0,
    xMax: 1138
  };

  mapPinMain.addEventListener('mouseup', activateBookingPage, {once: true});

  function activateBookingPage() {
    map.classList.remove('map--faded');
    window.util.enableForm(window.mapFilterForm.form);
    window.util.enableForm(window.adForm.form);
    window.adForm.setInitialAdFormAddress();
    window.mapFilterForm.updatePins(window.mapFilterForm.filteredPins);
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

        mapPinMain.style.left = window.util.getDraggedCoord(mapPinMain.offsetLeft - shift.x, MainMarkerBoundarie.xMin, MainMarkerBoundarie.xMax) + 'px';
        mapPinMain.style.top = window.util.getDraggedCoord(mapPinMain.offsetTop - shift.y, MainMarkerBoundarie.yMin, MainMarkerBoundarie.yMax) + 'px';

        window.adForm.setAdFormAddress();
      }

      function onMouseUp(upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        window.adForm.setAdFormAddress();
      }
    });
  }

  map.addEventListener('click', function (evt) {
    var target = evt.target;

    while (target !== map) {
      if (target.classList.toString() === 'map__pin') {
        window.card.renderMapCard(window.mapFilterForm.filteredPins[target.dataset.id]);

        return;
      }

      target = target.parentNode;
    }
  });

  document.addEventListener('keydown', onMapCardEscPress);

  function onMapCardEscPress(evt) {
    window.util.isEscPressed(evt, window.card.closeMapCard);
  }

})();


