import React from 'react'
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ onConfirm, buttonTitle, isOpened, onClose }) {

    const handleSubmit = (event) => {
        event.preventDefault();
        onConfirm();
    }

    return (
        <PopupWithForm name='confirm'
            title='Вы уверены?'
            buttonTitle={buttonTitle}
            isOpened={isOpened}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    );
}

export default ConfirmPopup;