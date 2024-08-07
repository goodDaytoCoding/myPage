import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CubeComp = ({ rotationSpeed }) => {
  const [nextPage, setNextPage] = useState('/');
  const [isHovered, setIsHovered] = useState(false);
  const [startCoordinate, setStartCoordinate] = useState({ x: null, y: null });
  const [endCoordinate, setEndCoordinate] = useState({ x: null, y: null });
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

  const onPointerDown = (event) => {
    setStartCoordinate({ x: event.clientX, y: event.clientY });
    window.addEventListener('pointerup', onPointerUp);
  };

  const onPointerUp = (event) => {
    setEndCoordinate({ x: event.clientX, y: event.clientY });
    window.removeEventListener('pointerup', onPointerUp);
  };

  useEffect(() => {
    if (endCoordinate.x !== null && endCoordinate.y !== null) {
      const distance = Math.sqrt(
        Math.pow(endCoordinate.x - startCoordinate.x, 2) +
          Math.pow(endCoordinate.y - startCoordinate.y, 2),
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
    }
  }, [endCoordinate, startCoordinate, raycaster, camera, mouse, getNextURL]);

  const onPointerOver = () => {
    setIsHovered(true);
  };

  const onPointerOut = () => {
    setIsHovered(false);
  };

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
