import React from 'react'
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ onConfirm, isOpen, onClose, buttonText }) {

    const handleSubmit = (event) => {
        event.preventDefault();
        onConfirm();
    }

    return (
        <PopupWithForm name='popup-delete'
            title='Вы уверены?'
            buttonText={buttonText}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
        <button type="submit" className="popup__button">{buttonText}</button>
        </PopupWithForm>
    );
}

export default ConfirmPopup;