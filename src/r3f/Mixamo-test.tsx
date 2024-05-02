import React from 'react';
import * as THREE from 'three';
import {
  useGLTF,
  // Outlines,
  Wireframe,
} from '@react-three/drei'
import { GroupProps, useThree } from '@react-three/fiber';
import CharacterController from './character-controller';
// import { BasicSkinnedMeshMaterial } from './glsl';

// const glbPath = '/assets/mixamo-test-transformed.glb';
const glbPath = '/assets/mixamo-test.glb';

/**
 * ```sh
 * npx gltfjsx mixamo-test.glb  --transform
 * ```
 */
export const MixamoTest = React.forwardRef<CharacterController, GroupProps>(
  function BaseMesh246TriModel(props, ref) {
    const groupRef = React.useRef<THREE.Group>(null);
    const ctrlRef = React.useRef<CharacterController>();
    const skinnedMeshRef = React.useRef<THREE.SkinnedMesh>(null);
    
    const imported = useGLTF(glbPath);
    const nodes = imported.nodes as typeof imported.nodes & {
      Cube: {
        geometry: THREE.BufferGeometry;
        material: THREE.Material;
        skeleton: THREE.Skeleton;
      }
    };

    const { gl } = useThree();

    React.useMemo(() => {
      gl.getContext().getExtension('OES_standard_derivatives');
      const geometry = nodes.Cube.geometry;
      // geometry.deleteAttribute('normal');
      console.log(geometry.attributes);
      const basis = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];
      const position = geometry.attributes.position;
      const centers = new Float32Array( position.count * 3 );
      for (let i = 0, l = position.count; i < l; i ++)
        basis[i % 3].toArray(centers, i * 3);
      geometry.setAttribute('center', new THREE.BufferAttribute(centers, 3));
    }, []);

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
      <group key={0} ref={groupRef} {...props} dispose={null}>
        <group name="Scene">
          <group
            name="metarig"
            position={[-0.076, -0.095, -0.196]}
            rotation={[0.095, 0.05, -0.049]}
            scale={1.333}
          >
            <primitive object={nodes.spine} />
            <skinnedMesh
              ref={skinnedMeshRef}
              name="Cube"
              geometry={nodes.Cube.geometry}
              // material={nodes.Cube.material}
              skeleton={nodes.Cube.skeleton}
            >
              {/* <Outlines thickness={0.05} color="black" /> */}
              {/* <basicSkinnedMeshMaterial
                key={BasicSkinnedMeshMaterial.key}
              /> */}
              <meshBasicMaterial transparent />
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
            </skinnedMesh>
          </group>
        </group>
      </group>
    );
  },
);

useGLTF.preload(glbPath);
