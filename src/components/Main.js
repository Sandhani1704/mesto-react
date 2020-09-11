import React from 'react';
//import App from './App';
import avatarPic from '../images/image.png';
import VectorButton from '../images/Vector_1.png';
import VectorButtonAdd from '../images/Vector.png';





/*document.querySelector('.profile__avatar-button').addEventListener('click', () => {
    handleEditAvatarClick ()
})*/

function Main({onEditAvatar, onEditProfile, onAddPlace}) {
  
    /*const handleEditAvatarClick = () => {
        const popupAvatar = document.querySelector('.popup-avatar')
        popupAvatar.classList.add('popup_opened');
    } */
    
    /*const ButtonAvatar = (props) => {
        <button onClick={props.onClick} className="profile__avatar-button" type="button"></button> 
    }*/
    

    return (
        //<>
      
        <main className="content">

        <section className="profile">
            <div className="profile__image-container">
            <img className="profile__avatar" src={avatarPic} alt="Аватар" />
            <button onClick={onEditAvatar} className="profile__avatar-button" type="button"></button>
        </div>
            <div className="profile__info">
                <div className="profile__title">
                  <h1 className="profile__user">Жак-Ив Кусто</h1>
                  <button onClick={onEditProfile} type="button" className="profile__button-edit"><img className="profile__button-pic" src={VectorButton} alt="Редактировать" /></button>
                </div>
                <p className="profile__user-explorer">Исследователь океана</p>
            </div>
            <button onClick={onAddPlace} type="button" className="profile__button-add"><img className="profile__button-vector" src={VectorButtonAdd} alt="Добавить" /></button>
        </section>
        
        <section className="elements">
                  
        </section>

        </main>

       // <App />
  
        // </> 
    );
    
  }

  
  
  export default Main;