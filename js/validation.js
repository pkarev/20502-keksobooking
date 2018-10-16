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

  var roomsToAvailableGuests = {
    1: ['для 1 гостя'],
    2: ['для 2 гостей', 'для 1 гостя'],
    3: ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
    100: ['не для гостей']
  };

  function turnOnValidation() {
    accommodationTypeSelect.addEventListener('change', setPriceForRoomType);
    accommodationCheckInSelect.addEventListener('change', setCheckoutForCheckin);
    accommodationCheckOutSelect.addEventListener('change', setCheckinForCheckout);
    accommodationRoomsNumber.addEventListener('input', setGuestsForRooms);
    accommodationGuestsNumber.addEventListener('input', updateGuestsCustomValidity);
  }

  function turnOffValidation() {
    accommodationTypeSelect.removeEventListener('change', setPriceForRoomType);
    accommodationCheckInSelect.removeEventListener('change', setCheckoutForCheckin);
    accommodationCheckOutSelect.removeEventListener('change', setCheckinForCheckout);
    accommodationRoomsNumber.removeEventListener('input', setGuestsForRooms);
    accommodationGuestsNumber.removeEventListener('input', updateGuestsCustomValidity);
  }

  function setPriceForRoomType(evt) {
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
  }

  function setCheckoutForCheckin(evt) {
    var checkIn = evt.target.value;
    accommodationCheckOutSelect.querySelector('[value="' + checkIn + '"]').selected = true;
  }

  function setCheckinForCheckout(evt) {
    var checkOut = evt.target.value;
    accommodationCheckInSelect.querySelector('[value="' + checkOut + '"]').selected = true;
  }

  function setAccomodationMinPrice(price) {
    accommodationPriceInput.setAttribute('min', price);
    accommodationPriceInput.setAttribute('placeholder', price);
  }

  function setGuestsForRooms() {
    var rooms = accommodationRoomsNumber.value;
    var availableGuestsOptions = roomsToAvailableGuests[rooms];
    [].forEach.call(accommodationGuestsNumber.options, function (item) {
      if (availableGuestsOptions.indexOf(item.text) === -1) {
        item.disabled = true;
      } else {
        item.disabled = false;
      }
    });

    updateGuestsCustomValidity();
  }

  function updateGuestsCustomValidity() {
    if (accommodationGuestsNumber.options[accommodationGuestsNumber.selectedIndex].disabled) {
      accommodationGuestsNumber.setCustomValidity('Недопустимое количество гостей. Выбирите доступное значение из списка');
    } else {
      accommodationGuestsNumber.setCustomValidity('');
    }
  }

  window.validation = {
    turnOnValidation: turnOnValidation,
    turnOffValidation: turnOffValidation,
    setGuestsForRooms: setGuestsForRooms
  };

})();
