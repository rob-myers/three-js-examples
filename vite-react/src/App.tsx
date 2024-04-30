import { Canvas } from '@react-three/fiber';
import BoxParent from './r3f/box-parent';
import tunnel from 'tunnel-rat'

import './App.css'

export default function App() {
  return (
    <>
      <div>
        Hello, World!
      </div>
      <div className='canvas-container'>
        <Canvas>
          <BoxParent />
        </Canvas>
        <tunnelRat.Out />
      </div>
    </>
  )
}

export const tunnelRat = tunnel();
