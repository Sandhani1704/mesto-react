import React from 'react';

function PopupWithForm({ name, title, buttonText, children, isOpen }) {
    return (

    <section className={`popup {name} ${isOpen && 'popup_opened'}`}> 
        <div className="popup__overlay popup-profile__overlay"></div>
        <div className="popup__container">
            <button type="button" className="popup__close"><img className="popup__close-icon" src="./images/Close_Icon.svg" alt="закрыть" /></button>
            <h3 className="popup__title">{title}</h3>
            <form className={`popup__form popup__form_${name}`} name={name} noValidate>
            {children}
                <button type="submit" className="popup__button" disabled>{buttonText}</button>
            </form>
        </div>

    </section>
      /*<>
        <section className="popup popup-profile">
        <div className="popup__overlay popup-profile__overlay"></div>
        <div className="popup__container">
            <button type="button" className="popup__close"><img className="popup__close-icon" src="./images/Close_Icon.svg" alt="закрыть" /></button>
            <h3 className="popup__title">Редактировать профиль</h3>
            <form className="popup__form popup__form_edit-profile" name="profile" novalidate>
                <input id="name-input" type="text" name="userName" className="popup__input popup__input_type_name" required placeholder="Имя" minlength="2" maxlength="40" />
                <span id="name-input-error" className="popup__input-error"></span>
                <input id="job-input" type="text" name="userJob" className="popup__input popup__input_type_job" required placeholder="Профессия" minlength="2" maxlength="200" />
                <span id="job-input-error" className="popup__input-error"></span>
                <button type="submit" className="popup__button" disabled>Сохранить</button>
            </form>
        </div>

    </section>

    <section className="popup popup-element">
        <div className="popup__overlay popup-element__overlay"></div>
        <div className="popup__container popup-element__container">
            <button type="button" className="popup__close popup-element__close"><img className="popup__close-icon popup-element__close-icon" src="./images/Close_Icon.svg" alt="закрыть" /></button>
            <h3 className="popup__title popup-element__title">Новое место</h3>
            <form className="popup__form popup-element__form" name="new-element" novalidate>
                <input id="title-input" type="text" name="name" className="popup__input popup-element__input_type_title" required placeholder="Название" minlength="1" maxlength="30" />
                <span id="title-input-error" className="popup__input-error"></span>
                <input id="url-input" type="url" name="link" className="popup__input popup-element__input_type_link-img" required placeholder="Ссылка на картинку" />
                <span id="url-input-error" className="popup__input-error"></span>
                <button type="submit" className="popup__button popup-element__button" disabled>Создать</button>
            </form>
        </div>
    </section>

<section className="popup popup-avatar">
<div className="popup__overlay popup-avatar__overlay"></div>
<div className="popup__container popup-avatar__container">
    <button type="button" className="popup__close popup-avatar__close"><img className="popup__close-icon popup-avatar__close-icon" src="./images/Close_Icon.svg" alt="закрыть" /></button>
    <h3 className="popup__title popup-avatar__title">Обновить аватар</h3>
    <form className="popup__form popup-avatar__form" name="new-avatar" novalidate>
        <input id="url" type="url" name="link" className="popup__input popup-avatar__input_type_link-img" required placeholder="Ссылка на картинку" />
        <span id="url-error" className="popup__input-error"></span>
        <button type="submit" className="popup__button popup-avatar__button" disabled>Сохранить</button>
    </form>
</div>
</section>


<section className="popup popup-delete">
<div className="popup__overlay popup-delete__overlay"></div>
<div className="popup__container popup-delete__container">
    <button type="button" className="popup__close popup-delete__close"><img className="popup__close-icon popup-delete__close-icon" src="./images/Close_Icon.svg" alt="закрыть" /></button>
    <h3 className="popup__title popup-delete__title">Вы уверены?</h3>
    <form className="popup__form popup-delete__form">
        <button type="submit" className="popup__button popup-delete__button">Да</button>
    </form>
</div>
</section>
  
</>  */    
    );
  }
  
  export default PopupWithForm;