// App.js
import React, { useState } from 'react';
import Intro from './Intro';
import Difficulty from './Difficulty';
import Game from './Game';
import Modal from './Modal'; 

function App() {
  const [gameMode, setGameMode] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState('light');

  function handleStartGame(mode) {
    if (mode === 'single') {
      setGameMode('difficulty');
    } else {
      setGameMode('multi');
    }
  }

  function handleSelectDifficulty(level) {
    setDifficulty(level);
    setGameMode('single');
  }

  function handleMainMenu() {
    setGameMode(null);
    setDifficulty(null);
    setWinner(null);
    setShowModal(false);
  }

  function handleGameEnd(winner) {
    setWinner(winner);
    setShowModal(true);
  }

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div className={`app ${theme}`}>
      <button className="theme-switcher" onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      {showModal && <Modal winner={winner} onClose={() => setShowModal(false)} onRestart={() => setGameMode(gameMode)} onMainMenu={handleMainMenu} />}
      {gameMode === 'difficulty' && <Difficulty onSelectDifficulty={handleSelectDifficulty} />}
      {gameMode === 'single' && <Game mode={gameMode} difficulty={difficulty} onMainMenu={handleMainMenu} />}
      {gameMode === 'multi' && <Game mode={gameMode} onMainMenu={handleMainMenu} />}
      {!gameMode && <Intro onStartGame={handleStartGame} />}
    </div>
  );
}

export default App;
