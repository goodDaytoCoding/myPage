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

  const onClickCube = useCallback(
    (event) => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(meshRef.current);
      if (intersects.length > 0) {
        const faceIndex = Math.floor(intersects[0].faceIndex / 2);
        getNextURL(faceIndex);
      }
    },
    [raycaster, camera, mouse, getNextURL],
  );

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
      onClick={onClickCube}
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
