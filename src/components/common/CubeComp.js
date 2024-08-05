import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CubeComp = ({ rotationSpeed }) => {
  const [nextPage, setNextPage] = useState('/');
  const [isHovered, setIsHovered] = useState(false);
  const { raycaster, camera, mouse } = useThree();
  const navigate = useNavigate();
  const meshRef = useRef();
  const materials = [
    new THREE.MeshStandardMaterial({ color: 'red' }),
    new THREE.MeshStandardMaterial({ color: 'green' }),
    new THREE.MeshStandardMaterial({ color: 'blue' }),
    new THREE.MeshStandardMaterial({ color: 'yellow' }),
    new THREE.MeshStandardMaterial({ color: 'purple' }),
    new THREE.MeshStandardMaterial({ color: 'orange' }),
  ];

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

  //클릭을 때는 순간 최종적으로 커서가 위치한 곳이 처음 큐브의 한 면을 클릭 했을때와 다른 면이라면 커서가 최종적으로 위치한 면의 url로 이동함.
  //클릭했을때의 커서위치와 최종위치가 다르다면 이동을 막아야함(큐브를 회전하는 경우를 구분할 수 있게 해야함)
  const onPointerDown = useCallback(() => {
    console.log('클릭한 순간');
    window.addEventListener('pointerup', onPointerUp);
  }, []);

  const onPointerUp = useCallback(
    (event) => {
      console.log('클릭 때는 순간');
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(meshRef.current);
      if (intersects.length > 0) {
        const faceIndex = Math.floor(intersects[0].faceIndex / 2);
        getNextURL(faceIndex);
      }
      window.removeEventListener('pointerup', onPointerUp);
    },
    [raycaster, camera, mouse, getNextURL],
  );
  //pointerDown과 PointerUp 함수를 수정하기

  const onPointerOver = useCallback(() => {
    setIsHovered(true);
  }, []);

  const onPointerOut = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    if (nextPage !== '/') {
      navigate(nextPage);
    }
  }, [nextPage, navigate]);

  useFrame(() => {
    if (meshRef.current && !isHovered) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerDown={onPointerDown}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <boxGeometry args={[3, 3, 3]} />
      {materials.map((material, index) => (
        <meshStandardMaterial
          key={index}
          attach={`material-${index}`}
          {...material}
        />
      ))}
    </mesh>
  );
};

export default CubeComp;
