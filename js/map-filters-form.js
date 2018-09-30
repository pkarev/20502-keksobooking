'use strict';

(function () {
  var bookingType;
  var bookingPrice;
  var bookingRooms;
  var bookingGuests;

  var mapFiltersForm = document.querySelector('.map__filters');

  function getRank(booking) {
    var rank = 0;

    if (booking.type === bookingType) {
      rank += 1;
    }

    if (booking.price === bookingPrice) {
      rank += 1;
    }

    if (booking.rooms === bookingRooms) {
      rank += 1;
    }

    if (booking.rooms === bookingGuests) {
      rank += 1;
    }

    return rank;
  }

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  function updatePins() {
    window.pin.renderPins(window.bookings.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  }

  window.mapFilterForm = {
    updatePins: updatePins,
    form: mapFiltersForm
  };
})();
