'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content;

  window.onAddNewBookingSuccess = function () {
    document.body.appendChild(createSuccess());
    window.adForm.resetAdForm();
    window.mapFiltersForm.clearPins();
    window.card.closeMapCard();
    window.map.reset();
    window.map.pinMain.addEventListener('mouseup', window.map.activateBookingPage, {once: true});
  };


  function createSuccess() {
    var successElement = successTemplate.cloneNode('true');
    document.addEventListener('keydown', onSuccessMessageEscPress);
    document.addEventListener('click', onSuccessMessageClick);

    return successElement;
  }

  function onSuccessMessageEscPress(evt) {
    evt.preventDefault();
    window.util.isEscPressed(evt, closeSuccess);
    document.removeEventListener('keydown', onSuccessMessageEscPress);
  }

  function onSuccessMessageClick(evt) {
    evt.preventDefault();
    closeSuccess();
    document.removeEventListener('click', onSuccessMessageClick);
  }

  function closeSuccess() {
    var success = document.querySelector('.success');
    success.parentNode.removeChild(success);
  }

})();
