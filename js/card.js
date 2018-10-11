'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapCard;
  var isMapCardRendered = false;
  var offerTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  function createCardElement(cardParams) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    var cardTitle = cardElement.querySelector('.popup__title');
    var cardPrice = cardElement.querySelector('.popup__text--price');
    var cardType = cardElement.querySelector('.popup__type');
    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    var cardTime = cardElement.querySelector('.popup__text--time');
    var cardDescription = cardElement.querySelector('.popup__description');
    var cardAvatar = cardElement.querySelector('.popup__avatar');

    printCardParam(cardTitle, cardParams.offer.title, 'textContent');
    printCardParam(cardPrice, cardParams.offer.price, 'textContent', cardParams.offer.price + ' ₽/ночь');
    printCardParam(cardType, offerTypes[cardParams.offer.type], 'textContent');
    printCardParam(cardCapacity, cardParams.offer.rooms, 'textContent', cardParams.offer.rooms + ' комнаты для ' + cardParams.offer.guests + ' гостей');
    printCardParam(cardTime, cardParams.offer.checkin, 'textContent', 'Заезд после ' + cardParams.offer.checkin + ', выезд до ' + cardParams.offer.checkout);
    printCardParam(cardDescription, cardParams.offer.description, 'textContent');
    printCardParam(cardAvatar, cardParams.author.avatar, 'src');

    var cardPhotosContainer = cardElement.querySelector('.popup__photos');
    if (cardParams.offer.photos.length > 0) {
      var photoElementTemplate = cardElement.querySelector('.popup__photo');
      var photoFragment = document.createDocumentFragment();

      for (var i = 0; i < cardParams.offer.photos.length; i++) {
        var photo = photoElementTemplate.cloneNode(true);
        photo.src = cardParams.offer.photos[i];
        photoFragment.appendChild(photo);
      }

      cardPhotosContainer.innerHTML = '';
      cardPhotosContainer.appendChild(photoFragment);
    } else {
      cardPhotosContainer.parentNode.removeChild(cardPhotosContainer);
    }

    var cardFeaturesContainer = cardElement.querySelector('.popup__features');
    var featuresArray = cardParams.offer.features;
    if (featuresArray.length.length > 0) {
      var featureElementTemplate = cardElement.querySelector('.popup__feature');
      featureElementTemplate.classList = 'popup__feature';
      var featuresFragment = document.createDocumentFragment();
      for (var j = 0; j < featuresArray.length; j++) {
        var feature = featureElementTemplate.cloneNode(true);
        var featureClass = 'popup__feature--' + featuresArray[j];
        feature.classList.add(featureClass);
        featuresFragment.appendChild(feature);
      }

      cardFeaturesContainer.innerHTML = '';
      cardFeaturesContainer.appendChild(featuresFragment);
    } else {
      cardFeaturesContainer.parentNode.removeChild(cardFeaturesContainer);
    }


    return cardElement;
  }

  function renderMapCard(cardData) {
    if (isMapCardRendered) {
      mapCard.innerHTML = window.card.createCardElement(cardData).innerHTML;
    } else {
      map.appendChild(window.card.createCardElement(cardData));
      mapCard = map.querySelector('.map__card');
      isMapCardRendered = true;
    }

    var popupClose = map.querySelector('.popup__close');
    popupClose.addEventListener('click', closeMapCard);

    mapCard.style.display = 'block';
  }

  function closeMapCard() {
    if (!mapCard) {
      return;
    }

    window.pin.clearPinsActiveClass();
    mapCard.style.display = 'none';
  }

  function printCardParam(element, param, type, paramValue) {
    if (!param) {
      element.parentNode.removeChild(element);
      return;
    }

    if (paramValue) {
      element[type] = paramValue;
    } else {
      element[type] = param;
    }

  }

  window.card = {
    createCardElement: createCardElement,
    renderMapCard: renderMapCard,
    closeMapCard: closeMapCard
  };
})();
