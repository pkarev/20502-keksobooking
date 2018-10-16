'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    TAB: 9,
    ENTER: 13
  };
  var DEBOUNCE_INTERVAL = 500;

  function isEscPressed(evt, action) {
    if (evt.keyCode === KeyCode.ESC) {
      action();
    }
  }

  function isEnterPressed(evt, action) {
    if (evt.keyCode === KeyCode.ENTER) {
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

  function disableForm(form) {
    var formClass = form.classList[0];
    var formDisabledClass = formClass + '--disabled';
    form.classList.add(formDisabledClass);
    disableFormFields(form);
  }

  function enableFormFields(form) {
    var inputs = form.querySelectorAll('input');
    var selects = form.querySelectorAll('select');
    var textAreas = form.querySelectorAll('textarea');
    var uploads = form.querySelectorAll('[type="file"]');
    var submitButton = form.querySelector('[type="submit"]');
    var resetButton = form.querySelector('[type="reset"]');
    if (inputs.length) {
      inputs.forEach(function (input) {
        input.removeAttribute('disabled');
      });
    }
    if (selects.length) {
      selects.forEach(function (select) {
        select.removeAttribute('disabled');
      });
    }
    if (textAreas.length) {
      textAreas.forEach(function (textArea) {
        textArea.removeAttribute('disabled');
      });
    }
    if (uploads.length) {
      uploads.forEach(function (upload) {
        upload.removeAttribute('disabled');
      });
    }

    if (submitButton) {
      submitButton.removeAttribute('disabled');
    }

    if (resetButton) {
      resetButton.removeAttribute('disabled');
    }
  }

  function disableFormFields(form) {
    var inputs = form.querySelectorAll('input');
    var selects = form.querySelectorAll('select');
    var textAreas = form.querySelectorAll('textarea');
    var uploads = form.querySelectorAll('[type="file"]');
    var submitButton = form.querySelector('[type="submit"]');
    var resetButton = form.querySelector('[type="reset"]');

    if (inputs.length) {
      inputs.forEach(function (input) {
        input.setAttribute('disabled', true);
      });
    }

    if (selects.length) {
      selects.forEach(function (select) {
        select.setAttribute('disabled', true);
      });
    }

    if (textAreas.length) {
      textAreas.forEach(function (textArea) {
        textArea.setAttribute('disabled', true);
      });
    }

    if (uploads.length) {
      uploads.forEach(function (upload) {
        upload.setAttribute('disabled', true);
      });
    }

    if (submitButton) {
      submitButton.setAttribute('disabled', true);
    }

    if (resetButton) {
      resetButton.setAttribute('disabled', true);
    }
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
    KeyCode: KeyCode,
    isEscPressed: isEscPressed,
    isEnterPressed: isEnterPressed,
    getDraggedCoord: getDraggedCoord,
    enableForm: enableForm,
    disableForm: disableForm,
    debounce: debounce
  };
})();
