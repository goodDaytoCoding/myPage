import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';

extend({
  Line2,
  LineMaterial,
  LineGeometry,
  EffectComposer,
  RenderPass,
  UnrealBloomPass,
});

const CubeEdges = () => {
  const edgesRef = useRef(); // 테두리를 위한 ref

  const createCubeEdges = () => {
    // 테두리의 12개의 엣지에 대한 좌표 설정
    const points = [
      1.5, 1.5, 1.5, 1.5, -1.5, 1.5, 1.5, 1.5, 1.5, -1.5, 1.5, 1.5, -1.5, -1.5,
      1.5, -1.5, 1.5, 1.5, -1.5, -1.5, 1.5, 1.5, -1.5, 1.5, 1.5, -1.5, -1.5,
      1.5, 1.5, -1.5, -1.5, 1.5, -1.5, -1.5, -1.5, -1.5, 1.5, -1.5, -1.5, 1.5,
      -1.5, -1.5, -1.5, -1.5, -1.5, -1.5, -1.5, 1.5, -1.5, -1.5, -1.5, 1.5,
      -1.5, -1.5, 1.5, 1.5, -1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, -1.5, 1.5, 1.5,
      -1.5, 1.5, -1.5,
    ];

    // LineGeometry와 LineMaterial을 사용하여 테두리를 생성
    const geometry = new LineGeometry();
    geometry.setPositions(points);

    const material = new LineMaterial({
      color: 0xffffff, //테두리 색상
      linewidth: 5, //테두리 굵기
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight), // 해상도
    });

    const line = new Line2(geometry, material);
    return line;
  };

  useEffect(() => {
    const cubeEdges = createCubeEdges();
    edgesRef.current = cubeEdges;
    return () => {
      // 컴포넌트 언마운트 시 자원 해제
      cubeEdges.geometry.dispose();
      cubeEdges.material.dispose();
    };
  }, []);

  useFrame(({ scene }) => {
    if (edgesRef.current) {
      // 매 프레임마다 큐브 테두리를 장면에 추가
      scene.add(edgesRef.current);
    }
  });

  return null; // 이 컴포넌트는 렌더링할 JSX가 없으므로 null 반환
};

const Effects = () => {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef();

  useEffect(() => {
    composer.current = new EffectComposer(gl);
    composer.current.setSize(size.width, size.height);

    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      1.5, // 블룸 강도
      0.4, // 블룸 반경
      0.85, // 블룸 세부 조정
    );

    composer.current.addPass(renderPass);
    composer.current.addPass(bloomPass);
  }, [gl, scene, camera, size]);

  useFrame(() => {
    if (composer.current) {
      // 매 프레임마다 composer를 사용하여 렌더링
      composer.current.render();
    }
  }, 1);

  return null; // 이 컴포넌트는 렌더링할 JSX가 없으므로 null 반환
};

const EdgesScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <CubeEdges />
      <OrbitControls
        enablePan={false}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
      />
      <Effects />
    </>
  );
};

export default EdgesScene;
