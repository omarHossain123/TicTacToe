import React, { useEffect, useState } from 'react';
import Board from './Board'; 
import Modal from './Modal'; 
import calculateWinner from './calculateWinner'; 

// Game Component: Manages the overall state and history of the game
export default function Game({ mode, onMainMenu }) {
  // State variables to manage game history, current move, winner, and modal visibility
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState(null);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // useEffect to handle computer's move in single player mode
  useEffect(() => {
    if (mode === 'single' && !xIsNext && !winner) {
      const nextSquares = makeComputerMove(currentSquares);
      handlePlay(nextSquares);
    }
  }, [currentSquares, mode, xIsNext, winner]);

  // useEffect to handle computer's move after undo in single player mode
  useEffect(() => {
    if (mode === 'single' && !xIsNext && currentMove < history.length - 1 && !winner) {
      const nextSquares = makeComputerMove(history[currentMove]);
      handlePlay(nextSquares);
    }
  }, [currentMove, history, mode, xIsNext, winner]);

  // Function to handle player's move and check for winner
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const winner = calculateWinner(nextSquares);
    if (winner) {
      setWinner(winner);
      setShowModal(true);
    } else if (!nextSquares.includes(null)) {
      setWinner('Draw');
      setShowModal(true);
    }
  }

  // Function to make a random move for the computer
  function makeComputerMove(squares) {
    const availableSquares = squares.map((square, index) => square === null ? index : null).filter(index => index !== null);
    const randomIndex = Math.floor(Math.random() * availableSquares.length);
    const nextSquares = squares.slice();
    nextSquares[availableSquares[randomIndex]] = 'O';
    return nextSquares;
  }

  // Function to handle undo move
  function undoMove() {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
    }
    if (mode === 'single' && currentMove > 0 && currentMove % 2 === 0) {
      setCurrentMove(currentMove - 2);
    }
  }

  // Function to close modal
  function closeModal() {
    setShowModal(false);
  }

  // Function to restart the game
  function restartGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setWinner(null);
    setShowModal(false);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={undoMove}>Undo</button>
      </div>
      {showModal && 
        <Modal 
          winner={winner} 
          onClose={closeModal} 
          onRestart={restartGame} 
          onMainMenu={onMainMenu} 
        />
      }
    </div>
  );
}
