import React from 'react';


function Card({ card, onClick }) {
  return (
    <div className="card" onClick={() => onClick(card)}>
      {card.isFlipped ? <img src={card.value} alt="card" /> : <img src='/CardImages/backside.png' alt="card" />}
    </div>
  );
}



export default Card;