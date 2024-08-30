import React, { useCallback, useState } from 'react';

import { Canvas } from '@react-three/fiber';

import CubeScene from './CubeComp';
import EdgesScene from './EdgesComp';
import StarsScene from './StarsComp';
import Board from './Board';

import '../../lib/styles/CubeBackground.css';
import '../../lib/styles/Board.css';

const CubeBackground = () => {
  const [rotationSpeed, setRotationSpeed] = useState(0.005);
  const [isOpenBoard, setIsOpenBoard] = useState(false);

  const getNextPage = useCallback((faceIndex) => {
    setIsOpenBoard(true);
  }, []);

  const changeRotationSpeed = (speed) => {
    return setRotationSpeed(speed);
  };

  return (
    <div className={`cube-background ${isOpenBoard ? 'board-open' : ''}`}>
      <div className="cube-container">
        <Canvas camera={{ position: [10, 10, 10] }}>
          <CubeScene
            rotationSpeed={rotationSpeed}
            changeRotationSpeed={changeRotationSpeed}
            getNextPage={getNextPage}
          />
          <EdgesScene rotationSpeed={rotationSpeed} />
          <StarsScene
            numStars={300}
            spreadRange={300}
            color={'white'}
            size={2}
          />
        </Canvas>
      </div>
      <div className="board-container">
        <Board isOpenBoard={isOpenBoard} />
      </div>
    </div>
  );
};

export default CubeBackground;
