/* eslint-disable @typescript-eslint/no-namespace */
import * as THREE from "three";
import { Object3DNode, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

/**
 * Basic SkinnedMesh Shader
 * https://jsfiddle.net/h02s5n14/4/
 */
export const BasicSkinnedMeshMaterial = shaderMaterial(
  {
    // NOOP
  },
  /* glsl */`
  #include <skinning_pars_vertex>

  void main() {
    #include <skinbase_vertex>
    #include <begin_vertex>
    #include <skinning_vertex>
    #include <project_vertex>
  }
  `,
  /* glsl */`
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
  `,
);

/**
 * 🚧 not working i.e. extra faces are being shown
 * Based on: https://threejs.org/examples/webgl_materials_wireframe
 */
export const CustomWireframeMaterial = shaderMaterial(
  {
    thickness: 2,
  },
  /* glsl */`
  attribute vec3 center;
  varying vec3 vCenter;

  #include <skinning_pars_vertex>

  void main() {
    vCenter = center;

    #include <skinbase_vertex>
    #include <begin_vertex>
    #include <skinning_vertex>
    #include <project_vertex>
  }
  `,
  /* glsl */`
  uniform float thickness;
  varying vec3 vCenter;

  void main() {

    vec3 afwidth = fwidth( vCenter.xyz );
    vec3 edge3 = smoothstep( ( thickness - 1.0 ) * afwidth, thickness * afwidth, vCenter.xyz );
    float edge = 1.0 - min( min( edge3.x, edge3.y ), edge3.z );

    gl_FragColor.rgb = gl_FrontFacing ? vec3( 0.9, 0.9, 1.0 ) : vec3( 0.4, 0.4, 0.5 );
    gl_FragColor.a = edge;
  }
  `,
);


extend({
  BasicSkinnedMeshMaterial,
  CustomWireframeMaterial,
});

declare global {
  namespace JSX {
    interface IntrinsicElements {
      basicSkinnedMeshMaterial: Object3DNode<THREE.ShaderMaterial, typeof THREE.ShaderMaterial> & {
        // NOOP
      };
      customWireframeMaterial: Object3DNode<THREE.ShaderMaterial, typeof THREE.ShaderMaterial> & {
        thickness?: number;
      };
    }
  }
}
