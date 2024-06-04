import React from 'react';

// 'Square' Component: This component represents an individual square on the board 
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      <span className="square-content">{value}</span>
    </button>
  );
}

export default Square;
