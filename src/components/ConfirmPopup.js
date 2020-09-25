import React from 'react'
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ onConfirm, isOpen, onClose }) {

    const handleSubmit = (event) => {
        event.preventDefault();
        onConfirm();
    }

    return (
        <PopupWithForm name='popup-delete'
            title='Вы уверены?'
            buttonText='Да'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    );
}

export default ConfirmPopup;