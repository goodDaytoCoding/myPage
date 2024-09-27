import React, { useCallback, useMemo, useRef } from 'react';

import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';

const CubeComp = ({ changeRotationSpeed, rotationSpeed, getBoardIndex }) => {
  const { raycaster, mouse, camera } = useThree();
  const meshRef = useRef();
  const startCoordinateRef = useRef({ x: null, y: null }); // 시작 좌표를 Ref로 저장
  const endCoordinateRef = useRef({ x: null, y: null }); // 끝 좌표를 Ref로 저장
  const lastHoveredFaceIndexRef = useRef(null); // 마지막으로 선택된 면의 인덱스 추적

  // `useMemo`를 사용해 `faceTextures` 배열을 메모이제이션, 렌더링마다 재생성되기 때문에 useMemo 사용
  // TextureLoader의 기본 경로가 "textures/" 로 되어있음
  const faceTextures = useMemo(
    () => [
      new THREE.TextureLoader().load('textures/profile.png'),
      new THREE.TextureLoader().load('textures/aboutme.png'),
      new THREE.TextureLoader().load('textures/gitaddress.png'),
      new THREE.TextureLoader().load('textures/idea.png'),
      new THREE.TextureLoader().load('textures/stack.png'),
      new THREE.TextureLoader().load('textures/portfolio.png'),
    ],
    [],
  );

  const materials = useMemo(
    () =>
      faceTextures.map(
        (texture) =>
          new THREE.MeshBasicMaterial({ map: texture, transparent: true }),
      ),
    [faceTextures],
  );

  const getIntersects = useCallback(() => {
    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObject(meshRef.current);
  }, [raycaster, mouse, camera]);

  const calcFaceIndex = (intersects) => {
    return Math.floor(intersects[0].faceIndex / 2);
  };

  const onReuceImage = (faceIndex) => {
    const texture = meshRef.current.material[faceIndex].map;
    texture.repeat.set(1.15, 1.15); // 크기 조정
    texture.offset.set(-0.075, -0.075); // 이미지 중앙 정렬
  };

  const onRestoreImage = (texture) => {
    texture.repeat.set(1, 1); // 크기 원상 복구
    texture.offset.set(0, 0); // 위치 원상 복구
  };

  const onChangeCursorStyle = (state) => {
    const CURSOR_STATES = {
      OVER: 'pointer', // 포인터 변경
      OUT: 'default', // 포인터 복구
    };
    if (CURSOR_STATES[state]) {
      document.body.style.cursor = CURSOR_STATES[state]; // 상태에 맞는 커서로 변경
    }
  };

  const onChagneOpacity = (index, transparency) => {
    meshRef.current.material[index].opacity = transparency; //cube 해당 면의 opacity 조절
  };

  const onPointerDown = (event) => {
    startCoordinateRef.current = { x: event.clientX, y: event.clientY }; // 시작 좌표 저장
    window.addEventListener('pointerup', onPointerUp);
  };

  const onPointerUp = (event) => {
    endCoordinateRef.current = { x: event.clientX, y: event.clientY }; // 끝 좌표 저장
    window.removeEventListener('pointerup', onPointerUp);

    const distance = Math.sqrt(
      Math.pow(endCoordinateRef.current.x - startCoordinateRef.current.x, 2) +
        Math.pow(endCoordinateRef.current.y - startCoordinateRef.current.y, 2),
    );
    // 클릭 위치가 거의 동일한 경우 (픽셀 단위 허용 범위)
    if (distance < 5) {
      const intersects = getIntersects();

      if (intersects.length > 0) {
        const faceIndex = calcFaceIndex(intersects);
        getBoardIndex(faceIndex);
      }
    }
  };

  const onPointerOver = useCallback(() => {
    const intersects = getIntersects();

    changeRotationSpeed(0); //회전 정지
    onChangeCursorStyle('OVER');

    if (intersects.length > 0) {
      const faceIndex = calcFaceIndex(intersects);
      onReuceImage(faceIndex);
      onChagneOpacity(faceIndex, 0.7);
    }
  }, [changeRotationSpeed, getIntersects]);

  const onPointerOut = useCallback(() => {
    changeRotationSpeed(0.005); //회전속도 0.005
    onChangeCursorStyle('OUT');

    materials.forEach((material, faceIndex) => {
      const texture = material.map;
      onRestoreImage(texture);
      onChagneOpacity(faceIndex, 1);
    });
  }, [materials, changeRotationSpeed]);

  const onPointerMove = useCallback(() => {
    const intersects = getIntersects();

    if (intersects.length > 0) {
      const faceIndex = calcFaceIndex(intersects);
      // 면이 변경된 경우에만 초기화 및 변경 수행
      if (faceIndex !== lastHoveredFaceIndexRef.current) {
        // 이전에 변경된 면을 기본 상태로 초기화
        if (lastHoveredFaceIndexRef.current !== null) {
          onChagneOpacity(lastHoveredFaceIndexRef.current, 1);
          const prevTexture =
            meshRef.current.material[lastHoveredFaceIndexRef.current].map;
          onRestoreImage(prevTexture);
        }
        onChagneOpacity(faceIndex, 0.7);
        onReuceImage(faceIndex);
        lastHoveredFaceIndexRef.current = faceIndex; // 현재 면 인덱스를 저장
      }
    }
  }, [getIntersects]);

  //함수를 통해 상태변경 방식으로 할 경우 잦은 상태변경에 의한 flickering 현상이 빈번하게 발생함.
  //ref를 통한 제어방식으로 변경하여 문제해결.
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onPointerMove={onPointerMove}
    >
      <boxGeometry args={[3, 3, 3]} />
      {materials.map((material, index) => (
        //이미지를 사용하려면 meshBasicMaterial 텍스트를 사용하려면 meshStandardMaterial
        <meshBasicMaterial
          key={index}
          attach={`material-${index}`}
          {...material}
        />
      ))}
    </mesh>
  );
};

const CubeScene = ({ rotationSpeed, changeRotationSpeed, getBoardIndex }) => {
  return (
    <>
      <ambientLight intensity={5} />
      <pointLight position={[10, 10, 10]} />
      <CubeComp
        changeRotationSpeed={changeRotationSpeed}
        rotationSpeed={rotationSpeed}
        getBoardIndex={getBoardIndex}
      />
      <OrbitControls
        enablePan={false}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
      />
    </>
  );
};

export default CubeScene;
