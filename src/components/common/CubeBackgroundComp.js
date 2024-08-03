import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import CubeComp from './CubeComp';

const CubeBackground = () => {
  return (
    <Canvas camera={{ position: [3, 3, 3] }}>
      <ambientLight intensity={5} />
      <pointLight position={[10, 10, 10]} />
      <CubeComp rotationSpeed={0.005} />
      <OrbitControls enablePan={false} />
    </Canvas>
  );
};

export default CubeBackground;
