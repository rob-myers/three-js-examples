import React from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber';
import CharacterController from './character-controller';

const glbPath = '/assets/mixamo-test-transformed.glb';

/**
 * ```sh
 * npx gltfjsx mixamo-test.glb  --transform
 * ```
 */
export const MixamoTest = React.forwardRef<CharacterController, GroupProps>(
  function BaseMesh246TriModel(props, ref) {
    const groupRef = React.useRef<THREE.Group>(null);
    const ctrlRef = React.useRef<CharacterController>();
    
    const imported = useGLTF(glbPath);
    const nodes = imported.nodes as typeof imported.nodes & {
      Cube: {
        geometry: THREE.BufferGeometry;
        material: THREE.Material;
        skeleton: THREE.Skeleton;
      }
    };

    React.useEffect(() => {
      const model = groupRef.current!;
      const mixer = new THREE.AnimationMixer(model);
      const animationMap = {} as Record<import("./character-controller").AnimKey, THREE.AnimationAction>;
      imported.animations.forEach(a => {
        console.info('saw animation:', a.name);
        if (a.name === 'Idle' || a.name === 'Walk' || a.name === 'Run') {
          animationMap[a.name] = mixer.clipAction(a);
        }
      });
      ctrlRef.current = new CharacterController({
        model,
        mixer,
        animationMap,
        initialAction: 'Idle',
      });

      if (ref) {
        typeof ref === 'function' ? ref(ctrlRef.current) : (ref.current = ctrlRef.current);
      }
    }, []);

    return (
      <group ref={groupRef} {...props} dispose={null}>
        <group name="Scene">
          <group name="metarig" position={[-0.076, -0.095, -0.196]} rotation={[0.095, 0.05, -0.049]} scale={1.333}>
            <primitive object={nodes.spine} />
            <skinnedMesh name="Cube" geometry={nodes.Cube.geometry} material={nodes.Cube.material} skeleton={nodes.Cube.skeleton} />
          </group>
        </group>
      </group>
    );
  },
);

useGLTF.preload(glbPath);
