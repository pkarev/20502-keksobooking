'use strict';

(function () {
  var keyCode = {
    ESC: 27,
    TAB: 9,
    ENTER: 13
  };
  var DEBOUNCE_INTERVAL = 500;

  function isEscPressed(evt, action) {
    if (evt.keyCode === keyCode.ESC) {
      action();
    }
  }

  function isEnterPressed(evt, action) {
    if (evt.keyCode === keyCode.ENTER) {
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

  function debounce(fun) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.util = {
    keyCode: keyCode,
    isEscPressed: isEscPressed,
    isEnterPressed: isEnterPressed,
    getDraggedCoord: getDraggedCoord,
    enableForm: enableForm,
    debounce: debounce
  };
})();
