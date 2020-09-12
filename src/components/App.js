import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
//import api from '../utils/Api'


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  //const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }


  return (

    <div className="page">
      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}

      />

      <Footer />

      <PopupWithForm
        name='popup-profile'
        title='Редактировать профиль'
        buttonText='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
        <input id="name-input" type="text" name="userName" className="popup__input popup__input_type_name" required placeholder="Имя" minLength="2" maxLength="40" />
        <span id="name-input-error" className="popup__input-error"></span>
        <input id="job-input" type="text" name="userJob" className="popup__input popup__input_type_job" required placeholder="Профессия" minLength="2" maxLength="200" />
        <span id="job-input-error" className="popup__input-error"></span>

      </PopupWithForm>

      <PopupWithForm
        name='popup-element'
        title='Новое место'
        buttonText='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}><input id="title-input" type="text" name="name" className="popup__input popup-element__input_type_title" required placeholder="Название" minLength="1" maxLength="30" />
        <span id="title-input-error" className="popup__input-error"></span>
        <input id="url-input" type="url" name="link" className="popup__input popup-element__input_type_link-img" required placeholder="Ссылка на картинку" />
        <span id="url-input-error" className="popup__input-error"></span>
      </PopupWithForm>



      <PopupWithForm
        name='popup-avatar'
        title='Обновить аватар'
        buttonText='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
        <input id="url" type="url" name="link" className="popup__input popup-avatar__input_type_link-img" required placeholder="Ссылка на картинку" />
        <span id="url-error" className="popup__input-error"></span>
      </PopupWithForm>





      <ImagePopup />









    </div>
  );
}

export default App;
