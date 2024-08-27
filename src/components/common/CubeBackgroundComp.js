import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';

import CubeScene from './CubeComp';
import EdgesScene from './EdgesComp';
import Stars2 from './Stars2';

const CubeBackground = () => {
  const [rotationSpeed, setRotationSpeed] = useState(0.005);

  //rotationSpeed 제어 함수
  const changeRotationSpeed = (speed) => {
    return setRotationSpeed(speed);
  };
  return (
    <div className="cubeBackground">
      <Canvas camera={{ position: [10, 10, 10] }}>
        <Stars2 numStars={300} spreadRange={300} color={'white'} size={2} />
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
