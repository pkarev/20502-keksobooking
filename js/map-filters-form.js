'use strict';

(function () {
  var housingTypeFilter;
  var housingPriceFilter;
  var housingRoomsFilter;
  var housingGuestsFilter;
  var housingFeaturesFilter = [];
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingTypeSelect = mapFiltersForm.querySelector('#housing-type');
  var housingPriceSelect = mapFiltersForm.querySelector('#housing-price');
  var housingRoomsSelect = mapFiltersForm.querySelector('#housing-rooms');
  var housingGuestsSelect = mapFiltersForm.querySelector('#housing-guests');
  var housingFeatures = mapFiltersForm.querySelector('#housing-features');
  var filteredPins;

  var onHousingTypeChange = window.util.debounce(function (evt) {
    window.card.closeMapCard();
    housingTypeFilter = evt.target.value;
    updatePins();
  });

  var onhousingPriceChange = window.util.debounce(function (evt) {
    window.card.closeMapCard();
    housingPriceFilter = evt.target.value;
    updatePins();
  });

  var onHousingRoomsChange = window.util.debounce(function (evt) {
    window.card.closeMapCard();
    housingRoomsFilter = +evt.target.value;
    updatePins();
  });

  var onHousingGuestsChange = window.util.debounce(function (evt) {
    window.card.closeMapCard();
    housingGuestsFilter = +evt.target.value;
    updatePins();
  });

  var onHousingFeaturesChange = window.util.debounce(function (evt) {
    if (evt.target.checked) {
      housingFeaturesFilter.push(evt.target.value);
    } else {
      housingFeaturesFilter = housingFeaturesFilter.filter(function (item) {
        return item !== evt.target.value;
      });
    }
    window.card.closeMapCard();
    updatePins();
  });

  function trackFieldsChanges() {
    housingTypeSelect.addEventListener('change', onHousingTypeChange);
    housingPriceSelect.addEventListener('change', onhousingPriceChange);
    housingRoomsSelect.addEventListener('change', onHousingRoomsChange);
    housingGuestsSelect.addEventListener('change', onHousingGuestsChange);
    housingFeatures.addEventListener('change', onHousingFeaturesChange);
  }

  function stopTrackingFieldsChanges() {
    housingTypeSelect.removeEventListener('change', onHousingTypeChange);
    housingPriceSelect.removeEventListener('change', onhousingPriceChange);
    housingRoomsSelect.removeEventListener('change', onHousingRoomsChange);
    housingGuestsSelect.removeEventListener('change', onHousingGuestsChange);
    housingFeatures.removeEventListener('change', onHousingFeaturesChange);
  }

  function updatePins() {
    window.map.clearPins();
    filteredPins = applyFilters(window.bookings);
    window.pin.renderPins(filteredPins);
    window.mapFiltersForm.filteredPins = filteredPins;
  }

  function applyFilters(array) {
    var filteredBookings = array.slice();
    filteredBookings = filteredBookings.filter(filterHoustingType);
    filteredBookings = filteredBookings.filter(filterHousingPrice);
    filteredBookings = filteredBookings.filter(filterHousingRooms);
    filteredBookings = filteredBookings.filter(filterGuestsNumber);
    filteredBookings = filteredBookings.filter(filterFeatures);
    return filteredBookings;
  }

  function filterHoustingType(item) {
    if (housingTypeFilter && housingTypeFilter !== 'any') {
      return item.offer.type === housingTypeFilter;
    }

    return item;
  }

  function filterHousingPrice(item) {
    if (housingPriceFilter && housingPriceFilter !== 'any') {
      return getBookingPriceRange(item.offer.price) === housingPriceFilter;
    }

    return item;
  }

  function filterHousingRooms(item) {
    if (housingRoomsFilter && housingRoomsFilter !== 'any') {
      return item.offer.rooms === housingRoomsFilter;
    }

    return item;
  }

  function filterGuestsNumber(item) {
    if (housingGuestsFilter === 0 || housingGuestsFilter && housingGuestsFilter !== 'any') {
      return item.offer.guests === housingGuestsFilter;
    }

    return item;
  }

  function filterFeatures(item) {
    if (housingFeaturesFilter.length) {
      if (item.offer.features.length === 0) {
        return false;
      }

      return isMatchesFeatures(housingFeaturesFilter, item.offer.features);
    }

    return item;
  }

  function getBookingPriceRange(bookingPrice) {
    var priceRange = null;
    if (bookingPrice < 10000) {
      priceRange = 'low';
      return priceRange;
    }
    if (bookingPrice >= 10000 && bookingPrice <= 50000) {
      priceRange = 'middle';
      return priceRange;
    }
    if (bookingPrice > 50000) {
      priceRange = 'high';
      return priceRange;
    }

    return priceRange;
  }

  function isMatchesFeatures(lookingFeatures, bookingFeatures) {
    var isMatches = true;
    lookingFeatures.forEach(function (feature) {
      if (bookingFeatures.indexOf(feature) === -1) {
        isMatches = false;
      }
    });

    return isMatches;
  }

  function resetMapFilters() {
    mapFiltersForm.reset();
    housingTypeFilter = null;
    housingPriceFilter = null;
    housingRoomsFilter = null;
    housingGuestsFilter = null;
    housingFeaturesFilter = [];
    window.util.disableForm(mapFiltersForm);
  }

  window.mapFiltersForm = {
    updatePins: updatePins,
    form: mapFiltersForm,
    filteredPins: filteredPins,
    trackFieldChanges: trackFieldsChanges,
    stopTrackingFieldsChanges: stopTrackingFieldsChanges,
    reset: resetMapFilters
  };
})();
