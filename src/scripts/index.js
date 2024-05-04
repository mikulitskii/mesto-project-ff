const cardTemplate = '#card-template';
const placesList = document.querySelector('.places__list');

const fillTemplateCard = function (initialCard) {
    const cardTemplateElement = document.querySelector(cardTemplate).content;
    const cardElement = cardTemplateElement.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = initialCard.link;
    cardImage.alt = `Фотография места ${initialCard.name}`;
    cardElement.querySelector('.card__title').textContent = initialCard.name;
    return cardElement;
}

const createCard = function (initialCard, deleteCard) {
    const cardElement = fillTemplateCard(initialCard);
    cardElement.querySelector('.card__delete-button').addEventListener('click',  () => deleteCard(cardElement));
    return cardElement;
}

const deleteCard = function (card) {
    card.remove();
}

initialCards.forEach(function (initialCard) {
    const cardElement= createCard(initialCard, deleteCard);
    placesList.append(cardElement);
});