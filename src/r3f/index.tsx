import BaseExample from './base-example';
import BoxParent from './box-parent';
import PositionProblemCanvas from './position-problem';
import MannequinTest from './mannequin-test';
import DreiSamplerTest from './drei-sampler-test';
import LoadTexture from './load-texture';
import CharacterShaderTest from './character-shader-test';

export const componentLookup = {
  BaseExample,
  BoxParent,
  PositionProblemCanvas,
  MannequinTest,
  DreiSamplerTest,
  LoadTexture,
  CharacterShaderTest,
};

export type ComponentKey = keyof typeof componentLookup;
