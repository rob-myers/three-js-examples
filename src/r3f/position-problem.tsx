import React from 'react';
import { useThree, Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/**
 * https://discourse.threejs.org/t/how-do-i-translate-some-x-y-z-positions-of-a-cell-to-fall-inside-my-scene/64639/6
 */
export default function PositionProblemCanvas() {
  return (
    <Canvas camera={{ fov: 100, near: 0.01, far: 10000 }}>
      <OrbitControls
        minDistance={2}
        maxDistance={5}
        enablePan
        enableZoom
      />
      <PositionProblem/>
    </Canvas>
  );
}

function PositionProblem() {

  const { scene, gl: renderer } = useThree();
  
  React.useEffect(() => {
    // Clear scene on HMR
    scene.children.slice().forEach(c => c.removeFromParent());

    const geometries = [
      new THREE.BoxGeometry( 1, 1, 1 ),
      new THREE.SphereGeometry( 0.5, 12, 8 ),
      //new THREE.DodecahedronGeometry( 0.5 ),
      new THREE.IcosahedronGeometry( 0.3, 6 ),
      new THREE.CircleGeometry( 1, 49 ),
      new THREE.CylinderGeometry( 0.5, 0.5, 1, 12 )
    ];

    const geometry = geometries[2];

    // Cell1, Cell2, Cell3
    const cellArray = [ {x: "73" , y: "271" }, {x: "243" , y: "245" }, {x: "294" , y: "120" }];
    for (let j=0; j < cellArray.length; j++) {
      // let material = new THREE.MeshStandardMaterial( {
      //   color: new THREE.Color().setHSL( Math.random(), 1, 0.75, THREE.SRGBColorSpace ),
      //   roughness: 0.0,
      //   metalness: 0,
      //   flatShading: true
      // }); 
      const material = new THREE.MeshPhongMaterial( { color: new THREE.Color().setHSL( Math.random(), 1, 0.75, THREE.SRGBColorSpace ), transparent: true, opacity: 1.0} );

      const x = parseFloat(cellArray[j].x);
      const y = parseFloat(cellArray[j].y);
      const mesh = new THREE.Mesh( geometry, material );
      // mesh.position.set( x, y, 0);
      mesh.position.set( x / 100, y / 100, 0);
      // mesh.position.set( 0, 0, 0 );
      scene.add( mesh );
    }

    scene.add(new THREE.HemisphereLight( 0xaaaaaa, 0x444444, 3 ));
    const light = new THREE.DirectionalLight( 0xffffff, 1.5 );
    light.position.set( 1, 1, 1 );
    scene.add( light );

    renderer.setClearColor( 0xffffff, 1 );
    renderer.setPixelRatio( window.devicePixelRatio );

  }, []);

  return null;
}
