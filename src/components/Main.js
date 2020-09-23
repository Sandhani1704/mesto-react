import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';
import VectorButton from '../images/Vector_1.png';
import VectorButtonAdd from '../images/Vector.png';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, initialCards }) {

    //const [userName, setUserName] = React.useState('');
    //const [userDescription, setUserDescription] = React.useState('');
    //const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    const currentUser = React.useContext(CurrentUserContext);


    /* React.useEffect(() => {
         Promise.all([api.getUserInfo(), api.getInitialCards()])
             .then(([userInfo, initialCards]) => {
                 setUserName(userInfo.name);
                 setUserDescription(userInfo.about);
                 setUserAvatar(userInfo.avatar);
                 setCards(initialCards);
             })
             .catch((error) => console.log('Ошибка запроса - ' + error))
 
     }, []);*/

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.putLike(card._id, !isLiked).then((newCard) => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            // Обновляем стейт
            setCards(newCards);
        });
    }

    const handleCardDelete = (card) => {

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.deleteCard(card)
            .then(() => {
                const newCards = cards.filter((item) => item._id !== card);
                setCards(newCards);
            })
            .catch(err => console.error(err))
    }

    React.useEffect(() => {
        api.getInitialCards()
            .then((initialCards) => {

                setCards(initialCards);
            })
            .catch((error) => console.log('Ошибка запроса - ' + error))

    }, []);

    return (


        <main className="content">

            <section className="profile">
                <div className="profile__image-container">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                    <button onClick={onEditAvatar} className="profile__avatar-button" type="button"></button>
                </div>
                <div className="profile__info">
                    <div className="profile__title">
                        <h1 className="profile__user">{currentUser.name}</h1>
                        <button onClick={onEditProfile} type="button" className="profile__button-edit"><img className="profile__button-pic" src={VectorButton} alt="Редактировать" /></button>
                    </div>
                    <p className="profile__user-explorer">{currentUser.about}</p>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__button-add"><img className="profile__button-vector" src={VectorButtonAdd} alt="Добавить" /></button>
            </section>

            <section className="elements">

                {cards.map((card) => (
                    <Card key={card._id}
                        onCardClick={onCardClick}
                        card={card}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />

                ))}

            </section>

        </main>

    );
}



export default Main;