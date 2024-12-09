import React, { useState, useEffect } from 'react';
import Card from './Card';

function GameBoard() {
  // these are the game cards
  const initialCards = [
    { id: 1, value: '/CardImages/ace.png', isFlipped: false, isMatched: false },
    { id: 2, value: '/CardImages/ace.png', isFlipped: false, isMatched: false },
    { id: 3, value: '/CardImages/2.png', isFlipped: false, isMatched: false },
    { id: 4, value: '/CardImages/2.png', isFlipped: false, isMatched: false },
    { id: 5, value: '/CardImages/3.png', isFlipped: false, isMatched: false },
    { id: 6, value: '/CardImages/3.png', isFlipped: false, isMatched: false },
    { id: 7, value: '/CardImages/4.png', isFlipped: false, isMatched: false },
    { id: 8, value: '/CardImages/4.png', isFlipped: false, isMatched: false },
    { id: 9, value: '/CardImages/5.png', isFlipped: false, isMatched: false },
    { id: 10, value: '/CardImages/5.png', isFlipped: false, isMatched: false },
    { id: 11, value: '/CardImages/6.png', isFlipped: false, isMatched: false },
    { id: 12, value: '/CardImages/6.png', isFlipped: false, isMatched: false },
  ];
  //introduce the variables
  const [cards, setCards] = useState(shuffleArray(initialCards));
  const [flippedCards, setFlippedCards] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [attemptCounter, setAttemptCounter] = useState(0);
  const [matchCounter, setMatchCounter] = useState(0);
  const [message, setMessage] = useState('');
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  //timer
  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } 
    else if (!isTimerRunning && time !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, time]);
  
  //function to shuffle the cards
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  //function to handle the card click
  function handleCardClick(clickedCard) {
    if (flippedCards.length === 2 || isProcessing || clickedCard.isFlipped || clickedCard.isMatched) {
      return;
    }
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }
    //flip the card
    const newCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    //add the flipped card to the flipped cards array
    const newFlippedCards = [...flippedCards, clickedCard];
    //update the state
    setCards(newCards);
    setFlippedCards(newFlippedCards);

    //check if the flipped cards are a match
    if (newFlippedCards.length === 2) {
      setAttemptCounter(prevCounter => prevCounter + 1);
      const [firstCard, secondCard] = newFlippedCards;
      if (firstCard.value === secondCard.value) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.value === firstCard.value ? { ...card, isMatched: true } : card
          )
        );
        setFlippedCards([]);
        setMatchCounter(prevCounter => {
          const newMatchCounter = prevCounter + 1;
          if (newMatchCounter === 6) {
            setMessage("You've won!");
            setIsTimerRunning(false);
          }
          return newMatchCounter;
        });
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
  //function to reset the games variables
  function resetGame() {
    setCards(shuffleArray(initialCards.map(card => ({ ...card, isFlipped: false, isMatched: false }))));
    setFlippedCards([]);
    setIsProcessing(false);
    setAttemptCounter(0);
    setMatchCounter(0);
    setMessage('');
    setTime(0);
    setIsTimerRunning(false);
  }
  return (
    <div className="game-container">
      <button onClick={resetGame}>Reset Game</button>
      <div>Time: {time} seconds</div>
      <div>Attempts: {attemptCounter}</div>
      <div>Matches: {matchCounter}</div>
      {message && <div className="message-box">{message}</div>}
      <div className="game-board">
        {cards.map(card => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default GameBoard;