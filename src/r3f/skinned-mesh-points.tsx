import { OrbitControls, useGLTF } from '@react-three/drei';
// import * as THREE from 'three';

export default function SkinnedMeshPoints() {

  // const {scene: model } = useGLTF('/assets/FinalBaseMesh.glb');
  const {scene: model } = useGLTF('/assets/base-mesh-246-tri.glb');

  console.log(model)

  return <>
    <OrbitControls/>
    <ambientLight />
    <mesh scale={[10, 0.01, 10]}>
      <boxGeometry />
      <meshBasicMaterial color="gray" />
    </mesh>
    <group>
      <primitive object={model} />
    </group>
  </>
}
