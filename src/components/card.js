const cardTemplate = '#card-template';

const fillTemplateCard = (initialCard) => {
    const cardTemplateElement = document.querySelector(cardTemplate).content;
    const cardElement = cardTemplateElement.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = initialCard.link;
    cardImage.alt = `Фотография места ${initialCard.name}`;
    cardElement.querySelector('.card__title').textContent = initialCard.name;
    return cardElement;
}

const deleteCard = (card) => {
    card.remove();
}

const likeCard = (card) => {
    card.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
}

const createCard = (initialCard, deleteCard, likeCard, showCard) => {
    const cardElement = fillTemplateCard(initialCard);
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardElement));
    cardElement.querySelector('.card__image').addEventListener('click', () => showCard(cardElement));
    cardElement.querySelector('.card__like-button').addEventListener('click', () => likeCard(cardElement));
    return cardElement;
}

export {createCard, deleteCard, likeCard}