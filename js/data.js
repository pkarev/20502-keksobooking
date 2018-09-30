'use strict';

(function () {
  window.backend.load(onGetBookingsSuccess, window.error.onGetBookingsError);

  function onGetBookingsSuccess(response) {
    window.bookings = response;
    console.log(window.bookings);
  }
})();
