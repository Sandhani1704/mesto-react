import { Card } from '../components/Сard.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import './index.css';


const popup = document.querySelector('.popup-profile');
const popupOpenButton = document.querySelector('.profile__button-edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const popupElementAddButton = document.querySelector('.profile__button-add');
const popupElement = document.querySelector('.popup-element');
const popupEditProfileSelector = '.popup-profile';
const avatarProfileSelector = '.profile__avatar';
const popupAvatarProfileSelector = '.popup-avatar';
const avatarFormButton = document.querySelector('.profile__avatar-button');
const avatarImage = document.querySelector('.profile__avatar');
const popupAvatarElement = document.querySelector('.popup-avatar');

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const openPopupWithImage = '.popup-image';
const containerCardElementsSelector = '.elements';
const popupAddPlaceSelector = '.popup-element';
const profileNameSelector = '.profile__user';
const profileJobSelector = '.profile__user-explorer';

// Создание экземпляра класса с подтверждением удаления карточки
const popupConfirm = new PopupWithConfirm('.popup-delete');
popupConfirm.setEventListeners();

//открываем попап с изображением
const popupPicImage = new PopupWithImage(openPopupWithImage);
popupPicImage.setEventListeners();

// Создание экземпляра класса с информацией о пользователе
const userProfile = new UserInfo({
    userNameSelector: profileNameSelector,
    userJobSelector: profileJobSelector, userAvatar: avatarProfileSelector
});
//const userId = userProfile.getUserId();

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
        'Content-Type': 'application/json',
        authorization: '401963c2-8e67-4398-84ba-2d7df4f163fe'
    }
});

api.getUserInfo()
    .then((result) => {
        userProfile.setUserInfo(result.name, result.about, result._id);

    })

const globalHandleCardClick = (data) => {
    popupPicImage.open(data)
}
const globalHandleLikeCardClick = (card) => {
    if (card.isLiked()) {
        api.removeLike(card.id())
            .then((data) => {
                card.setLikesInfo(data)
            })
    } else {
        api.putLike(card.id())
            .then((data) => {
                card.setLikesInfo(data)
            })
    }
}
const globalHandleDeleteCardClick = (card) => {
    popupConfirm.open();
    popupConfirm.handleButton(() => {
        api.deleteCard(card.id())
            .then((data) => {
                card.deleteElement(data)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupConfirm.close();
            })
    })
}

api.getInitialCards()
    .then((result) => {
        const initialCardList = new Section({
            //items: initialCards,
            items: result,
            renderer: (item) => {  // { name, link } //функция, которая отвечает за создание и отрисовку данных на странице
                const card = new Card({
                    data: item,
                    handleCardClick: globalHandleCardClick,
                    handleLikeClick: globalHandleLikeCardClick,
                    handleDeleteButtonClick: globalHandleDeleteCardClick
                }, userProfile.getUserId(), '#element');
                const cardElement = card.generateCard();
                initialCardList.setItem(cardElement);

            },
        },
            containerCardElementsSelector
        );
        initialCardList.renderItems();//подгружаем начальный массив с фотографиямиnp

        //cоздаем попап добавления фотографий
        const popupAddPlace = new PopupWithForm({
            handleFormSubmit: (item) => {
                popupAddPlace.loading(true);
                api.addCard(item)
                    .then((item) => {

                        const card = new Card({
                            data: item,
                            handleCardClick: globalHandleCardClick,
                            handleLikeClick: globalHandleLikeCardClick,
                            handleDeleteButtonClick: globalHandleDeleteCardClick
                        }, userProfile.getUserId(), '#element');
                        const cardElement = card.generateCard();
                        initialCardList.addItem(cardElement);

                    })
                    .catch((error) => console.error(error))
                    .finally(() => {
                        popupAddPlace.loading(false);
                        popupAddPlace.close();
                    })
            }
        }, popupAddPlaceSelector);

        //слушатель попапа добавления фотографий
        popupAddPlace.setEventListeners();
        popupElementAddButton.addEventListener('click', () => {

            popupElementValidator.openPopupAndHideErrors();

            popupAddPlace.open();

        });
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });

// создаем попап редактирования профиля
const popupEditProfile = new PopupWithForm({
    handleFormSubmit: ({ userJob, userName }) => {
        popupEditProfile.loading(true);
        api.setUserInfo({
            name: userName,
            about: userJob
        })
            .then((result) => {
                userProfile.setUserInfo(result.name, result.about)

            })
            .catch((error) => console.error(error))
            .finally(() => {
                popupEditProfile.loading(false);
                popupEditProfile.close();
            })
    }
}, popupEditProfileSelector)

popupEditProfile.setEventListeners();

// создаем попап изменения аватара профиля
const popupAvatar = new PopupWithForm({
    handleFormSubmit: ({ link }) => {
        popupAvatar.loading(true);
        api.setUserAvatar({ avatar: link })
            .then((res) => {

                avatarImage.src = res.avatar;
            })
            .catch(err => console.log(err))
            .finally(() => {
                popupAvatar.loading(false);
                popupAvatar.close();
            })
    }
}, popupAvatarProfileSelector)

popupAvatar.setEventListeners();

api.getUserInfo()
    .then((result) => {
        userProfile.setUserAvatar(result.avatar);
    })

const popupProfileValidator = new FormValidator(config, popup);
const popupElementValidator = new FormValidator(config, popupElement);
const popupAvatarValidator = new FormValidator(config, popupAvatarElement);
popupElementValidator.enableValidation();
popupProfileValidator.enableValidation();
popupAvatarValidator.enableValidation();

popupOpenButton.addEventListener('click', () => {
    const profileInfo = userProfile.getUserInfo();

    nameInput.value = profileInfo.name;
    jobInput.value = profileInfo.job;

    popupProfileValidator.openPopupAndHideErrors();
    popupEditProfile.open()

});

avatarFormButton.addEventListener('click', () => {
    popupAvatar.open();

})






