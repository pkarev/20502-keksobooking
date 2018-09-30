'use strict';

(function () {
  var successTemplate = document.querySelector('#error').content;

  window.onAddNewBookingSuccess = function () {
    var successElement = successTemplate.cloneNode('true');
    document.body.appendChild(successElement);
    window.form.resetAdForm();
  };
})();
