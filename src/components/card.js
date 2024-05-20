import {changeLikeStatus, deleteCardApi} from "./api";
import {openModal, closeModal} from "./modal";
import {cardTemplate, popupDeleteCard} from "../scripts/constants";

let cardForDelete = null;
let cardIdForDelete = null;

const fillTemplateCard = (initialCard) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = initialCard.link;
    cardImage.alt = `Фотография места ${initialCard.name}`;
    cardElement.querySelector('.card__title').textContent = initialCard.name;
    return cardElement;
}

const confirmDeleteCard = () => {
    if (cardForDelete && cardIdForDelete) {
        deleteCardApi(cardIdForDelete)
            .then(() => {
                cardForDelete.remove();
                closeModal(popupDeleteCard);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

const deleteCard = (card, cardId) => {
    cardForDelete = card;
    cardIdForDelete = cardId;
    openModal(popupDeleteCard);
}

const likeCard = (likeButton, cardId) => {
    changeLikeStatus(cardId, likeButton.classList.contains('card__like-button_is-active'))
        .then((result) => {
            likeButton.classList.toggle('card__like-button_is-active');
            likeButton.nextElementSibling.textContent = result.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
}

const createCard = (initialCard, callbacks, userId) => {
    const cardElement = fillTemplateCard(initialCard, userId);
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');
    const likeButtonState = cardElement.querySelector('.card__like-button');

    if (initialCard.owner._id !== userId) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener('click', () => callbacks.deleteCard(cardElement, initialCard._id));
    }

    initialCard.likes.forEach((like) => {
        if (like._id === userId) {
            likeButtonState.classList.add('card__like-button_is-active');
        }
    });
    likeCounter.textContent = initialCard.likes.length;

    cardElement.querySelector('.card__image').addEventListener('click', () => callbacks.showCard(cardElement));
    cardLikeButton.addEventListener('click', () => callbacks.likeCard(cardLikeButton, initialCard._id));
    return cardElement;
}

export {createCard, deleteCard, likeCard, confirmDeleteCard}