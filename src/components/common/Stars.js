import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';

const Stars = ({ numStars, spreadRange, color, size }) => {
  const points = useRef();

  const createStars = (size, color) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 캔버스 크기 설정
    canvas.width = size;
    canvas.height = size;

    // 동그란 점 그리기
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // 캔버스를 텍스처로 변환
    const star = new THREE.CanvasTexture(canvas);
    return star;
  };

  const generateStarPositions = (numStars, spreadRange) => {
    const starPositions = [];
    for (let i = 0; i < numStars; i++) {
      const x = THREE.MathUtils.randFloatSpread(spreadRange);
      const y = THREE.MathUtils.randFloatSpread(spreadRange);
      const z = THREE.MathUtils.randFloatSpread(spreadRange);
      starPositions.push(x, y, z);
    }
    return new THREE.Float32BufferAttribute(starPositions, 3);
  };

  const starsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      generateStarPositions(numStars, spreadRange),
    );
    return geometry;
  }, [numStars, spreadRange]);

  const createdStars = useMemo(() => createStars(64, color), [color]);

  useFrame(() => {
    if (points.current) {
      points.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={points} geometry={starsGeometry}>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        map={createdStars}
        transparent
        alphaTest={0.5} // 이 값을 설정해 투명하지 않은 부분만 렌더링
      />
    </points>
  );
};

export default Stars;
