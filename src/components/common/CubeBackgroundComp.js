import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import React from 'react';

import CubeComp from './CubeComp';
import Stars from './Stars';

const CubeBackground = () => {
  return (
    <Canvas camera={{ position: [3, 3, 3] }}>
      <color attach="background" args={['black']} />
      <ambientLight intensity={5} />
      <pointLight position={[10, 10, 10]} />
      <CubeComp rotationSpeed={0.005} />
      <Stars numStars={1000} spreadRange={200} color={'#ffffff'} size={0.7} />
      <OrbitControls enablePan={false} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </Canvas>
  );
};

export default CubeBackground;
