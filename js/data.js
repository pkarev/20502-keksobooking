'use strict';

(function () {
  window.backend.load(onGetBookingsSuccess, window.error.onGetBookingsError);

  function onGetBookingsSuccess(response) {
    window.bookings = response;
    window.util.enableForm(window.adForm.form);
  }
})();
