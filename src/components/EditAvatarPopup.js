import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar }) {
    const inputRef = React.useRef();

    React.useEffect(() => {
        inputRef.current.value = ''
    }, [onClose]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: inputRef.current.value
        });
    }

    return (

        <PopupWithForm
            name='popup-avatar'
            title='Обновить аватар'
            buttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input ref={inputRef} id="url" type="url" name="link" className="popup__input popup-avatar__input_type_link-img" required placeholder="Ссылка на картинку" />
            <span id="url-error" className="popup__input-error"></span>
        </PopupWithForm>

    )
}

export default EditAvatarPopup;