import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import React from 'react';

import CubeComp from './CubeComp';
import Stars from './Stars';

const CubeBackground = () => {
  return (
    <Canvas camera={{ position: [3, 3, 3] }}>
      <ambientLight intensity={5} />
      <pointLight position={[10, 10, 10]} />
      <CubeComp rotationSpeed={0.005} />
      <Stars numStars={5000} spreadRange={200} color={'#ffffff'} size={0.7} />
      <OrbitControls enablePan={false} />
    </Canvas>
  );
};

export default CubeBackground;
