import React, { useCallback, useState } from 'react';

import { Canvas } from '@react-three/fiber';

import Board from './Board';
import CubeScene from './CubeComp';
import EdgesScene from './EdgesComp';
import StarsScene from './StarsComp';

import '../../lib/styles/CubeBackground.css';
import '../../lib/styles/Board.css';

const CubeBackground = () => {
  const [rotationSpeed, setRotationSpeed] = useState(0.005);
  const [boardIndex, setBoardIndex] = useState(null);

  const getBoardIndex = useCallback((index) => {
    setBoardIndex(index);
  }, []);

  const changeRotationSpeed = (speed) => {
    return setRotationSpeed(speed);
  };

  const closeBoard = useCallback(() => {
    setBoardIndex(null);
  }, []);

  return (
    <div
      className={`cube-background ${boardIndex !== null ? 'board-open' : ''}`}
    >
      <div className="cube-container">
        <Canvas camera={{ position: [10, 10, 10] }}>
          <CubeScene
            rotationSpeed={rotationSpeed}
            changeRotationSpeed={changeRotationSpeed}
            getBoardIndex={getBoardIndex}
          />
          <EdgesScene rotationSpeed={rotationSpeed} />
          <StarsScene
            numStars={1000}
            spreadRange={300}
            color={'white'}
            size={2}
          />
        </Canvas>
      </div>
      <div className="board-container">
        <Board boardIndex={boardIndex} closeBoard={closeBoard} />
      </div>
    </div>
  );
};

export default CubeBackground;
