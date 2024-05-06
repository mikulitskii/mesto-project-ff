const closePopupHandler = (evt) => {
    if (evt.key === 'Escape' || evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
};

const openModal = (popup) => {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closePopupHandler);
    document.addEventListener('keyup', closePopupHandler);
}

const closeModal = (popup) => {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closePopupHandler);
    document.removeEventListener('keyup', closePopupHandler);
}

export {openModal, closeModal};