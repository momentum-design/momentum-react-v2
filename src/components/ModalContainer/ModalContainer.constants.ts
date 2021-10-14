import { Arrow, Color, Elevation, Round } from './ModalContainer.types';

const CLASS_PREFIX = 'md-modal-container';

const ARROWS: Record<string, Arrow> = {
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
};

const COLORS: Record<string, Color> = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  QUATERNARY: 'quaternary',
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

const ROUNDS: Record<number, Round> = {
  0: 0,
  25: 25,
  50: 50,
  75: 75,
  100: 100,
  125: 125,
  150: 150,
};

const DEFAULTS = {
  COLOR: COLORS.PRIMARY,
  ELEVATION: ELEVATIONS[0],
  IS_PADDED: false,
  ROUND: ROUNDS[0],
};

const STYLE = {
  content: `${CLASS_PREFIX}-content`,
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { ARROWS, CLASS_PREFIX, COLORS, DEFAULTS, ELEVATIONS, ROUNDS, STYLE };
