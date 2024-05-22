/* this class creates a modal dialog that displays a message indicating the winner of the game.*/
import { useState } from 'react';
import './Modal.css';
export default Modal; 

// This component will display the winner message as a big pop up
function Modal({winner, onClose}){
  return(
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h1>{winner} WON!</h1>
      </div>
    </div>
  );
}

