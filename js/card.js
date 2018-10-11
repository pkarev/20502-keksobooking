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
    cardElement.querySelector('.popup__title').textContent = cardParams.offer.title;
    cardElement.querySelector('.popup__text--price').textContent = cardParams.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = offerTypes[cardParams.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = cardParams.offer.rooms + ' комнаты для ' + cardParams.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardParams.offer.checkin + ', выезд до ' + cardParams.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = cardParams.offer.description;
    cardElement.querySelector('.popup__avatar').src = cardParams.author.avatar;

    var cardPhotosContainer = cardElement.querySelector('.popup__photos');
    var photoElementTemplate = cardElement.querySelector('.popup__photo');
    var photoFragment = document.createDocumentFragment();

    for (var i = 0; i < cardParams.offer.photos.length; i++) {
      var photo = photoElementTemplate.cloneNode(true);
      photo.src = cardParams.offer.photos[i];
      photoFragment.appendChild(photo);
    }

    cardPhotosContainer.innerHTML = '';
    cardPhotosContainer.appendChild(photoFragment);

    var cardFeaturesContainer = cardElement.querySelector('.popup__features');
    var featureElementTemplate = cardElement.querySelector('.popup__feature');
    featureElementTemplate.classList = 'popup__feature';

    var featuresFragment = document.createDocumentFragment();
    var featuresArray = cardParams.offer.features;

    for (var j = 0; j < featuresArray.length; j++) {
      var feature = featureElementTemplate.cloneNode(true);
      var featureClass = 'popup__feature--' + featuresArray[j];
      feature.classList.add(featureClass);
      featuresFragment.appendChild(feature);
    }

    cardFeaturesContainer.innerHTML = '';
    cardFeaturesContainer.appendChild(featuresFragment);

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

    mapCard.style.display = 'none';
  }

  window.card = {
    createCardElement: createCardElement,
    renderMapCard: renderMapCard,
    closeMapCard: closeMapCard
  };
})();
