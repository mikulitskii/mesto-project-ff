const placesList = document.querySelector('.places__list');
const popupGallery = document.querySelector('.popup_type_image');
const popupGalleryImage = popupGallery.querySelector('.popup__image');
const popupGalleryCaption = popupGallery.querySelector('.popup__caption');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInputEditProfile = formEditProfile.querySelector('.popup__input_type_name');
const jobInputEditProfile = formEditProfile.querySelector('.popup__input_type_description');
const formNewCard = popupNewCard.querySelector('.popup__form');
const nameInputNewCard = formNewCard.querySelector('.popup__input_type_card-name');
const linkInputNewCard = formNewCard.querySelector('.popup__input_type_url');

import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, deleteCard, likeCard} from '../components/card.js';
import {openModal, closeModal} from '../components/modal.js';

const handleEditProfileFormSubmit = (evt, popup) => {
    profileName.textContent = nameInputEditProfile.value;
    profileJob.textContent = jobInputEditProfile.value;
    handleFormSubmit(evt, popup);
}

const handleAddCardFormSubmit = (evt, popup) => {
    const newCard = {name: nameInputNewCard.value, link: linkInputNewCard.value};
    renderCard(newCard, 'prepend');
    evt.target.reset();
    handleFormSubmit(evt, popup);
}

const handleFormSubmit = (evt, popup) => {
    evt.preventDefault();
    closeModal(popup);
}

const showCard = (card) => {
    const cardImage = card.querySelector('.card__image');
    popupGalleryImage.src = cardImage.src;
    popupGalleryImage.alt = cardImage.alt;
    popupGalleryCaption.textContent = card.querySelector('.card__title').textContent;
    openModal(popupGallery);
}

const renderCard = (initialCard, method = "prepend") => {
    const cardElement = createCard(initialCard, {deleteCard, likeCard, showCard});

    placesList[ method ](cardElement);
}

initialCards.forEach((initialCard) => {
    renderCard(initialCard, 'append');
});

editProfileButton.addEventListener('click', () => {
    nameInputEditProfile.value = profileName.textContent;
    jobInputEditProfile.value = profileJob.textContent;
    openModal(popupEditProfile);
});
addCardButton.addEventListener('click', () => {
    openModal(popupNewCard);
});

formEditProfile.addEventListener('submit', (evt) => handleEditProfileFormSubmit(evt, popupEditProfile));
formNewCard.addEventListener('submit', (evt) => handleAddCardFormSubmit(evt, popupNewCard));