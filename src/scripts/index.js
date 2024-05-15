const placesList = document.querySelector('.places__list');
const popupGallery = document.querySelector('.popup_type_image');
const popupGalleryImage = popupGallery.querySelector('.popup__image');
const popupGalleryCaption = popupGallery.querySelector('.popup__caption');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInputEditProfile = formEditProfile.querySelector('.popup__input_type_name');
const jobInputEditProfile = formEditProfile.querySelector('.popup__input_type_description');
const formNewCard = popupNewCard.querySelector('.popup__form');
const nameInputNewCard = formNewCard.querySelector('.popup__input_type_card-name');
const linkInputNewCard = formNewCard.querySelector('.popup__input_type_url');
const formEditAvatar = popupEditAvatar.querySelector('.popup__form');
const linkInputEditAvatar = formEditAvatar.querySelector('.popup__input_type_avatar-link');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

import '../pages/index.css';
import {createCard, deleteCard, likeCard} from '../components/card.js';
import {closeModal, openModal} from '../components/modal.js';
import {clearValidation, enableValidation} from '../components/validation.js';
import {addCard, editUser, getInitialCards, getUser, editAvatar} from '../components/api.js';

const handleEditProfileFormSubmit = (evt, popup) => {
    handleFormSubmit(evt, popup);
    editUser(nameInputEditProfile.value, jobInputEditProfile.value)
        .then((result) => {
            profileName.textContent = result.name;
            profileJob.textContent = result.about;
            closeModal(popup);
        })
        .catch((err) => {
            console.log(err);
        });
}

const handleEditAvatarFormSubmit = (evt, popup) => {
    handleFormSubmit(evt, popup);
    editAvatar(linkInputEditAvatar.value)
        .then((result) => {
            profileImage.style.backgroundImage = `url(${result.avatar})`;
            closeModal(popup);
        })
        .catch((err) => {
            console.log(err);
        });
}

const handleAddCardFormSubmit = (evt, popup) => {
    handleFormSubmit(evt, popup);
    addCard(nameInputNewCard.value, linkInputNewCard.value)
        .then((result) => {
            renderCard(result, 'prepend', result.owner._id);
            evt.target.reset();
            closeModal(popup);
        })
        .catch((err) => {
            console.log(err);
        });
}

const handleFormSubmit = (evt, popup) => {
    evt.preventDefault();
    popup.querySelector('.popup__button').textContent = 'Сохранение...';
}

const showCard = (card) => {
    const cardImage = card.querySelector('.card__image');
    popupGalleryImage.src = cardImage.src;
    popupGalleryImage.alt = cardImage.alt;
    popupGalleryCaption.textContent = card.querySelector('.card__title').textContent;
    openModal(popupGallery);
}

const renderCard = (initialCard, method = "prepend", userId) => {
    const cardElement = createCard(initialCard, {deleteCard, likeCard, showCard}, userId);

    placesList[method](cardElement);
}

editProfileButton.addEventListener('click', () => {
    nameInputEditProfile.value = profileName.textContent;
    jobInputEditProfile.value = profileJob.textContent;
    clearValidation(formEditProfile, validationConfig);
    openModal(popupEditProfile);
});
addCardButton.addEventListener('click', () => {
    clearValidation(formNewCard, validationConfig);
    openModal(popupNewCard);
});

profileImage.addEventListener('click', () => {
    clearValidation(formEditAvatar, validationConfig);
    openModal(popupEditAvatar);
});

formEditProfile.addEventListener('submit', (evt) => handleEditProfileFormSubmit(evt, popupEditProfile));
formNewCard.addEventListener('submit', (evt) => handleAddCardFormSubmit(evt, popupNewCard));
formEditAvatar.addEventListener('submit', (evt) => handleEditAvatarFormSubmit(evt, popupEditAvatar));

Promise.all([getInitialCards(), getUser()])
    .then((result) => {
        const [initialCards, userData] = result;
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
        profileName.textContent = userData.name;
        profileJob.textContent = userData.about;
        Array.from(initialCards).forEach((initialCard) => {
            renderCard(initialCard, 'append', userData._id);
        });
    })
    .catch((err) => {
        console.log(err);
    });


enableValidation(validationConfig);