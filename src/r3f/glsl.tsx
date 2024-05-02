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
    // center: null,
    // thickness: 1,
    // side: THREE.DoubleSide,
    // isRawShaderMaterial: true,
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

extend({ BasicSkinnedMeshMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      basicSkinnedMeshMaterial: Object3DNode<THREE.ShaderMaterial, typeof THREE.ShaderMaterial> & {
        // NOOP
      };
    }
  }
}
