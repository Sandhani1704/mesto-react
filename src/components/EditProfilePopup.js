import React from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';




function EditProfilePopup({ onClose, isOpen, onUpdateUser }) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, onClose]);

    function handleInputNameChange(e) {
        setName(e.target.value);
    }

    function handleInputDescriptionChange(e) {
        setDescription(e.target.value);
    }

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
            buttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input value={name} onChange={handleInputNameChange} id="name-input" type="text" name="userName" className="popup__input popup__input_type_name" required placeholder="Имя" minLength="2" maxLength="40" />
            <span id="name-input-error" className="popup__input-error"></span>
            <input value={description} onChange={handleInputDescriptionChange} id="job-input" type="text" name="userJob" className="popup__input popup__input_type_job" required placeholder="Профессия" minLength="2" maxLength="200" />
            <span id="job-input-error" className="popup__input-error"></span>
        </PopupWithForm>



    )
}

export default EditProfilePopup;