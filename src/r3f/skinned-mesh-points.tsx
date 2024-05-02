import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { BaseMesh246TriModel } from './Mixamo-test';
import CharacterController from './character-controller';
import { useFrame, useThree } from '@react-three/fiber';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';

export default function SkinnedMeshPoints() {

  const { set } = useThree();
  const ccRef = React.useRef<CharacterController>(null);
  const ocRef = React.useRef<OrbitControlsType>(null);

  useFrame((_, deltaMs) => ccRef.current?.update(deltaMs));

  React.useEffect(() => {
    ocRef.current!.setPolarAngle(Math.PI/4);
    set({ frameloop: 'always' });
  }, []);

  return <>
    <OrbitControls ref={ocRef} />
    <ambientLight />
    <mesh 
      name="ground"
      scale={[10, 0.01, 10]}
      onClick={e => {
        const characterController = ccRef.current!;
        characterController.setTarget(e.point);
        characterController.shouldRun = e.shiftKey;
      }}
    >
      <boxGeometry />
      <meshBasicMaterial color="gray" />
    </mesh>
    
    <BaseMesh246TriModel ref={ccRef} />

  </>
}
