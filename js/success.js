'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content;

  window.onAddNewBookingSuccess = function () {
    document.body.appendChild(createSuccess());
    window.map.reset();
    window.adForm.resetAdForm();
    window.card.closeMapCard();
    window.mapFiltersForm.reset();
    window.mapFiltersForm.stopTrackingFieldsChanges();
    window.map.pinMain.removeEventListener('mousedown', window.map.onMainPinMouseDown);
    window.map.pinMain.addEventListener('mousedown', window.map.onMainPinMouseDown);
    window.map.pinMain.addEventListener('keydown', window.map.onMainPinEnterPress, {once: true});
    window.util.disableForm(window.adForm.form);
    window.validation.turnOffValidation();
  };

  function createSuccess() {
    var successElement = successTemplate.cloneNode(true);
    document.addEventListener('keydown', onSuccessMessageEscPress);
    document.addEventListener('click', onSuccessMessageClick);

    return successElement;
  }

  function onSuccessMessageEscPress(evt) {
    evt.preventDefault();
    window.util.isEscPressed(evt, closeSuccess);
    document.removeEventListener('keydown', onSuccessMessageEscPress);
    document.removeEventListener('click', onSuccessMessageClick);
  }

  function onSuccessMessageClick(evt) {
    evt.preventDefault();
    closeSuccess();
    document.removeEventListener('keydown', onSuccessMessageEscPress);
    document.removeEventListener('click', onSuccessMessageClick);
  }

  function closeSuccess() {
    var success = document.querySelector('.success');
    success.parentNode.removeChild(success);
  }
})();
