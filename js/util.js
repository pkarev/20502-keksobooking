'use strict';

(function () {
  var ESC_KEYCODE = 27;

  function isEscPressed(evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  }

  function getDraggedCoord(dragValue, minLimit, maxLimit) {
    if (dragValue < minLimit) {
      return minLimit;
    }

    if (dragValue > maxLimit) {
      return maxLimit;
    }

    return dragValue;
  }

  function enableForm(form) {
    var formClass = form.classList[0];
    var formDisabledClass = formClass + '--disabled';
    form.classList.remove(formDisabledClass);
    enableFormFields(form);
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

  window.util = {
    isEscPressed: isEscPressed,
    getDraggedCoord: getDraggedCoord,
    enableForm: enableForm
  };
})();
