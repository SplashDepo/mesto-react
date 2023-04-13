import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { apiConnect } from "../utils/Api";

function App() {
  const [isEditProfilePopupOpen, openProfilePopup] = useState(false)
  const [isAddPlacePopupOpen, openPlacePopup] = useState(false)
  const [isEditAvatarPopupOpen, openAvatarPopup] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [imagePopup, openImagePopup] = useState(false);
  const [currentUser, setUserInfo] = useState({})
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([apiConnect.getInitialCards(), apiConnect.getUserData()])
      .then(([initialCards, userData]) => {
        setUserInfo(userData)
        setCards(initialCards)
      })
      .catch(err => console.log(`Возникла ошибка ${err}`))
  }, [])

  function hendelUpdateUser(user) {
    apiConnect.sendUserData(user.name, user.about)
      .then(res => {
        setUserInfo(res)
        closeAllPopups()
      })
  }

  function handelUpdateAvatar(link) {
    apiConnect.sendAvatarData(link)
      .then(res => {
        setUserInfo(res)
        closeAllPopups()
      })
  }

  function handelAddCard(card) {
    apiConnect.addCard(card.name, card.link)
      .then(card => {
        setCards([card, ...cards])
        closeAllPopups()
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    apiConnect.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
  }

  function handleCardDelete(card) {
    apiConnect.deleteCard(card._id)
      .then(() => {
        setCards(cardsArr => cardsArr.filter(cardItem => cardItem._id !== card._id))
      })
  }

  function hendelCardClick(card) {
    openImagePopup(true)
    setSelectedCard({ name: card.name, link: card.link })
  }

  function handleEditAvatarClick() {
    openAvatarPopup(true)
  }

  function handleEditProfileClick() {
    openProfilePopup(true)
  }

  function handleAddPlaceClick() {
    openPlacePopup(true)
  }

  function closeAllPopups(e) {
    openAvatarPopup(false)
    openProfilePopup(false)
    openPlacePopup(false)
    openImagePopup(false)
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={hendelCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards} />

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={hendelUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handelUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handelAddCard} />



        <PopupWithForm name="delete" title="Удалить изображение" buttonText="Да" />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} isOpen={imagePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
