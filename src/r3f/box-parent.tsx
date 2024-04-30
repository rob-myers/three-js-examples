/**
 * https://discourse.threejs.org/t/box3-setfromobject-parent-scene-add-box-vs-parent-add-box/64817/3
 */
import React from "react";
import * as THREE from "three";
import { PerspectiveCamera, MapControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { tunnelRat } from "../App";

export default function BoxParent() {
  const [state, setState] = React.useState(
    () =>
      ({
        box3: new THREE.Box3(),
        parentType: 'scene',
      } as State)
  );

  useFrame(() => {
    state.mesh.rotateY(0.01);
    state.box3
      .copy(state.mesh.geometry.boundingBox as THREE.Box3)
      .applyMatrix4(state.mesh.matrixWorld);
  });

  React.useEffect(() => {
    state.controls.setPolarAngle(Math.PI / 4);
    state.mesh.geometry.computeBoundingBox();
  }, []);

  return (
    <>
      <PerspectiveCamera />
      <MapControls ref={(x) => x && (state.controls = x)} />
      <group ref={(x) => x && (state.root = x)}>
        <mesh ref={(x) => x && (state.mesh = x)} scale={2}>
          <boxGeometry />
          <meshBasicMaterial color="red" />
          {state.parentType === 'mesh' && <box3Helper
            args={[state.box3, "blue"]}
            ref={(x) => x && (state.box3Helper = x)}
          />}
        </mesh>
        {state.parentType === 'scene' && <box3Helper
          args={[state.box3, "blue"]}
          ref={(x) => x && (state.box3Helper = x)}
        />}
        <tunnelRat.In>
          <div style={{ position: 'absolute', top: 0 }}>
            <select onChange={e => {
              const next = e.currentTarget.value as State['parentType'];
              setState(s => ({ ...s, parentType: next }))
            }}>
              <option value="scene">Box3 child of scene</option>
              <option value="mesh">Box3 child of mesh</option>
            </select>
          </div>
        </tunnelRat.In>
      </group>
    </>
  );
}

interface State {
  root: THREE.Group;
  mesh: THREE.Mesh;
  box3: THREE.Box3;
  box3Helper: THREE.Box3Helper;
  controls: import("three-stdlib").MapControls;
  parentType: 'scene' | 'mesh';
}
