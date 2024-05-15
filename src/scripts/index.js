import '../pages/index.css';
import {createCard, deleteCard, likeCard} from '../components/card.js';
import {closeModal, openModal} from '../components/modal.js';
import {clearValidation, enableValidation} from '../components/validation.js';
import {addCard, editUser, getInitialCards, getUser, editAvatar} from '../components/api.js';
import {handleSubmit} from '../components/utils.js';
import {placesList, popupGallery, popupGalleryImage, popupGalleryCaption, popupEditProfile, popupNewCard, popupEditAvatar, editProfileButton, addCardButton, profileImage, profileName, profileJob, formEditProfile, nameInputEditProfile, jobInputEditProfile, formNewCard, nameInputNewCard, linkInputNewCard, formEditAvatar, linkInputEditAvatar, validationConfig} from "./constants.js";

const handleEditProfileFormSubmit = (evt, popup) => {
    function makeRequest() {
        return editUser(nameInputEditProfile.value, jobInputEditProfile.value).then((userData) => {
            profileName.textContent = userData.name;
            profileJob.textContent = userData.about;
            closeModal(popup);
        });
    }
    handleSubmit(makeRequest, evt);
}

const handleEditAvatarFormSubmit = (evt, popup) => {
    function makeRequest() {
        return editAvatar(linkInputEditAvatar.value).then((result) => {
            profileImage.style.backgroundImage = `url(${result.avatar})`;
            closeModal(popup);
        });
    }
    handleSubmit(makeRequest, evt);
}

const handleAddCardFormSubmit = (evt, popup) => {
    function makeRequest() {
        return addCard(nameInputNewCard.value, linkInputNewCard.value).then((result) => {
            renderCard(result, result.owner._id, 'prepend');
            closeModal(popup);
        });
    }
    handleSubmit(makeRequest, evt);
}

const showCard = (card) => {
    const cardImage = card.querySelector('.card__image');
    popupGalleryImage.src = cardImage.src;
    popupGalleryImage.alt = cardImage.alt;
    popupGalleryCaption.textContent = card.querySelector('.card__title').textContent;
    openModal(popupGallery);
}

const renderCard = (initialCard, userId, method = "prepend") => {
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
    openModal(popupNewCard);
});

profileImage.addEventListener('click', () => {
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
            renderCard(initialCard, userData._id, 'append');
        });
    })
    .catch((err) => {
        console.log(err);
    });


enableValidation(validationConfig);