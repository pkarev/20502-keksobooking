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
  var adFormPrice = adForm.querySelector('#price');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');

  setInitialAdFormAddress();

  function onAdFormAddressType(keyPressEvt) {
    if (keyPressEvt.keyCode !== window.util.KeyCode.TAB) {
      keyPressEvt.preventDefault();
    }
  }

  function onAdFormResetClick(evt) {
    evt.preventDefault();
    window.map.reset();
    resetAdForm();
    window.mapFiltersForm.stopTrackingFieldsChanges();
    window.mapFiltersForm.reset();
    document.addEventListener('keydown', window.map.onMainPinEnterPress, {once: true});
    window.map.pinMain.addEventListener('keydown', window.map.onMainPinEnterPress, {once: true});
    window.validation.turnOffValidation();
  }

  function setAdFormAddress() {
    var mapPinMainX = mapPinMain.offsetLeft;
    var mapPinMainY = mapPinMain.offsetTop;
    var address = (Math.floor(mapPinMainX + MainMarkerSize.WIDTH / 2)) + ', ' + (mapPinMainY + MainMarkerSize.TOTAL_HEIGHT);
    adFormAddress.setAttribute('value', address);
  }

  function setInitialAdFormAddress() {
    var mapPinMainX = mapPinMain.offsetLeft;
    var mapPinMainY = mapPinMain.offsetTop;
    var address = (Math.floor(mapPinMainX + MainMarkerSize.WIDTH / 2)) + ', ' + (mapPinMainY + MainMarkerSize.MARKER_HEIGHT);
    adFormAddress.setAttribute('value', address);
  }

  function resetAdForm() {
    adForm.reset();
    setInitialAdFormAddress();
    adFormPrice.placeholder = '1000';
    window.util.disableForm(adForm);
    adForm.removeEventListener('submit', window.adForm.onAdFormSubmitClick);
    adFormResetButton.removeEventListener('click', window.adForm.onAdFormResetClick);
    adFormAddress.removeEventListener('keydown', onAdFormAddressType);
  }

  function onAdFormSubmitClick(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), window.onAddNewBookingSuccess, window.error.onAddNewBookingError);
  }

  window.adForm = {
    setAdFormAddress: setAdFormAddress,
    setInitialAdFormAddress: setInitialAdFormAddress,
    resetAdForm: resetAdForm,
    form: adForm,
    address: adFormAddress,
    resetButton: adFormResetButton,
    MainMarkerSize: MainMarkerSize,
    onAdFormResetClick: onAdFormResetClick,
    onAdFormSubmitClick: onAdFormSubmitClick,
    onAdFormAddressType: onAdFormAddressType
  };
})();
