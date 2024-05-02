import { OrbitControls, Sampler, TransformFn } from "@react-three/drei";

export default function DreiSamplerTest() {
  return <>
    <OrbitControls
      onUpdate={x => x.setPolarAngle(Math.PI * (3 / 8))}
    />
    <ambientLight />
    <Sampler
      weight={"normal"} // the name of the attribute to be used as sampling weight
      transform={transformInstance} // a function that transforms each instance given a sample. See the examples for more.
      count={count} // Number of samples
    >
      <mesh>
        <sphereGeometry args={[1]} />
        <meshStandardMaterial color="blue" wireframe />
      </mesh>

      <instancedMesh args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="red" wireframe />
      </instancedMesh>
    </Sampler>
  </>;
}

function transformInstance({ dummy }: TransformPayload, i: number) {
  dummy.position.set(Math.cos((2 * Math.PI) * (i / count)), 0, Math.sin((2 * Math.PI) * (i / count)));
}

type TransformPayload = Parameters<TransformFn>[0];

const count = 16;
