// import * as THREE from "three";
import React from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Male, setScene } from './mannequin';

export default function MannequinTest() {

  const { scene } = useThree();

  React.useEffect(() => {
    setScene(scene);
    const man = new Male()
    man.scale.set(0.1, 0.1, 0.1);
  }, []);

  return <>
    <OrbitControls />
    <ambientLight />
  </>;
}
