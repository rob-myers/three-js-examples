import BaseExample from './base-example';
import BoxParent from './box-parent';
import PositionProblemCanvas from './position-problem';
import MannequinTest from './mannequin-test';
import LoadTexture from './load-texture';

export const componentLookup = {
  BaseExample,
  BoxParent,
  PositionProblemCanvas,
  MannequinTest,
  LoadTexture,
};

export type ComponentKey = keyof typeof componentLookup;
