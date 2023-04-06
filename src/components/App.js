import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, openProfilePopup] = useState(false)
  const [isAddPlacePopupOpen, openPlacePopup] = useState(false)
  const [isEditAvatarPopupOpen, openAvatarPopup] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [imagePopup, openImagePopup] = useState(false);


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
    <div className="page">
      <Header />

      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick} onCardClick={hendelCardClick} />

      <Footer />

      <PopupWithForm name="edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input className="popup__input popup__input_type_name" id="input-name" name="name" type="text" minLength="2"
          maxLength="40" required />
        <span className="input-name-error popup__error"></span>
        <input className="popup__input popup__input_type_description" id="input-description" name="description" type="text" minLength="2" maxLength="200" required />
        <span className="input-description-error popup__error"></span>
      </PopupWithForm>

      <PopupWithForm name="card" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
        <input className="popup__input popup__input_type_name" id="input-title" name="title" type="text"
          placeholder="Название" minLength="2" maxLength="30" required />
        <span className="input-title-error popup__error"></span>
        <input className="popup__input popup__input_type_description" id="input-link" name="link" type="url"
          placeholder="Ссылка на картинку" required />
        <span className="input-link-error popup__error"></span>
      </PopupWithForm>

      <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
        <input className="popup__input popup__input_type_link" id="input-avatar" name="avatar" type="url"
          placeholder="Ссылка на картинку" required />
        <span className="input-avatar-error popup__error"></span>
      </PopupWithForm>

      <PopupWithForm name="delete" title="Удалить изображение" buttonText="Да" />
      <PopupWithImage onClose={closeAllPopups} card={selectedCard} isOpen={imagePopup} />
    </div>
  );
}

export default App;
