import React from 'react';
import { OrbitControls, Outlines, Wireframe } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import { tunnelRat } from '../App';
import { MixamoTest } from './character-shader-test/Mixamo-test';
import CharacterController from './character-shader-test/character-controller';

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
        fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif`
      }}>
        <select onChange={e => {
          const effect = e.currentTarget.value as Effect;
          setState(s => ({ ...s, effect }));
        }}>
          <option value={effects['drei-outlines']}>
            @react-three/drei Outlines
          </option>
          <option value={effects['drei-wireframe']}>
            @react-three/drei Wireframe
          </option>
          <option value={effects['custom-wireframe']}>
            Custom wireframe
          </option>
        </select>
        &nbsp;
        &nbsp;
        <a href={links[state.effect]} target='_blank'>
          Source
        </a>
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
  'custom-wireframe': 'custom-wireframe',
} as const;

const links: Record<Effect, string> = {
  'drei-outlines': 'https://github.com/pmndrs/drei?tab=readme-ov-file#outlines',
  'drei-wireframe': 'https://github.com/pmndrs/drei?tab=readme-ov-file#wireframe',
  'custom-wireframe': 'https://threejs.org/examples/webgl_materials_wireframe',
};

const effectNodes: Record<Effect, React.ReactNode> = {
  'drei-outlines': <Outlines thickness={0.05} color="black" />,
  'drei-wireframe': (
    <Wireframe
      thickness={0.2}
      fillOpacity={1}
      opacity={0}
      fillMix={1}
      stroke="black"
      backfaceStroke="black"
      fill="#fff"
      simplify={true}
      colorBackfaces={false}                
      // strokeOpacity={0}
    />
  ),
  'custom-wireframe': null,
};

type Effect = keyof typeof effects;
