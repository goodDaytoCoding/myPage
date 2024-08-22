import React from 'react';
import { Canvas } from '@react-three/fiber';

import CubeScene from './CubeComp';
import Stars from './Stars';
import EdgesScene from './EdgesComp';

const CubeBackground = () => {
  return (
    <div className="cubeBackground">
      <Stars />
      <Canvas camera={{ position: [10, 10, 10] }}>
        <CubeScene />
        <EdgesScene />
      </Canvas>
    </div>
  );
};

export default CubeBackground;
