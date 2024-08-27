import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';

const Stars2 = ({ numStars, spreadRange, color, size }) => {
  const points = useRef();

  // 별 텍스처 생성 함수
  const createStar = (size, color) => {
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
    return new THREE.CanvasTexture(canvas);
  };

  // 별 위치 생성 함수
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

    // 각 별의 초기 불투명도 설정
    const opacities = new Float32Array(numStars).fill(0);
    geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

    return geometry;
  }, [numStars, spreadRange]);

  const createdStar = useMemo(() => createStar(64, color), [color]);

  // 상태와 타이머 초기화
  const states = useMemo(() => {
    const array = new Float32Array(numStars);
    const timers = new Float32Array(numStars);
    for (let i = 0; i < numStars; i++) {
      array[i] = 0; // 초기 상태: 어두운 상태
      timers[i] = Math.random() * 100; // 타이머 초기값 설정 (랜덤하게 시작)
    }
    return { array, timers };
  }, [numStars]);

  useFrame(() => {
    for (let i = 0; i < numStars; i++) {
      // 별 상태 업데이트 (서서히 밝아졌다가 어두워지기)
      states.timers[i] += 1; // 타이머를 증가시킴

      if (states.array[i] < 1 && states.timers[i] < 100) {
        states.array[i] += 0.01; // 서서히 밝아짐
      } else if (states.array[i] > 0 && states.timers[i] >= 100) {
        states.array[i] -= 0.01; // 서서히 어두워짐
      }

      if (states.timers[i] >= 200) {
        states.timers[i] = 0; // 타이머를 초기화
        states.array[i] = 0; // 상태를 초기화하여 다시 어두워짐을 시작
      }

      // 각 별의 불투명도 업데이트
      points.current.geometry.attributes.opacity.array[i] = states.array[i];
    }

    points.current.geometry.attributes.opacity.needsUpdate = true;
  });

  // 셰이더 머티리얼을 사용하여 각 점의 불투명도를 개별적으로 설정
  const material = new THREE.ShaderMaterial({
    uniforms: {
      pointTexture: { value: createdStar },
    },
    vertexShader: `
      attribute float opacity;
      varying float vOpacity;
      void main() {
        vOpacity = opacity;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = ${size.toFixed(1)} * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D pointTexture;
      varying float vOpacity;
      void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, vOpacity);
        gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
      }
    `,
    transparent: true,
  });

  return (
    <points ref={points} geometry={starsGeometry}>
      <primitive object={material} attach="material" />
    </points>
  );
};

export default Stars2;
