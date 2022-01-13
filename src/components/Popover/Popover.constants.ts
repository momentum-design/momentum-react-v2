import { PLACEMENTS } from '../ModalArrow/ModalArrow.constants';
import type { Round, Color, Elevation } from './Popover.types';

const CLASS_PREFIX = 'md-popover';

const COLORS: Record<string, Color> = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  QUATERNARY: 'quaternary',
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
  TRIGGER: 'click',
  PLACEMENT: PLACEMENTS.BOTTOM as string,
  SHOW_ARROW: true,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  arrowWrapper: `${CLASS_PREFIX}-arrow-wrapper`,
};

// default offset between popover and trigger component:
const OFFSET = 5;

export { CLASS_PREFIX, DEFAULTS, STYLE, COLORS, ELEVATIONS, OFFSET };
