import React, { useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';

import CubeScene from './CubeComp';
import EdgesScene from './EdgesComp';
import Stars2 from './Stars2';
import Board from './Board';
import '../../CubeBackground.css';

const CubeBackground = () => {
  const [rotationSpeed, setRotationSpeed] = useState(0.005);
  const [isOpenBoard, setIsOpenBoard] = useState(false);

  // 특정 faceIndex에서만 패널을 열도록 할 수도 있음
  const getNextPage = useCallback((faceIndex) => {
    setIsOpenBoard(true);
  }, []);

  //rotationSpeed 제어 함수
  const changeRotationSpeed = (speed) => {
    return setRotationSpeed(speed);
  };

  return (
    <div className="cube-background">
      <div className="cube-container">
        <Canvas camera={{ position: [10, 10, 10] }}>
          <Stars2 numStars={300} spreadRange={300} color={'white'} size={2} />
          <CubeScene
            rotationSpeed={rotationSpeed}
            changeRotationSpeed={changeRotationSpeed}
            getNextPage={getNextPage}
          />
          <EdgesScene rotationSpeed={rotationSpeed} />
        </Canvas>
      </div>
      <div className="board-container">
        <Board isOpenBoard={isOpenBoard} />
      </div>
    </div>
  );
};

export default CubeBackground;
