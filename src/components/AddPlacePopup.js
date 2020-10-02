import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddCards, buttonText }) {

    const [inputValue, setInputValue] = React.useState({ name: "", link: "" })
    const [isValid, setIsValid] = React.useState({ name: false, link: false })
    const [validationMessage, setIsValidationMessage] = React.useState({ name: "", link: "" })


    function handleInputChange(event) {
        const { name, value } = event.target
        setInputValue({
            ...inputValue,
            [name]: value
        })
        setIsValid({
            ...isValid,
            [name]: event.target.validity.valid
        })
        setIsValidationMessage({
            ...validationMessage,
            [name]: event.target.validationMessage
        })

    }

    React.useEffect(() => {
        setInputValue({ name: "", link: "" });
        setIsValidationMessage({ name: "", link: "" })
        setIsValid({ name: false, link: false })

    }, [isOpen])

    const isSubmitDisabled = Object.values(isValid).every(Boolean)

    function handleSubmit(e) {
        e.preventDefault();

        onAddCards({
            name: inputValue.name,
            link: inputValue.link
        });
    }


    return (
        <PopupWithForm
            name='popup-element'
            title='Новое место'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input value={inputValue.name}
                onChange={handleInputChange}
                id="title-input" type="text" name="name"
                className={`popup__input popup-element__input_type_title ${!isValid.name && 'popup__input_type_error'}`}
                required minLength="1" maxLength="30"
                placeholder="Название" />
            <span id="title-input-error"
                className={`popup__input-error ${!isValid.name && 'popup__input-error_active'}`}
            >
                {validationMessage.name}
            </span>
            <input value={inputValue.link}
                onChange={handleInputChange}
                id="url-input"
                type="url" name="link"
                className={`popup__input popup-element__input_type_link-img ${!isValid.link && 'popup__input_type_error'}`}
                required
                placeholder="Ссылка на картинку" />
            <span id="url-input-error"
                className={`popup__input-error ${!isValid.link && 'popup__input-error_active'}`}>
                {validationMessage.link}
            </span>
            <button type="submit" className={`popup__button ${!isSubmitDisabled && 'popup__button_inactive'}`} disabled={!isSubmitDisabled}>{buttonText}</button>

        </PopupWithForm>
    )
}

export default AddPlacePopup;