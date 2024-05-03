import React from 'react';
import * as THREE from 'three';
import { OrbitControls, Outlines, Wireframe } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import { tunnelRat } from '../App';
import { MixamoTest } from './character-shader-test/Mixamo-test';
import CharacterController from './character-shader-test/character-controller';
import { CustomWireframeMaterial } from './character-shader-test/glsl';

export default function BasicCharacterShaderTest() {

  const ccRef = React.useRef<CharacterController>(null);
  const ocRef = React.useRef<OrbitControlsType>(null);
  const [state, setState] = React.useState<State>({
    downAt: 0,
    effect: effects['drei-outlines'],
  });

  useFrame((_, deltaMs) => ccRef.current?.update(deltaMs));

  React.useEffect(() => {
    ocRef.current!.setPolarAngle(Math.PI/4);
  }, []);

  return <>
    <OrbitControls ref={ocRef} />
    <ambientLight />
    <mesh 
      name="ground"
      scale={[10, 0.01, 10]}
      onPointerDown={() => setState(s => ({...s, downAt: Date.now() }))}
      onClick={e => {
        if (Date.now() - state.downAt > 300) return;
        const characterController = ccRef.current!;
        characterController.setTarget(e.point);
        characterController.shouldRun = e.shiftKey;
      }}
    >
      <boxGeometry />
      <meshBasicMaterial color="gray" />
    </mesh>
    
    <MixamoTest
      ref={ccRef}
      skinnedMeshChildren={effectNodes[state.effect]}
    />

    <tunnelRat.In>
      <div style={{
        position: 'absolute',
        top: 0,
        fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif`,
        padding: 8,
      }}>
        <select
          value={state.effect}
          onChange={e => {
            const effect = e.currentTarget.value as Effect;
            setState(s => ({ ...s, effect }));
          }}
          style={{ fontSize: 16 }}
        >
          <option value={effects['drei-outlines']}>
            @react-three/drei Outlines
          </option>
          <option value={effects['drei-wireframe']}>
            @react-three/drei Wireframe
          </option>
          <option value={effects['drei-wireframe-filled']}>
            @react-three/drei Wireframe (filled)
          </option>
          <option value={effects['custom-wireframe']}>
            Custom wireframe (broken)
          </option>
        </select>
        <div style={{ padding: '8px 0 8px 12px' }}>
          Click floor to move
          &nbsp;
          <a href={links[state.effect]} target='_blank'>
            [source]
          </a>
        </div>
        </div>
    </tunnelRat.In>
  </>
}

interface State {
  downAt: number;
  effect: Effect;
}

const effects = {
  'drei-outlines': 'drei-outlines',
  'drei-wireframe': 'drei-wireframe',
  'drei-wireframe-filled': 'drei-wireframe-filled',
  'custom-wireframe': 'custom-wireframe',
} as const;

const links: Record<Effect, string> = {
  'drei-outlines': 'https://github.com/pmndrs/drei?tab=readme-ov-file#outlines',
  'drei-wireframe': 'https://github.com/pmndrs/drei?tab=readme-ov-file#wireframe',
  'drei-wireframe-filled': 'https://github.com/pmndrs/drei?tab=readme-ov-file#wireframe',
  'custom-wireframe': 'https://threejs.org/examples/webgl_materials_wireframe',
};

const effectNodes: Record<Effect, React.ReactNode> = {
  'drei-outlines': <Outlines thickness={0.05} color="black" />,
  'drei-wireframe': (
    <Wireframe
      thickness={0.2}
      // simplify={true}
      fillOpacity={0}
      opacity={0}
      fillMix={1}
      stroke="black"
      backfaceStroke="black"
      fill="#fff"
      colorBackfaces={false}                
    />
  ),
  'drei-wireframe-filled': (
    <Wireframe
      thickness={0.2}
      // simplify={true}
      fillOpacity={1}
      opacity={0}
      fillMix={1}
      stroke="black"
      backfaceStroke="black"
      fill="#fff"
      colorBackfaces={false}                
    />
  ),
  'custom-wireframe': (
    <customWireframeMaterial
      key={CustomWireframeMaterial.key}
      alphaToCoverage
      side={THREE.DoubleSide}
      thickness={2}
    />
  ),
};

type Effect = keyof typeof effects;
