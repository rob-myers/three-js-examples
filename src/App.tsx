/**
 * Examples
 * - http://localhost:5173
 * - http://localhost:5173/?component=BoxParent
 * - http://localhost:5173/?component=BaseExample
 * - http://localhost:5173/?component=PositionProblem
 */
import React from 'react';
import { Canvas } from '@react-three/fiber';
import tunnel from 'tunnel-rat'

import { ComponentKey, componentLookup } from './r3f';
import './App.css'

export default function App() {

  const component = React.useMemo(() => {
    const key = new URLSearchParams(window.location.search).get('component') ?? '';
    return componentLookup[key as ComponentKey] ?? componentLookup.BoxParent;
  }, []);

  return (
    <div className='canvas-container'>
      {component.name?.endsWith('Canvas')
        ? React.createElement(component)
        : (
          <Canvas>
            {React.createElement(component)}
          </Canvas>
        )
      }
      <tunnelRat.Out />
    </div>
  );
}

export const tunnelRat = tunnel();
