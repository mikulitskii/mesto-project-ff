const cardTemplate = '#card-template';
const placesList = '.places__list';

const fillTemplateCard = function (initialCard) {
    const cardTemplateElement = document.querySelector(cardTemplate).content;
    const cardElement = cardTemplateElement.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = initialCard.link;
    cardElement.querySelector('.card__title').textContent = initialCard.name;
    return cardElement;
}

const createCard = function (initialCard, deleteCard) {
    const cardElement = fillTemplateCard(initialCard);
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    return cardElement;
}

const deleteCard = function (event) {
    const eventTarget = event.target;
    eventTarget.parentElement.remove();
}

initialCards.forEach(function (initialCard) {
    const cardElement= createCard(initialCard, deleteCard);
    document.querySelector(placesList).append(cardElement);
});