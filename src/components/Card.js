import React from 'react';

function Card({ card, onCardClick }) {

    function handleCardClick() {
        onCardClick(card)
    }

    return (

        <div id="element">
            <div className="elements__card">
                <button type="button" className="elements__remove-button"></button>
                <img src={card.link} alt={card.name} onClick={handleCardClick} className="elements__card-image" />

                <div className="elements__card-description">
                    <p className="elements__card-name">{card.name}</p>
                    <div className="elements__like-container">
                        <button type="button" className="elements__card-icon"></button>
                        <p className="elements__like-count">0</p>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Card;