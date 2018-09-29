'use strict';

(function () {
  var ESC_KEYCODE = 27;

  function isEscPressed(evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  }

  function shuffleArray(array) {
    var arrayCopy = array.slice();
    for (var l = arrayCopy.length - 1; l > 0; l--) {
      var m = Math.floor(Math.random() * (l + 1));
      var temp = arrayCopy[l];
      arrayCopy[l] = arrayCopy[m];
      arrayCopy[m] = temp;
    }

    return arrayCopy;
  }

  window.util = {
    shuffleArray: shuffleArray,
    isEscPressed: isEscPressed
  };
})();
