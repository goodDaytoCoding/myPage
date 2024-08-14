// import * as THREE from 'three';
// import { useFrame } from '@react-three/fiber';
// import React, { useMemo, useRef } from 'react';

// const Stars = ({ numStars, spreadRange, color, size }) => {
//   const points = useRef();

//   // 캔버스를 사용해 동그란 별 텍스처 생성
//   const createStar = (size, color) => {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');

//     // 캔버스 크기 설정
//     canvas.width = size;
//     canvas.height = size;

//     // 동그란 점 그리기
//     ctx.beginPath();
//     ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
//     ctx.fillStyle = color;
//     ctx.fill();

//     // 캔버스를 텍스처로 변환
//     const star = new THREE.CanvasTexture(canvas);
//     return star;
//   };

//   // 별의 위치를 생성
//   const generateStarPositions = (numStars, spreadRange) => {
//     const starPositions = [];
//     for (let i = 0; i < numStars; i++) {
//       const x = THREE.MathUtils.randFloatSpread(spreadRange);
//       const y = THREE.MathUtils.randFloatSpread(spreadRange);
//       const z = THREE.MathUtils.randFloatSpread(spreadRange);
//       starPositions.push(x, y, z);
//     }
//     return new THREE.Float32BufferAttribute(starPositions, 3);
//   };

//   // 별의 위치를 설정하는 BufferGeometry 생성
//   const starsGeometry = useMemo(() => {
//     const geometry = new THREE.BufferGeometry();
//     geometry.setAttribute(
//       'position',
//       generateStarPositions(numStars, spreadRange),
//     );
//     return geometry;
//   }, [numStars, spreadRange]);

//   // 별 텍스처 생성
//   const createdStar = useMemo(() => createStar(64, color), [color]);

//   // 별들의 초기 투명도 값 설정
//   const opacities = useMemo(() => {
//     const array = new Float32Array(numStars);
//     for (let i = 0; i < numStars; i++) {
//       array[i] = Math.random(); // 초기 투명도를 랜덤하게 설정
//     }
//     return array;
//   }, [numStars]);

//   // 별들의 깜빡임 효과 구현
//   useFrame(() => {
//     for (let i = 0; i < numStars; i++) {
//       opacities[i] += (Math.random() - 0.5) * 0.05; // 투명도에 소량의 랜덤 값을 더해줌
//       if (opacities[i] > 1) opacities[i] = 1;
//       if (opacities[i] < 0) opacities[i] = 0;
//     }
//     // 별들의 투명도 업데이트
//   });

//   return (
//     <points ref={points} geometry={starsGeometry}>
//       <pointsMaterial
//         opacity={1.0}
//         size={size}
//         sizeAttenuation
//         map={createdStar}
//         transparent
//         depthWrite={false}
//       />
//       <bufferAttribute
//         attachObject={['attributes', 'opacity']}
//         array={opacities}
//         itemSize={1}
//         count={numStars}
//       />
//     </points>
//   );
// };

// export default Stars;

//////////////////////////////////////
// import * as THREE from 'three';
// import { useFrame } from '@react-three/fiber';
// import React, { useMemo, useRef } from 'react';

// const Stars = ({ numStars, spreadRange, color, size }) => {
//   const points = useRef();

//   const createStar = (size, color) => {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');

//     canvas.width = size;
//     canvas.height = size;

//     ctx.beginPath();
//     ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
//     ctx.fillStyle = color;
//     ctx.fill();

//     const star = new THREE.CanvasTexture(canvas);
//     return star;
//   };

//   const generateStarPositions = (numStars, spreadRange) => {
//     const starPositions = [];
//     for (let i = 0; i < numStars; i++) {
//       const x = THREE.MathUtils.randFloatSpread(spreadRange);
//       const y = THREE.MathUtils.randFloatSpread(spreadRange);
//       const z = THREE.MathUtils.randFloatSpread(spreadRange);
//       starPositions.push(x, y, z);
//     }
//     return new THREE.Float32BufferAttribute(starPositions, 3);
//   };

//   const starsGeometry = useMemo(() => {
//     const geometry = new THREE.BufferGeometry();
//     geometry.setAttribute(
//       'position',
//       generateStarPositions(numStars, spreadRange),
//     );

//     // opacity 속성 추가
//     const opacities = new Float32Array(numStars);
//     for (let i = 0; i < numStars; i++) {
//       opacities[i] = Math.random(); // 초기 투명도를 랜덤하게 설정
//     }
//     geometry.setAttribute(
//       'opacity',
//       new THREE.Float32BufferAttribute(opacities, 1),
//     );

//     return geometry;
//   }, [numStars, spreadRange]);

//   const createdStar = useMemo(() => createStar(64, color), [color]);

//   useFrame(() => {
//     if (points.current) {
//       const opacities = points.current.geometry.attributes.opacity.array;
//       for (let i = 0; i < numStars; i++) {
//         opacities[i] += (Math.random() - 0.5) * 0.05;
//         if (opacities[i] > 1) opacities[i] = 1;
//         if (opacities[i] < 0) opacities[i] = 0;
//       }
//       points.current.geometry.attributes.opacity.needsUpdate = true;
//     }
//   });

//   return (
//     <points ref={points} geometry={starsGeometry}>
//       <pointsMaterial
//         vertexColors={false}
//         opacity={1.0}
//         size={size}
//         sizeAttenuation
//         map={createdStar}
//         transparent
//         depthWrite={false}
//       />
//     </points>
//   );
// };

// export default Stars;

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';

const Stars = ({ numStars, spreadRange, color, size, rotationSpeed }) => {
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
    const star = new THREE.CanvasTexture(canvas);
    const state = star.userData;
    state.x = 'test';
    state.y = 'test';
    // console.log(star);
    return star;
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
        // 0 ~ 100까지 서서히 밝아짐
        states.array[i] += 0.01;
      } else if (states.array[i] > 0 && states.timers[i] >= 100) {
        // 100 ~ 200까지 서서히 어두워짐
        states.array[i] -= 0.01;
      }
      if (states.timers[i] >= 200) {
        states.timers[i] = 0; // 타이머를 초기화
      }
    }

    if (points.current) {
      points.current.material.opacity =
        states.array.reduce((acc, state) => acc + state, 0) / numStars;
      points.current.material.needsUpdate = true;
    }
  });

  return (
    <points ref={points} geometry={starsGeometry}>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        map={createdStar}
        transparent
        opacity={1.0}
        depthWrite={false}
      />
    </points>
  );
};

export default Stars;
