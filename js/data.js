'use strict';

(function () {

  window.data = {
    offerTypes: {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Бунгало',
      bungalo: 'Дом'
    }
  };

  window.backend.load(onGetBookingsSuccess, window.error.onGetBookingsError);

  function onGetBookingsSuccess(response) {
    window.data.bookings = response;
  }
})();
