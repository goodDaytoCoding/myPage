import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CubeComp = ({ rotationSpeed }) => {
  const [nextPage, setNextPage] = useState('/');
  const { raycaster, camera, mouse } = useThree();
  const navigate = useNavigate();
  const meshRef = useRef();
  const startCoordinateRef = useRef({ x: null, y: null }); // 시작 좌표를 Ref로 저장
  const endCoordinateRef = useRef({ x: null, y: null }); // 끝 좌표를 Ref로 저장
  const rotationSpeedRef = useRef(rotationSpeed); // rotationSpeed를 ref로 저장
  const textureLoader = new THREE.TextureLoader();
  const faceTextures = [
    //경로는 public 폴더가 기본으로 되어있음.
    textureLoader.load('textures/profile.jpg'),
    textureLoader.load('textures/aboutme.jpg'),
    textureLoader.load('textures/gitaddress.png'),
    textureLoader.load('textures/review.jpg'),
    textureLoader.load('textures/stack.jpg'),
    textureLoader.load('textures/portfolio.jpg'),
  ];
  const materials = faceTextures.map(
    (texture) => new THREE.MeshBasicMaterial({ map: texture }),
  );

  const getNextURL = useCallback((faceIndex) => {
    const faceURLs = [
      '/profile',
      '/aboutme',
      '/gitaddress',
      '/review',
      '/stack',
      '/portfolio',
    ];
    const currentFace = faceURLs[faceIndex];
    setNextPage(currentFace);
  }, []);

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

    if (distance < 5) {
      // 클릭 위치가 거의 동일한 경우 (픽셀 단위 허용 범위)
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(meshRef.current);
      if (intersects.length > 0) {
        const faceIndex = Math.floor(intersects[0].faceIndex / 2);
        getNextURL(faceIndex);
      }
    }
  };

  const onPointerOver = useCallback(() => {
    rotationSpeedRef.current = 0; // 마우스 오버 시 회전 속도를 0으로 설정
  }, []);

  const onPointerOut = useCallback(() => {
    rotationSpeedRef.current = rotationSpeed; // 마우스 아웃 시 회전 속도를 원래대로 설정
  }, [rotationSpeed]);

  useEffect(() => {
    if (nextPage !== '/') {
      navigate(nextPage);
    }
  }, [nextPage, navigate]);

  //함수를 통해 상태변경 방식으로 할 경우 잦은 상태변경에 의한 flickering 현상이 빈번하게 발생함.
  //ref를 통한 제어방식으로 변경하여 문제해결.
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeedRef.current;
      meshRef.current.rotation.y += rotationSpeedRef.current;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerUp={onPointerUp}
      onPointerDown={onPointerDown}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
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

export default CubeComp;
