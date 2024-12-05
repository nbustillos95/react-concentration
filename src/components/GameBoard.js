import React, { useState } from 'react';
import Card from './Card';

function GameBoard() {
  const initialCards = [
    { id: 1, value: '/CardImages/ace.png', isFlipped: false, isMatched: false },
    { id: 2, value: '/CardImages/ace.png', isFlipped: false, isMatched: false },
    { id: 3, value: '/CardImages/2.png', isFlipped: false, isMatched: false },
    { id: 4, value: '/CardImages/2.png', isFlipped: false, isMatched: false },
    { id: 5, value: '/CardImages/3.png', isFlipped: false, isMatched: false },
    { id: 6, value: '/CardImages/3.png', isFlipped: false, isMatched: false },
    { id: 7, value: '/CardImages/4.png', isFlipped: false, isMatched: false },
    { id: 8, value: '/CardImages/4.png', isFlipped: false, isMatched: false },
    // Add more pairs as needed
  ];

  const [cards, setCards] = useState(shuffleArray(initialCards));
  const [flippedCards, setFlippedCards] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function handleCardClick(clickedCard) {
    if (flippedCards.length === 2 || isProcessing) {
      return;
    }

    const newCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );

    const newFlippedCards = [...flippedCards, clickedCard];

    setCards(newCards);
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards;
      if (firstCard.value === secondCard.value) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.value === firstCard.value ? { ...card, isMatched: true } : card
          )
        );
        setFlippedCards([]);
      } else {
        setIsProcessing(true);
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  }

  // Function to reset the game
  function resetGame() {
    setCards(shuffleArray(initialCards.map(card => ({ ...card, isFlipped: false, isMatched: false }))));
    setFlippedCards([]);
    setIsProcessing(false);
  }

  return (
    <div>
      <button onClick={resetGame}>Reset Game</button>
      <div className="game-board">
        {cards.map(card => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default GameBoard;