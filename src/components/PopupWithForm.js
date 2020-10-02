import React from 'react';
import closeIcon from '../images/Close_Icon.svg';

function PopupWithForm({ name, title, children, isOpen, onClose, onSubmit }) {
    return (

        <section className={`popup ${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__overlay popup-profile__overlay"></div>
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={onClose}><img className="popup__close-icon" src={closeIcon} alt="закрыть" /></button>
                <h3 className="popup__title">{title}</h3>
                <form className={`popup__form popup__form_${name}`} name={name} noValidate onSubmit={onSubmit}>
                    {children}
                    
                </form>
            </div>

        </section>

    );
}

export default PopupWithForm;
