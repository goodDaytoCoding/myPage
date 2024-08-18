import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import CubeComp from './CubeComp';
import Stars from './Stars';

const CubeBackground = () => {
  return (
    <div className="cubeBackground">
      <div className="title">포트폴리오</div>
      <Stars />
      <Canvas camera={{ position: [10, 10, 10] }}>
        <ambientLight intensity={5} />
        <pointLight position={[10, 10, 10]} />
        <CubeComp rotationSpeed={0.005} />
        <OrbitControls
          enablePan={false}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>
    </div>
  );
};

export default CubeBackground;
