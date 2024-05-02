import React from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function LoadTexture() {

  const { scene } = useThree();

  async function init() {
    const loader = new THREE.TextureLoader();
    const texture = await loader.loadAsync('/assets/earth-from-space.jpeg');
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), material);
    scene.add(mesh);
  }

  React.useEffect(() => {
    scene.remove(...scene.children.filter(x => x instanceof THREE.Mesh));
    init();
  }, []);

  return <>
    <OrbitControls />
    <ambientLight />
  </>
}