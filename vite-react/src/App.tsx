import React from 'react'
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import './App.css'

function App() {
  return (
    <>
      <div>
        Hello, World!
      </div>
      <div style={{ width: 600, height: 400, border: '1px solid #888' }}>
        <Canvas>
          <PerspectiveCamera/>
          <OrbitControls/>
          <mesh>
            <boxGeometry/>
            <meshBasicMaterial color="red" />
          </mesh>
        </Canvas>
      </div>
    </>
  )
}

export default App
