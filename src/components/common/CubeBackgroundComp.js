import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';

import CubeScene from './CubeComp';
import Stars from './Stars';
import EdgesScene from './EdgesComp';

const CubeBackground = () => {
  const [rotationSpeed, setRotationSpeed] = useState(0.005);

  //rotationSpeed 제어 함수
  const changeRotationSpeed = (speed) => {
    return setRotationSpeed(speed);
  };
  return (
    <div className="cubeBackground">
      <Stars />
      <Canvas camera={{ position: [10, 10, 10] }}>
        <CubeScene
          changeRotationSpeed={changeRotationSpeed}
          rotationSpeed={rotationSpeed}
        />
        <EdgesScene rotationSpeed={rotationSpeed} />
      </Canvas>
    </div>
  );
};

export default CubeBackground;
