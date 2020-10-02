import React from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';




function EditProfilePopup({ onClose, isOpen, onUpdateUser, buttonText }) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const [isValid, setIsValid] = React.useState({ name: false, about: false })
    const [validationMessage, setIsValidationMessage] = React.useState({ name: "", about: "" })

    function handleInputNameChange(event) {
        const { name, value } = event.target
        setName(value);
        setIsValid({
            ...isValid,
            [name]: event.target.validity.valid
        })
        setIsValidationMessage({
            ...validationMessage,
            [name]: event.target.validationMessage
        })
    }

    function handleInputDescriptionChange(event) {
        const { name, value } = event.target
        setDescription(value);
        setIsValid({
            ...isValid,
            [name]: event.target.validity.valid
        })
        setIsValidationMessage({
            ...validationMessage,
            [name]: event.target.validationMessage
        })
    }

    const isSubmitDisabled = Object.values(isValid).every(Boolean)

    React.useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
        setIsValid({ name: true, about: true })
    }, [isOpen, currentUser]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: name,
            about: description
        });
    }


    return (

        <PopupWithForm
            name='popup-profile'
            title='Редактировать профиль'
            buttonText={buttonText}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input onChange={handleInputNameChange}
                value={name} id="name-input" type="text" name="name"
                className={`popup__input popup__input_type_name ${!isValid.name && 'popup__input_type_error'}`}
                required placeholder="Имя" minLength="2" maxLength="40" />
            <span id="name-input-error"
                className={`popup__input-error ${!isValid.name && 'popup__input-error_active'}`}>
                {validationMessage.name}</span>
            <input onChange={handleInputDescriptionChange}
                value={description} id="job-input" type="text" name="about"
                className={`popup__input popup__input_type_job ${!isValid.about && 'popup__input_type_error'}`}
                required placeholder="Профессия" minLength="2" maxLength="200" />
            <span id="job-input-error"
                className={`popup__input-error ${!isValid.about && 'popup__input-error_active'}`}>
                {validationMessage.about}</span>
            <button type="submit" className={`popup__button ${!isSubmitDisabled && 'popup__button_inactive'}`}
                disabled={!isSubmitDisabled}>{buttonText}</button>
        </PopupWithForm>



    )
}

export default EditProfilePopup;