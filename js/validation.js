'use strict';

(function () {
  var MIN_DAILY_PRICE_BUNGALO = 0;
  var MIN_DAILY_PRICE_FLAT = 1000;
  var MIN_DAILY_PRICE_HOUSE = 5000;
  var MIN_DAILY_PRICE_PALACE = 10000;
  var accommodationTypeSelect = document.querySelector('#type');
  var accommodationPriceInput = document.querySelector('#price');
  var accommodationCheckInSelect = document.querySelector('#timein');
  var accommodationCheckOutSelect = document.querySelector('#timeout');
  var accommodationRoomsNumber = document.querySelector('#room_number');
  var accommodationGuestsNumber = document.querySelector('#capacity');

  accommodationTypeSelect.addEventListener('change', function (evt) {
    var type = evt.target.value;
    switch (type) {
      case 'bungalo':
        setAccomodationMinPrice(MIN_DAILY_PRICE_BUNGALO);
        break;
      case 'flat':
        setAccomodationMinPrice(MIN_DAILY_PRICE_FLAT);
        break;
      case 'house':
        setAccomodationMinPrice(MIN_DAILY_PRICE_HOUSE);
        break;
      case 'palace':
        setAccomodationMinPrice(MIN_DAILY_PRICE_PALACE);
        break;
      default:
        break;
    }
  });

  accommodationCheckInSelect.addEventListener('change', function (evt) {
    var checkIn = evt.target.value;
    accommodationCheckOutSelect.querySelector('[value="' + checkIn + '"]').selected = true;
  });

  accommodationCheckOutSelect.addEventListener('change', function (evt) {
    var checkOut = evt.target.value;
    accommodationCheckInSelect.querySelector('[value="' + checkOut + '"]').selected = true;
  });

  var DISABLED_GUESTS_OPTIONS_PER_ROOM_NUMBER = {
    1: [2, 3, 0],
    2: [3, 0],
    3: [0],
    100: [1, 2, 3],
  };

  accommodationRoomsNumber.addEventListener('input', function () {
    setAvailableGuestsOptions();
  });

  function setAccomodationMinPrice(price) {
    accommodationPriceInput.setAttribute('min', price);
    accommodationPriceInput.setAttribute('placeholder', price);
  }

  function setAvailableGuestsOptions() {
    var rooms = accommodationRoomsNumber.value;
    var disabledGuestsValues = DISABLED_GUESTS_OPTIONS_PER_ROOM_NUMBER[rooms];
    [].forEach.call(accommodationGuestsNumber.options, function (item) {
      if (disabledGuestsValues.indexOf(Number(item.value)) !== -1) {
        item.disabled = true;
      } else {
        item.disabled = false;
      }
    });

    if (accommodationGuestsNumber.options[accommodationGuestsNumber.selectedIndex].disabled) {
      accommodationGuestsNumber.setCustomValidity('Недопустимое количество гостей. Выбирите доступное значение из списка');
    }
  }

  window.setAvailableGuestsOptions = setAvailableGuestsOptions;
})();
