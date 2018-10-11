'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content;

  window.error = {
    onAddNewBookingError: function (errorMessage) {
      document.body.appendChild(createError(errorMessage, onSaveErrorCloseClick));
      document.addEventListener('keydown', onErrorMessageEscPress);
    },
    onGetBookingsError: function (errorMessage) {
      document.body.appendChild(createError(errorMessage, onGetErrorCloseClick));
    }
  };

  function onGetErrorCloseClick() {
    window.location.reload();
  }

  function onSaveErrorCloseClick() {
    closeError();
  }

  function onErrorMessageEscPress(evt) {
    evt.preventDefault();
    window.util.isEscPressed(evt, closeError);
    document.removeEventListener('keydown', onErrorMessageEscPress);
  }

  function closeError() {
    var error = document.querySelector('.error');
    error.parentNode.removeChild(error);
  }

  function createError(errorMessage, errorCloseHandler) {
    var errorElement = errorTemplate.cloneNode('true');
    var error = errorElement.querySelector('.error__message');

    if (errorMessage) {
      error.textContent = errorMessage;
    }

    var errorClose = errorElement.querySelector('.error button');
    errorClose.addEventListener('click', errorCloseHandler);

    return errorElement;
  }

})();
