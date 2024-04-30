import { PerspectiveCamera, MapControls } from "@react-three/drei";

export default function BaseExample() {
  return <>
    <PerspectiveCamera />
    <MapControls />
    <group>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="blue" />
      </mesh>
    </group>
  </>
}
