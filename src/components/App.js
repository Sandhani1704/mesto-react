import React from 'react';
import { api } from '../utils/Api'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
//import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  //const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  //const [selectedCard, setSelectedCard] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [currentUser, setСurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);


  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setСurrentUser(userInfo)
        setCards(initialCards);
      })
      .catch((error) => console.log('Ошибка запроса - ' + error))

  }, []);

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about })
      .then((userInfo) => {
        setСurrentUser(userInfo);
      })
      .catch(err => console.error(err))

    closeAllPopups()
  }

  function handleUpdateAvatar({ avatar }) {
    api.setUserAvatar({ avatar })
      .then((userInfo) => {
        setСurrentUser(userInfo);
      })
      .catch(err => console.error(err))

    closeAllPopups()
  }


  function handleCardLike(card) {

    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.putLike(card._id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
      .catch(err => console.error(err));

    api.removeLike(card._id, isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
      .catch(err => console.error(err));
  }


  const handleCardDelete = () => {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(selectedCard._id)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== selectedCard._id);
        setCards(newCards);
      })
      .catch((error) => console.log('Ошибка удаления карточки : ', error))
    closeAllPopups();
  }

  function handleAddPlaceSubmit({ name, link, alt }) {
    api.addCard({ name, link, alt })
      .then((newCard) => {
        setCards([...cards, newCard]);
      })
      .catch((error) => console.log('Ошибка запроса - ' + error))

    closeAllPopups();
  }


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  /* const handleCardClick = (card) => {
     setSelectedCard(card);
     setIsImagePopupOpen(true);
   }*/

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    // setIsImagePopupOpen(false);
    // setSelectedCard({});
    setSelectedCard(false);
    setIsConfirmPopupOpen(false)
  }

  const handleCardConfirm = (card) => {
    setSelectedCard(card);
    setIsConfirmPopupOpen(true);
  }


  return (

    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        {currentUser && cards && <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          //onCardClick={handleCardClick}
          onCardClick={setSelectedCard}
          cards={cards}
          onCardLike={handleCardLike}
          //onCardDelete={handleCardDelete}
          onCardDelete={handleCardConfirm}

        />}

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCards={handleAddPlaceSubmit} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup
          card={selectedCard}
          //isOpen={isImagePopupOpen}
          onClose={closeAllPopups} />

        <ConfirmPopup
          onConfirm={handleCardDelete}
          onClose={closeAllPopups}
          isOpen={isConfirmPopupOpen}

        />
      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
