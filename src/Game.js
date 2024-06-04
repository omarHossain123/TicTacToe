import React, { useEffect, useState } from 'react';
import Board from './Board'; 
import Modal from './Modal'; 
import calculateWinner from './calculateWinner'; 

// Game Component: Manages the overall state and history of the game
export default function Game({ mode, difficulty, onMainMenu }) {
  // State variables to manage game history, current move, winner, modal visibility, and timer
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null); 
  const [timer, setTimer] = useState(null); 

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // useEffect to handle computer's move in single player mode
  useEffect(() => {
    if (mode === 'single' && !xIsNext && !winner) {
      const nextSquares = makeComputerMove(currentSquares, difficulty);
      handlePlay(nextSquares);
    }
  }, [currentSquares, mode, xIsNext, winner, difficulty]);

  // useEffect to handle computer's move after undo in single player mode
  useEffect(() => {
    if (mode === 'single' && !xIsNext && currentMove < history.length - 1 && !winner) {
      const nextSquares = makeComputerMove(history[currentMove], difficulty);
      handlePlay(nextSquares);
    }
  }, [currentMove, history, mode, xIsNext, winner, difficulty]);

  // useEffect to start and update the timer for both single and multiplayer modes
  useEffect(() => {
    if ((mode === 'single' && xIsNext && !winner) || (mode === 'multi' && !winner)) {
      // Set initial time limit
      let initialTime;
      if (mode === 'single') {
        if (difficulty === 'easy') {
          initialTime = 15;
        } else if (difficulty === 'medium') {
          initialTime = 10;
        } else {
          initialTime = 5;
        }
      } else {
        initialTime = 10;
      }
      setRemainingTime(initialTime);
  
      const timerInterval = setInterval(() => {
        setRemainingTime(prevTime => {
          let newTime = prevTime - 1;
          if (newTime === 0) {
            clearInterval(timerInterval);
            handlePlayTimeout();
          }
          return newTime;
        });
      }, 1000);
  
      setTimer(timerInterval);
  
      // Cleanup interval on component unmount
      return () => clearInterval(timerInterval);
    }
  }, [currentMove, mode, difficulty, winner, xIsNext]);

  // Cleanup timer interval on winner change or mode change
  useEffect(() => {
    if (winner || (mode !== 'single' && mode !== 'multi') || (mode === 'single' && !xIsNext)) {
      clearInterval(timer);
    }
  }, [winner, mode, xIsNext]);

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

    clearInterval(timer);
  }

  // Function to make a move for the computer based on the selected difficulty
  function makeComputerMove(squares, difficulty) {
    const availableSquares = squares.map((square, index) => square === null ? index : null).filter(index => index !== null);
  
    let nextSquares;
  
    if (difficulty === 'easy') {
      // Easy: Random move
      const randomIndex = Math.floor(Math.random() * availableSquares.length);
      nextSquares = squares.slice();
      nextSquares[availableSquares[randomIndex]] = 'O';
    } else {
      if (difficulty === 'medium') {
        // Medium: Try to block opponent's winning move, otherwise random move
        nextSquares = squares.slice();
        const winningMove = findWinningMove(nextSquares, 'X');
        if (winningMove !== null) {
          nextSquares[winningMove] = 'O';
        } else {
          const randomIndex = Math.floor(Math.random() * availableSquares.length);
          nextSquares[availableSquares[randomIndex]] = 'O';
        }
      } else {
        // Hard: Try to win or block opponent's winning move, otherwise random move
        nextSquares = squares.slice();
        const winningMove = findWinningMove(nextSquares, 'O');
        const blockingMove = findWinningMove(nextSquares, 'X');
        if (winningMove !== null) {
          nextSquares[winningMove] = 'O';
        } else if (blockingMove !== null) {
          nextSquares[blockingMove] = 'O';
        } else {
          const randomIndex = Math.floor(Math.random() * availableSquares.length);
          nextSquares[availableSquares[randomIndex]] = 'O';
        }
      }
    }
  
    return nextSquares;
  }

  // Function to find a winning move for the given player
  function findWinningMove(squares, player) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = player;
        if (calculateWinner(squares) === player) {
          squares[i] = null;
          return i;
        }
        squares[i] = null;
      }
    }
    return null;
  }

  // Function to handle the timeout for the player's move
  function handlePlayTimeout() {
    const availableSquares = [];
    for (let index = 0; index < currentSquares.length; index++) {
      if (currentSquares[index] === null) {
        availableSquares.push(index);
      }
    }
  
    if (availableSquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableSquares.length);
      const nextSquares = currentSquares.slice();
      nextSquares[availableSquares[randomIndex]] = xIsNext ? 'X' : 'O';
      handlePlay(nextSquares);
    }
  }

  // Function to handle undo move
  function undoMove() {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
    }
    if (mode === 'single' && currentMove > 0 && currentMove % 2 === 0) {
      setCurrentMove(currentMove - 2);
    }
    setRemainingTime(null); // Reset the timer when undoing
    clearInterval(timer);
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
    setRemainingTime(null); // Reset the timer when restarting the game
    clearInterval(timer);
  }

  return (
    <div className="game">
      <div className="game-buttons">
        <button onClick={restartGame}>Restart</button>
        <button onClick={onMainMenu}>Main Menu</button>
      </div>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={undoMove}>Undo</button>
        {/* Display the remaining time in both single and multiplayer modes */}
        {((mode === 'single' && xIsNext) || mode === 'multi') && !winner && (
          <div>Time Remaining: {remainingTime}s</div>
        )}
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
