import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../CubeBackground.css';

const CubeComp = ({ rotationSpeed, camera }) => {
  const { raycaster, mouse } = useThree();
  const [nextPage, setNextPage] = useState('/');
  const navigate = useNavigate();
  const meshRef = useRef();
  const startCoordinateRef = useRef({ x: null, y: null }); // 시작 좌표를 Ref로 저장
  const endCoordinateRef = useRef({ x: null, y: null }); // 끝 좌표를 Ref로 저장
  const rotationSpeedRef = useRef(rotationSpeed); //rotationSpeed를 ref로 저장
  const lastHoveredFaceIndexRef = useRef(null); // 마지막으로 선택된 면의 인덱스 추적

  // `useMemo`를 사용해 `faceTextures` 배열을 메모이제이션, 렌더링마다 재생성되기 때문에 useMemo 사용
  const faceTextures = useMemo(
    () => [
      new THREE.TextureLoader().load('textures/profile.jpg'),
      new THREE.TextureLoader().load('textures/aboutme.jpg'),
      new THREE.TextureLoader().load('textures/gitaddress.jpg'),
      new THREE.TextureLoader().load('textures/review.jpg'),
      new THREE.TextureLoader().load('textures/stack.jpg'),
      new THREE.TextureLoader().load('textures/portfolio.jpg'),
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

  const getNextURL = useCallback((faceIndex) => {
    const faceURLs = [
      '/profile',
      '/aboutme',
      '/gitaddress',
      '/review',
      '/stack',
      '/portfolio',
    ];
    setNextPage(faceURLs[faceIndex]);
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
    // 클릭 위치가 거의 동일한 경우 (픽셀 단위 허용 범위)
    if (distance < 5) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(meshRef.current);
      if (intersects.length > 0) {
        const faceIndex = Math.floor(intersects[0].faceIndex / 2);
        getNextURL(faceIndex);
      }
    }
  };

  const onPointerOver = useCallback(
    (event) => {
      rotationSpeedRef.current = 0; // 마우스 오버 시 회전 속도를 0으로 설정
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(meshRef.current);
      if (intersects.length > 0) {
        const faceIndex = Math.floor(intersects[0].faceIndex / 2);
        // 적용하고 싶은 CSS 변화에 해당하는 코드 작성
        meshRef.current.material[faceIndex].opacity = 0.7; //opacity 조절
      }
    },
    [raycaster, camera, mouse],
  );

  const onPointerOut = useCallback(() => {
    rotationSpeedRef.current = rotationSpeed; // 마우스 아웃 시 회전 속도를 원래대로 설정

    // 원래 텍스처로 돌아오기 위해 opacity를 초기화
    materials.forEach((_, index) => {
      meshRef.current.material[index].opacity = 1;
    });
  }, [rotationSpeed, materials]);

  const onPointerMove = useCallback(() => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(meshRef.current);

    if (intersects.length > 0) {
      const faceIndex = Math.floor(intersects[0].faceIndex / 2);
      // 면이 변경된 경우에만 초기화 및 색상 변경 수행
      if (faceIndex !== lastHoveredFaceIndexRef.current) {
        // 이전에 색상이 변경된 면을 기본 상태로 초기화
        if (lastHoveredFaceIndexRef.current !== null) {
          meshRef.current.material[lastHoveredFaceIndexRef.current].opacity = 1;
        }

        meshRef.current.material[faceIndex].opacity = 0.7; //opacity 조절
        lastHoveredFaceIndexRef.current = faceIndex; // 현재 면 인덱스를 저장
      }
    }
  }, [raycaster, camera, mouse]);

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

const CubeScene = () => {
  const { gl, camera } = useThree();
  const scene = useRef();

  useFrame(() => {
    gl.autoClear = false; //이전 렌더링 내용 유지 및 새로운 장면이 기존 내용 위에 렌더링 됨. 여러 렌더링 패스 사용시 유용한 설정
    gl.clearDepth(); //깊이 버퍼 삭제
    gl.render(scene.current, camera);
  });

  return (
    <scene ref={scene}>
      <ambientLight intensity={5} />
      <pointLight position={[10, 10, 10]} />
      <CubeComp rotationSpeed={0.005} camera={camera} />
      <OrbitControls
        enablePan={false}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
      />
    </scene>
  );
};

export default CubeScene;
