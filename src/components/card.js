const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

const fillTemplateCard = (initialCard) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = initialCard.link;
    cardImage.alt = `Фотография места ${initialCard.name}`;
    cardElement.querySelector('.card__title').textContent = initialCard.name;
    return cardElement;
}

const deleteCard = (card) => {
    card.remove();
}

const likeCard = (likeButton) => {
    likeButton.classList.toggle('card__like-button_is-active');
}

const createCard = (initialCard, callbacks) => {
    const cardElement = fillTemplateCard(initialCard);
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardElement.querySelector('.card__delete-button').addEventListener('click', () => callbacks.deleteCard(cardElement));
    cardElement.querySelector('.card__image').addEventListener('click', () => callbacks.showCard(cardElement));
    cardLikeButton.addEventListener('click', () => callbacks.likeCard(cardLikeButton));
    return cardElement;
}

export {createCard, deleteCard, likeCard}