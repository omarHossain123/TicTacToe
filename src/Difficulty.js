import React from 'react';

// Difficulty Component: Renders buttons to select the difficulty level for single-player mode
function Difficulty({ onSelectDifficulty }) {
  return (
    <div className="difficulty">
      <h1>Select Difficulty Level</h1>
      <button onClick={() => onSelectDifficulty('easy')}>Easy</button>
      <button onClick={() => onSelectDifficulty('medium')}>Medium</button>
      <button onClick={() => onSelectDifficulty('hard')}>Hard</button>
    </div>
  );
}

export default Difficulty;
