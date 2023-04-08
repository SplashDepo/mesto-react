import React from "react";

export default function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="card">
      <img className="card__image" onClick={handleClick} src={card.link} alt={card.name} />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-info">
          <button className="card__like-button" type="button"></button>
          <p className="card__counter">{card.likes.length}</p>
        </div>
      </div>
      <button className="card__delete-button" type="button"></button>
    </div>
  )
}