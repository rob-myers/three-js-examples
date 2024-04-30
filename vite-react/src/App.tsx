/**
 * Examples
 * - http://localhost:5173
 * - http://localhost:5173/?component=BoxParent
 * - http://localhost:5173/?component=BaseExample
 */
import React from 'react';
import { Canvas } from '@react-three/fiber';
import BaseExample from './r3f/base-example';
import BoxParent from './r3f/box-parent';
import tunnel from 'tunnel-rat'

import './App.css'

export default function App() {

  const ChildComponent = React.useMemo(() => {
    const search = new URLSearchParams(window.location.search);
    return componentLookup[search.get('component') as ComponentKey] ?? BoxParent;
  }, []);

  return (
    <>
      <div>
        Hello, World!
      </div>
      <div className='canvas-container'>
        <Canvas>
          {React.createElement(ChildComponent)}
        </Canvas>
        <tunnelRat.Out />
      </div>
    </>
  )
}

export const tunnelRat = tunnel();

const componentLookup = {
  BaseExample,
  BoxParent,
};

type ComponentKey = keyof typeof componentLookup;