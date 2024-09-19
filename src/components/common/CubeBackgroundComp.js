import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Canvas, useThree } from '@react-three/fiber';

import BoardComp from './BoardComp';
import CubeScene from './CubeComp';
import EdgesScene from './EdgesComp';
import StarsScene from './StarsComp';

import '../../lib/styles/CubeBackground.css';
import '../../lib/styles/Board.css';

const ResizeCanvas = ({ cubeContainerRef }) => {
  const { gl, camera, scene } = useThree();

  const handleResize = useCallback(() => {
    if (cubeContainerRef.current) {
      const { clientWidth, clientHeight } = cubeContainerRef.current;

      // 불필요한 렌더링을 방지 (false)
      gl.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();

      // 한 번만 렌더링 호출
      gl.render(scene, camera);
    }
  }, [cubeContainerRef, gl, camera, scene]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // 처음에 사이즈 설정

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return null;
};

const CubeBackground = () => {
  const [rotationSpeed, setRotationSpeed] = useState(0.005);
  const [boardIndex, setBoardIndex] = useState(null);
  const cubeContainerRef = useRef();

  const getBoardIndex = useCallback((index) => {
    setBoardIndex(index);
  }, []);

  const changeRotationSpeed = (speed) => {
    return setRotationSpeed(speed);
  };

  const closeBoard = useCallback(() => {
    setBoardIndex(null);
  }, []);

  // useEffect(() => {
  //   let timeoutId;

  //   const debouncedResize = () => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => {
  //       window.dispatchEvent(new Event('resize')); // Canvas 리사이즈
  //     }, 200); // 200ms 동안 리사이즈 이벤트 발생을 제한
  //   };

  //   window.addEventListener('resize', debouncedResize);

  //   return () => {
  //     window.removeEventListener('resize', debouncedResize);
  //     clearTimeout(timeoutId);
  //   };
  // }, []);

  return (
    <div
      ref={cubeContainerRef}
      className={`cube-background ${boardIndex !== null ? 'board-open' : ''}`}
    >
      <div className="cube-container">
        <Canvas camera={{ position: [10, 10, 10] }}>
          <ResizeCanvas cubeContainerRef={cubeContainerRef} />
          <CubeScene
            rotationSpeed={rotationSpeed}
            changeRotationSpeed={changeRotationSpeed}
            getBoardIndex={getBoardIndex}
          />
          <EdgesScene rotationSpeed={rotationSpeed} />
          <StarsScene
            numStars={1000}
            spreadRange={300}
            color={'white'}
            size={2}
          />
        </Canvas>
      </div>
      <div className="board-container">
        <BoardComp boardIndex={boardIndex} closeBoard={closeBoard} />
      </div>
    </div>
  );
};

export default CubeBackground;
