import { OrbitControls } from '@react-three/drei';
import { BaseMesh246TriModel } from './Base-mesh-246-tri';
// import * as THREE from 'three';

export default function SkinnedMeshPoints() {

  // const {scene: model } = useGLTF('/assets/FinalBaseMesh.glb');
  // const {scene: model } = useGLTF('/assets/base-mesh-246-tri.glb');
  // console.log(model)

  return <>
    <OrbitControls/>
    <ambientLight />
    <mesh scale={[10, 0.01, 10]}>
      <boxGeometry />
      <meshBasicMaterial color="gray" />
    </mesh>
    <BaseMesh246TriModel/>
    {/* <group>
      <primitive object={model} />
    </group> */}
  </>
}
