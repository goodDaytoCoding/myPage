import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import React from 'react';

import CubeComp from './CubeComp';
import Stars from './Stars';

const CubeBackground = () => {
  return (
    <>
      <Canvas camera={{ position: [10, 10, 10] }}>
        <color attach="background" args={['black']} />
        <ambientLight intensity={5} />
        <pointLight position={[10, 10, 10]} />

        <Stars
          numStars={3}
          spreadRange={10}
          color={'#ffffff'}
          size={0.7}
          rotationSpeed={0.005}
        />

        <OrbitControls
          enablePan={false}
          enableRotate={true}
          minDistance={10}
          maxDistance={20}
        />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      </Canvas>
      <Canvas camera={{ position: [10, 10, 10] }}>
        <CubeComp rotationSpeed={0.005} />
      </Canvas>
    </>
  );
};

export default CubeBackground;
