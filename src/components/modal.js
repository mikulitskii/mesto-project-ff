const handlePopupClose = (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
        closeModal(evt.currentTarget);
    }
};

const handleEscape = (evt) => {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
};

const openModal = (popup) => {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', handlePopupClose);
    document.addEventListener('keyup', handleEscape);
}

const closeModal = (popup) => {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', handlePopupClose);
    document.removeEventListener('keyup', handleEscape);
}

export {openModal, closeModal};