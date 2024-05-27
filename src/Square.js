import React from 'react';

// 'Square' Component: This component represents an individual square on the board 
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square; 
