/**
 * Examples
 * - http://localhost:5173
 * - http://localhost:5173/?component=BoxParent
 * - http://localhost:5173/?component=BaseExample
 * - http://localhost:5173/?component=PositionProblem
 */
import React from 'react';
import { Canvas } from '@react-three/fiber';

import BaseExample from './r3f/base-example';
import BoxParent from './r3f/box-parent';
import PositionProblemCanvas from './r3f/position-problem';
import tunnel from 'tunnel-rat'

import './App.css'

export default function App() {

  const component = React.useMemo(() => {
    const key = new URLSearchParams(window.location.search).get('component') ?? '';
    return componentLookup[key as ComponentKey] ?? BoxParent;
  }, []);

  return (
    <div className='canvas-container'>
      {component.name?.endsWith('Canvas')
        ? React.createElement(component)
        : <Canvas>{React.createElement(component)}</Canvas>
      }
      <tunnelRat.Out />
    </div>
  );
}

export const tunnelRat = tunnel();

const componentLookup = {
  BaseExample,
  BoxParent,
  PositionProblemCanvas,
};

type ComponentKey = keyof typeof componentLookup;
