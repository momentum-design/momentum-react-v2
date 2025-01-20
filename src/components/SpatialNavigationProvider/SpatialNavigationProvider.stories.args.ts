import { DEFAULTS } from './SpatialNavigationProvider.constants';
import { NavKeyMapping } from './SpatialNavigationProvider.types';

export const AWSD_KEY_MAPPING = {
  ...DEFAULTS.SPATIAL_NAVIGATION_KEY_MAPPING,
  back: 'Backspace',
} as NavKeyMapping;

export default {
  back: {
    defaultValue: DEFAULTS.SPATIAL_NAVIGATION_KEY_MAPPING.back,
    description: 'Select "back" navigation key mapping',
    control: { type: 'select' },
    options: [DEFAULTS.SPATIAL_NAVIGATION_KEY_MAPPING.back, 'Backspace'],
  },
};
