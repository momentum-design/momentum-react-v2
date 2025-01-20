import { NavKeyMapping } from './SpatialNavigationProvider.types';

export const SPATIAL_NAVIGATION_DIRECTION_KEYS = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
];

export const DEFAULTS = {
  SPATIAL_NAVIGATION_KEY_MAPPING: {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    up: 'ArrowUp',
    down: 'ArrowDown',
    back: 'Escape',
    enter: 'Enter',
  } as NavKeyMapping,
};
