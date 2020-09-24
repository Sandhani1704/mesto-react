import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddCards }) {
    const [namePlace, setNamePlace] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setNamePlace('');
        setLink('');
    }, [onClose]);


    function handleInputNamePlaceChange(e) {
        setNamePlace(e.target.value);
    }

    function handleInputLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddCards({
            name: namePlace,
            link: link
        });
    }


    return (
        <PopupWithForm
            name='popup-element'
            title='Новое место'
            buttonText='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input value={namePlace} onChange={handleInputNamePlaceChange} id="title-input" type="text" name="name" className="popup__input popup-element__input_type_title" required placeholder="Название" minLength="1" maxLength="30" />
            <span id="title-input-error" className="popup__input-error"></span>
            <input value={link} onChange={handleInputLinkChange} id="url-input" type="url" name="link" className="popup__input popup-element__input_type_link-img" required placeholder="Ссылка на картинку" />
            <span id="url-input-error" className="popup__input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;