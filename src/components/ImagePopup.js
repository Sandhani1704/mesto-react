import React from 'react';
import closeIcon from '../images/Close_Icon.svg';

function ImagePopup({ onClose, card, isOpen }) {

  return (

    <section className={`popup popup-image ${isOpen && 'popup_opened'}`} >
      <div className="popup__overlay popup-image__overlay"></div>
      <div className="popup-image__cover">
        <img src={card.link} alt={card.name} className="popup-image__image" />
        <p className="popup-image__caption">{card.name}</p>
        <button onClick={onClose} type="button" className="popup__close popup-image__close-button"><img className="popup__close-icon" src={closeIcon} alt="закрыть" /></button>
      </div>
    </section>


  );
}

export default ImagePopup;