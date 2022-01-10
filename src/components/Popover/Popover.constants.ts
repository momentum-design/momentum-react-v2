import type { Round, Color, PlacementType, Elevation } from './Popover.types';

const CLASS_PREFIX = 'md-popover';

const COLORS: Record<string, Color> = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  QUATERNARY: 'quaternary',
};

const PLACEMENTS: Record<string, PlacementType> = {
  TOP: 'top',
  TOP_START: 'top-start',
  TOP_END: 'top-end',
  RIGHT: 'right',
  RIGHT_START: 'right-start',
  RIGHT_END: 'right-end',
  BOTTOM: 'bottom',
  BOTTOM_START: 'bottom-start',
  BOTTOM_END: 'bottom-end',
  LEFT: 'left',
  LEFT_START: 'left-start',
  LEFT_END: 'left-end',

  // choose the side with most space:
  AUTO: 'auto',
  AUTO_START: 'auto-start',
  AUTO_END: 'auto-end',
};

const ROUNDS: Record<number, Round> = {
  0: 0,
  25: 25,
  50: 50,
  75: 75,
  100: 100,
  125: 125,
  150: 150,
};

const ELEVATIONS: Record<number, Elevation> = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
};

const DEFAULTS = {
  IS_PADDED: true,
  ROUND: ROUNDS[0],
  ELEVATION: ELEVATIONS[0],
  COLOR: 'primary',
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  arrowWrapper: `${CLASS_PREFIX}-arrow-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE, COLORS, PLACEMENTS, ELEVATIONS };
