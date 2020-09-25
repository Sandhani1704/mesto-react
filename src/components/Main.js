import React from 'react';
//import { api } from '../utils/Api';
import Card from './Card';
import VectorButton from '../images/Vector_1.png';
import VectorButtonAdd from '../images/Vector.png';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);


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
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />

                ))}

            </section>

        </main>

    );
}



export default Main;