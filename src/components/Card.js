import React from 'react';

// Card component to represent each card in the game
function Card({ card, onClick }) {
  return (
    <div className="card" onClick={() => onClick(card)}>
      {/* Display the card value if it is flipped, otherwise display 'X' */}
      {card.isFlipped ? <img src={card.value} alt="card" /> : <img src='/CardImages/backside.png' alt="card" />}
    </div>
  );
}



export default Card;