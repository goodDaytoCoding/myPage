import React from 'react';
import '../../Board.css';

const Board = ({ isOpenBoard }) => {
  return (
    <div className={`board ${isOpenBoard ? 'open' : ''}`}>
      <h1>This is the white panel</h1>
    </div>
  );
};

export default Board;
