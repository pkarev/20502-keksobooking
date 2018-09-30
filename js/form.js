'use strict';

(function () {
  var MAP_MAIN_MARKER_PIN_HEIGHT = 20;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPinMainWidth = mapPinMain.getBoundingClientRect().width;
  var mapPinMainHeight = mapPinMain.getBoundingClientRect().height;

  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var mapFiltersForm = document.querySelector('.map__filters');
  var forms = [adForm, mapFiltersForm];

  function setAdFormAddress(isPinned) {
    var mapPinMainX = mapPinMain.offsetLeft;
    var mapPinMainY = mapPinMain.offsetTop;
    var address;
    if (isPinned) {
      address = (mapPinMainX + mapPinMainWidth / 2) + ', ' + (mapPinMainY + mapPinMainHeight + MAP_MAIN_MARKER_PIN_HEIGHT);
    } else {
      address = (mapPinMainX + mapPinMainWidth / 2) + ', ' + (mapPinMainY + mapPinMainHeight);
    }

    adFormAddress.setAttribute('value', address);
  }

  function enableFormFields(form) {
    var inputs = form.querySelectorAll('input');
    var selects = form.querySelectorAll('select');
    inputs.forEach(function (input) {
      input.removeAttribute('disabled');
    });
    selects.forEach(function (select) {
      select.removeAttribute('disabled');
    });
  }

  function enableForm(form) {
    var formClass = form.classList[0];
    var formDisabledClass = formClass + '--disabled';
    form.classList.remove(formDisabledClass);
  }

  function enableForms() {
    forms.forEach(function (form) {
      enableForm(form);
      enableFormFields(form);
    });
  }

  function resetAdForm() {
    adForm.reset();
  }

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(mapFiltersForm), window.onAddNewBookingSuccess, window.error.onAddNewBookingError);
  });

  window.form = {
    setAdFormAddress: setAdFormAddress,
    enableForms: enableForms,
    resetAdForm: resetAdForm
  };
})();
