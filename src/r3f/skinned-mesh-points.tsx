import { OrbitControls, useGLTF } from '@react-three/drei';
// import * as THREE from 'three';

export default function SkinnedMeshPoints() {

  const {scene: model } = useGLTF('/assets/FinalBaseMesh.glb');

  return <>
    <OrbitControls/>
    <ambientLight />
    <mesh scale={[10, 0.01, 10]}>
      <boxGeometry />
      <meshBasicMaterial color="black" />
    </mesh>
    <group scale={0.1}>
      <primitive object={model} />
    </group>
  </>
}
