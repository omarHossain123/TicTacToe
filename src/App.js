import React, { useState } from 'react';
import Intro from './Intro';
import Game from './Game'; 

function App() {
  const [gameMode, setGameMode] = useState(null);

  // Function to handle starting the game with the selected mode
  function handleStartGame(mode) {
    setGameMode(mode);
  }

  // Function to handle returning to the main menu
  function handleMainMenu() {
    setGameMode(null);
  }

  return (
    <div className="app">
      {/* Conditional rendering: show either the Game component or the Intro component */}
      {gameMode && <Game mode={gameMode} onMainMenu={handleMainMenu} />}
      {!gameMode && <Intro onStartGame={handleStartGame} />}
    </div>
  );
}

export default App;
