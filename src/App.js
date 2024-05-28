import React, { useState } from 'react';
import Intro from './Intro';
import Difficulty from './Difficulty';
import Game from './Game';

function App() {
  const [gameMode, setGameMode] = useState(null);
  const [difficulty, setDifficulty] = useState(null);

  // Function to handle starting the game with the selected mode
  function handleStartGame(mode) {
    if (mode === 'single') {
      setGameMode('difficulty');
    } else {
      setGameMode('multi');
    }
  }

  // Function to handle selecting the difficulty level
  function handleSelectDifficulty(level) {
    setDifficulty(level);
    setGameMode('single');
  }

  // Function to handle returning to the main menu
  function handleMainMenu() {
    setGameMode(null);
    setDifficulty(null);
  }

  return (
    <div className="app">
      {/* Conditional rendering: show the appropriate screen based on gameMode */}
      {gameMode === 'difficulty' && <Difficulty onSelectDifficulty={handleSelectDifficulty} />}
      {gameMode === 'single' && <Game mode={gameMode} difficulty={difficulty} onMainMenu={handleMainMenu} />}
      {gameMode === 'multi' && <Game mode={gameMode} onMainMenu={handleMainMenu} />}
      {!gameMode && <Intro onStartGame={handleStartGame} />}
    </div>
  );
}

export default App;
