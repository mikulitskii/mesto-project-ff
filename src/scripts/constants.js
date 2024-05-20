const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
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
const popupDeleteCard = document.querySelector('.popup_type_delete-card');
const popupDeleteButton = popupDeleteCard.querySelector('.popup__button');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export {placesList, cardTemplate, popupGallery, popupGalleryImage, popupGalleryCaption, popupEditProfile, popupNewCard, popupEditAvatar, editProfileButton, addCardButton, profileImage, profileName, profileJob, formEditProfile, nameInputEditProfile, jobInputEditProfile, formNewCard, nameInputNewCard, linkInputNewCard, formEditAvatar, linkInputEditAvatar, popupDeleteCard, popupDeleteButton, validationConfig};