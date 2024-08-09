import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

const Stars = () => {
  const points = useRef();
  const starsGeometry = new THREE.BufferGeometry();
  const starPositions = [];

  for (let i = 0; i < 5000; i++) {
    const x = THREE.MathUtils.randFloatSpread(200);
    const y = THREE.MathUtils.randFloatSpread(200);
    const z = THREE.MathUtils.randFloatSpread(200);
    starPositions.push(x, y, z);
  }

  starsGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(starPositions, 3),
  );

  useFrame(() => {
    points.current.rotation.y += 0.0005;
  });

  return (
    <points ref={points} geometry={starsGeometry}>
      <pointsMaterial color="#000000" size={0.3} sizeAttenuation />
    </points>
  );
};

export default Stars;
