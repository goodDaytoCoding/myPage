import React, { useCallback, useEffect, useState } from 'react';

import { Canvas } from '@react-three/fiber';

import BoardComp from './BoardComp';
import CubeScene from './CubeComp';
// import EdgesScene from './EdgesComp';
// import StarsScene from './StarsComp';

import '../../lib/styles/CubeBackground.css';
import '../../lib/styles/Board.css';

const CubeBackground = () => {
  const [rotationSpeed, setRotationSpeed] = useState(0.005);
  const [boardIndex, setBoardIndex] = useState(null);
  const [isNarrowScreen, setIsNarrowScreen] = useState(window.innerWidth < 860);

  const getBoardIndex = useCallback((index) => {
    setBoardIndex(index);
  }, []);

  const changeRotationSpeed = (speed) => {
    return setRotationSpeed(speed);
  };

  const closeBoard = useCallback(() => {
    setBoardIndex(null);
  }, []);

  const handleResize = () => {
    setIsNarrowScreen(window.innerWidth < 860);
  };

  useEffect(() => {
    let timeoutId;

    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        window.dispatchEvent(new Event('resize')); // Canvas 리사이즈
      }, 200); // 200ms 동안 리사이즈 이벤트 발생을 제한
    };

    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
          {/* <EdgesScene rotationSpeed={rotationSpeed} />
          <StarsScene
            numStars={1000}
            spreadRange={300}
            color={'white'}
            size={2}
          /> */}
        </Canvas>
      </div>
      <BoardComp
        className="board-container"
        boardIndex={boardIndex}
        closeBoard={closeBoard}
        isNarrowScreen={isNarrowScreen}
      />
    </div>
  );
};

export default CubeBackground;
