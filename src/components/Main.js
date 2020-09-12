import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';
import VectorButton from '../images/Vector_1.png';
import VectorButtonAdd from '../images/Vector.png';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);


    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userInfo, initialCards]) => {
                setUserName(userInfo.name);
                setUserDescription(userInfo.about);
                setUserAvatar(userInfo.avatar);
                setCards(initialCards);
            })
            .catch((error) => console.log('Ошибка запроса - ' + error))

    }, []);

    return (


        <main className="content">

            <section className="profile">
                <div className="profile__image-container">
                    <img className="profile__avatar" src={userAvatar} alt="Аватар" />
                    <button onClick={onEditAvatar} className="profile__avatar-button" type="button"></button>
                </div>
                <div className="profile__info">
                    <div className="profile__title">
                        <h1 className="profile__user">{userName}</h1>
                        <button onClick={onEditProfile} type="button" className="profile__button-edit"><img className="profile__button-pic" src={VectorButton} alt="Редактировать" /></button>
                    </div>
                    <p className="profile__user-explorer">{userDescription}</p>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__button-add"><img className="profile__button-vector" src={VectorButtonAdd} alt="Добавить" /></button>
            </section>

            <section className="elements">

                {cards.map((card) => (
                    <Card key={card._id}
                        onCardClick={onCardClick}
                        card={card}
                    />

                ))}

            </section>

        </main>

    );
}



export default Main;