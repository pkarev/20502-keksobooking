'use strict';

(function () {
  var MainMarkerSize = {
    WIDTH: 65,
    MARKER_HEIGHT: 65,
    PIN_HEIGHT: 14,
    TOTAL_HEIGHT: 79
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var adFormReset = adForm.querySelector('.ad-form__reset');

  adFormAddress.addEventListener('keydown', function (evt) {
    if (evt.keyCode !== window.util.keyCode.TAB) {
      evt.preventDefault();
    }
  });

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetAdForm();
    window.mapFiltersForm.clearPins();
    window.card.closeMapCard();
    window.map.reset();
    window.mapFiltersForm.reset();
    window.map.pinMain.removeEventListener('mousedown', window.map.onMouseDown);
    window.map.pinMain.addEventListener('keydown', window.map.onMainPinEnterPress, {once: true});
    window.map.pinMain.addEventListener('mouseup', window.map.activateBookingPage, {once: true});
  });

  function setAdFormAddress() {
    var mapPinMainX = mapPinMain.offsetLeft;
    var mapPinMainY = mapPinMain.offsetTop;
    var address = (mapPinMainX + MainMarkerSize.WIDTH / 2) + ', ' + (mapPinMainY + MainMarkerSize.TOTAL_HEIGHT);
    adFormAddress.setAttribute('value', address);
  }

  function setInitialAdFormAddress() {
    var mapPinMainX = mapPinMain.offsetLeft;
    var mapPinMainY = mapPinMain.offsetTop;
    var address = (mapPinMainX + MainMarkerSize.WIDTH / 2) + ', ' + (mapPinMainY + MainMarkerSize.MARKER_HEIGHT);
    adFormAddress.setAttribute('value', address);
  }

  function resetAdForm() {
    adForm.reset();
    adFormAddress.setAttribute('value', '');
    window.map.reset();
    document.addEventListener('keydown', window.map.onMainPinEnterPress, {once: true});
  }

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), window.onAddNewBookingSuccess, window.error.onAddNewBookingError);
  });

  window.adForm = {
    setAdFormAddress: setAdFormAddress,
    setInitialAdFormAddress: setInitialAdFormAddress,
    resetAdForm: resetAdForm,
    form: adForm,
    MainMarkerSize: MainMarkerSize
  };
})();
