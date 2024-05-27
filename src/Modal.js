import React from 'react';
import './Modal.css';

// Modal component that displays the winner message
function Modal({ winner, onClose, onRestart, onMainMenu }) {  
  let message;
  if (winner === 'Draw') {
    message = 'Draw';
  } else {
    message = `${winner} WON!`;
  }

  function handleRestart() {
    onRestart(); // Call the onRestart function passed as prop
    onClose(); // Close the modal after restarting the game
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{message}</h2>
        <button onClick={handleRestart}>Restart</button>
        <button onClick={onMainMenu}>Main Menu</button> {/* Use onMainMenu here */}
      </div>
    </div>
  );
}

export default Modal;
