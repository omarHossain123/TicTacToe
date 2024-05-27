import React from 'react';

// Intro Component: This component renders the introductory screen where the user can choose 
// between single-player and multiplayer modes.
function Intro({ onStartGame }) {
  return (
    <div className="intro">
      <h1>Welcome to Tic-Tac-Toe</h1>
      <button onClick={() => onStartGame('single')}>Single Player</button>
      <button onClick={() => onStartGame('multi')}>Multi Player</button>
    </div>
  );
}

export default Intro; 
