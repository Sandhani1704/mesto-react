import React from 'react';

function ImagePopup() {
    return (
      
        <section className="popup popup-image">
        <div className="popup__overlay popup-image__overlay"></div>
        <div className="popup-image__cover">
          <img src="#" alt="изображение места" className="popup-image__image" />
          <p className="popup-image__caption"></p>
          <button type="button" className="popup__close popup-image__close-button"><img className="popup__close-icon" src="./images/Close_Icon.svg" alt="закрыть" /></button>
        </div>
    </section>
  
          
    );
  }
  
  export default ImagePopup;