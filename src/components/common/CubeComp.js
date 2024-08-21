import * as THREE from 'three';
import { useThree, useFrame, extend } from '@react-three/fiber';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import '../../CubeBackground.css';

extend({ Line2, LineMaterial, LineGeometry });

const CubeComp = ({ rotationSpeed }) => {
  const [nextPage, setNextPage] = useState('/');
  const { raycaster, camera, mouse, scene } = useThree();
  const navigate = useNavigate();
  const meshRef = useRef();
  const edgesRef = useRef(); // 테두리를 위한 ref
  const startCoordinateRef = useRef({ x: null, y: null }); // 시작 좌표를 Ref로 저장
  const endCoordinateRef = useRef({ x: null, y: null }); // 끝 좌표를 Ref로 저장
  const rotationSpeedRef = useRef(rotationSpeed); // rotationSpeed를 ref로 저장
  const lastHoveredFaceIndexRef = useRef(null); // 마지막으로 색상이 변경된 면의 인덱스 추적

  // `useMemo`를 사용해 `faceTextures` 배열을 메모이제이션, 렌더링마다 재생성되기 때문에 useMemo 사용
  const faceTextures = useMemo(
    () => [
      // 경로는 public 폴더가 기본으로 되어있음.
      new THREE.TextureLoader().load('textures/profile.jpg'),
      new THREE.TextureLoader().load('textures/aboutme.jpg'),
      new THREE.TextureLoader().load('textures/gitaddress.jpg'),
      new THREE.TextureLoader().load('textures/review.jpg'),
      new THREE.TextureLoader().load('textures/stack.jpg'),
      new THREE.TextureLoader().load('textures/portfolio.jpg'),
    ],
    [],
  );
  const materials = faceTextures.map(
    (texture) =>
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        // opacity: 1,
      }),
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

  const onPointerOver = useCallback(
    (event) => {
      rotationSpeedRef.current = 0; // 마우스 오버 시 회전 속도를 0으로 설정
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(meshRef.current);
      if (intersects.length > 0) {
        const faceIndex = Math.floor(intersects[0].faceIndex / 2);
        // 적용하고 싶은 CSS 변화에 해당하는 코드 작성
        meshRef.current.material[faceIndex].opacity = 0.7; // opacity 조절
      }
    },
    [raycaster, camera, mouse],
  );

  const onPointerOut = useCallback(() => {
    rotationSpeedRef.current = rotationSpeed; // 마우스 아웃 시 회전 속도를 원래대로 설정

    // 원래 텍스처로 돌아오기 위해 opacity를 초기화
    faceTextures.forEach((texture, index) => {
      meshRef.current.material[index].map = texture;
      meshRef.current.material[index].opacity = 1; // opacity 복귀
    });
  }, [rotationSpeed, faceTextures]);

  const onPointerMove = useCallback(
    (event) => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(meshRef.current);
      if (intersects.length > 0) {
        const faceIndex = Math.floor(intersects[0].faceIndex / 2);

        // 면이 변경된 경우에만 초기화 및 색상 변경 수행
        if (faceIndex !== lastHoveredFaceIndexRef.current) {
          // 이전에 색상이 변경된 면을 기본 상태로 초기화
          if (lastHoveredFaceIndexRef.current !== null) {
            meshRef.current.material[
              lastHoveredFaceIndexRef.current
            ].opacity = 1;
          }

          // 새로운 면의 색상을 변경
          meshRef.current.material[faceIndex].opacity = 0.7; // opacity 조절
          lastHoveredFaceIndexRef.current = faceIndex; // 현재 면 인덱스를 저장
        }
      }
    },
    [raycaster, camera, mouse],
  );

  //테두리큐브
  const createCubeEdges = () => {
    //테두리 구석하는 point들의 x,y,z 좌표를 조절하여 테두리 형성
    const points = [
      1.5,
      1.5,
      1.5, //
      1.5,
      -1.5,
      1.5, //
      1.5,
      1.5,
      1.5, //
      -1.5,
      1.5,
      1.5, //
      -1.5,
      -1.5,
      1.5, //
      -1.5,
      1.5,
      1.5, //
      -1.5,
      -1.5,
      1.5, //
      1.5,
      -1.5,
      1.5, //
      1.5,
      -1.5,
      -1.5, //
      1.5,
      1.5,
      -1.5, //
      -1.5,
      1.5,
      -1.5, //
      -1.5,
      -1.5,
      -1.5, //
      1.5,
      -1.5,
      -1.5, //
      1.5,
      -1.5,
      -1.5, //
      1.5,
      -1.5,
      -1.5, //
      -1.5,
      -1.5,
      -1.5, //
      -1.5,
      -1.5,
      1.5, //
      -1.5,
      -1.5,
      -1.5, //
      1.5,
      -1.5,
      -1.5, //
      1.5,
      1.5,
      -1.5, //
      1.5,
      1.5,
      1.5, //
      1.5,
      1.5,
      1.5, //
      -1.5,
      1.5,
      1.5, //
      -1.5,
      1.5,
      -1.5, //
    ];

    const geometry = new LineGeometry();
    geometry.setPositions(points);

    const material = new LineMaterial({
      color: 0xffffff, //테두리 색상
      linewidth: 5, //테두리 굵기
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight), //테두리 해상도 설정
    });

    const line = new Line2(geometry, material);
    return line;
  };

  useEffect(() => {
    if (nextPage !== '/') {
      navigate(nextPage);
    }
  }, [nextPage, navigate]);

  useEffect(() => {
    const cubeEdges = createCubeEdges();
    scene.add(cubeEdges);
    edgesRef.current = cubeEdges;

    return () => {
      scene.remove(cubeEdges);
    };
  }, [scene]);

  //함수를 통해 상태변경 방식으로 할 경우 잦은 상태변경에 의한 flickering 현상이 빈번하게 발생함.
  //ref를 통한 제어방식으로 변경하여 문제해결.
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeedRef.current;
      meshRef.current.rotation.y += rotationSpeedRef.current;
    }
    // // 테두리도 큐브와 함께 회전
    if (edgesRef.current) {
      edgesRef.current.rotation.copy(meshRef.current.rotation);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerUp={onPointerUp}
      onPointerDown={onPointerDown}
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

export default CubeComp;
