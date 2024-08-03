import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CubeComp = () => {
  const [nextPage, setNextPage] = useState('/');
  const { raycaster, camera, mouse } = useThree();
  const navigate = useNavigate();
  const meshRef = useRef();
  const materials = [
    new THREE.MeshStandardMaterial({ color: 'red', name: '/profile' }),
    new THREE.MeshStandardMaterial({ color: 'green', name: '/aboutme' }),
    new THREE.MeshStandardMaterial({ color: 'blue', name: '/gitaddress' }),
    new THREE.MeshStandardMaterial({ color: 'yellow', name: '/review' }),
    new THREE.MeshStandardMaterial({ color: 'purple', name: '/stack' }),
    new THREE.MeshStandardMaterial({ color: 'orange', name: '/portfolio' }),
  ];

  const handleFaceClick = useCallback((currentFace) => {
    setNextPage(currentFace);
  }, []);

  const handleClick = useCallback(
    (event) => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(meshRef.current);
      if (intersects.length > 0) {
        const faceIndex = Math.floor(intersects[0].faceIndex / 2);
        const currentFace = meshRef.current.material[faceIndex].name;
        handleFaceClick(currentFace);
      }
    },
    [raycaster, camera, mouse, handleFaceClick],
  );

  useEffect(() => {
    if (nextPage !== '/') {
      navigate(nextPage);
    }
  }, [nextPage, navigate]);

  return (
    <mesh ref={meshRef} onClick={handleClick}>
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
