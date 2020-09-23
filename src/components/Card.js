import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    function handleCardClick() {
        onCardClick(card)
    }

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `elements__remove-button ${isOwn ? 'elements__remove-button_visible' : 'elements__remove-button_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    //const cardLikeButtonClassName = `...`;

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (

        <div id="element">
            <div className="elements__card">
                <button type="button" className={`elements__remove-button ${cardDeleteButtonClassName}`} onClick={handleDeleteClick}></button>

                <img src={card.link} alt={card.name} onClick={handleCardClick} className="elements__card-image" />

                <div className="elements__card-description">
                    <p className="elements__card-name">{card.name}</p>
                    <div className="elements__like-container">
                        <button type="button" className={`elements__card-icon ${isLiked && 'elements__card-icon_active'}`} onClick={handleLikeClick}></button>
                        <p className="elements__like-count">{card.likes.length}</p>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Card;