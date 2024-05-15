const showInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settings) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorText);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
}

const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, settings);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(settings.inactiveButtonClass);
    }
}

const disableButton = (buttonElement, settings) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
}

const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);

    formElement.addEventListener('reset', () => {
        disableButton(buttonElement, settings)
    });

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
    });
};

const clearValidation = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, settings);
    });
    toggleButtonState(inputList, buttonElement, settings);
};

export {enableValidation, clearValidation};