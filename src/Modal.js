import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import './Modal.css';

function Modal({ winner, onClose, onRestart, onMainMenu }) {
  const [confetti, setConfetti] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (winner && winner !== 'Draw') {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 5000); // Confetti for 5 seconds
    }
    setShow(true);
  }, [winner]);

  function handleRestart() {
    onRestart();
    setShow(false);
    onClose();
  }

  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      {confetti && <Confetti />}
      <div className="modal-content">
        <span className="close" onClick={() => { setShow(false); onClose(); }}>&times;</span>
        <h2 className="winner-message">{winner === 'Draw' ? 'Draw' : `${winner} WON!`}</h2>
        <div className="modal-buttons">
          <button onClick={handleRestart}>Restart</button>
          <button onClick={onMainMenu}>Main Menu</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
