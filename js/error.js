'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content;

  window.error = {
    onAddNewBookingError: function (errorMessage) {
      document.body.appendChild(createError(errorMessage, onSaveErrorCloseClick));
    },
    onGetBookingsError: function (errorMessage) {
      document.body.appendChild(createError(errorMessage, onGetErrorCloseClick));
    }
  };

  function onGetErrorCloseClick() {
    window.location.reload();
  }

  function onSaveErrorCloseClick(evt) {
    var error = evt.target.closest('.error');
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
