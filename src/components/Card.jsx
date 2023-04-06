import React from "react";

export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="card">
      <img className="card__image" onClick={handleClick} src={props.card.link} alt="картинка из карточки" />
      <div className="card__description">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-info">
          <button className="card__like-button" type="button"></button>
          <p className="card__counter">{props.card.likes.length}</p>
        </div>
      </div>
      <button className="card__delete-button" type="button"></button>
    </div>
  )
}