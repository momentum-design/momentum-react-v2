import { PLACEMENTS } from '../ModalArrow/ModalArrow.constants';
import type { Color, Elevation, Round } from './ModalContainer.types';

const CLASS_PREFIX = 'md-modal-container';

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
  SHOW_ARROW: false,
  PLACEMENT: PLACEMENTS.AUTO as string,
  ROLE: 'dialog',
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  arrowWrapper: `${CLASS_PREFIX}-arrow-wrapper`,
};

const ARROW_ID = 'arrow';

export { CLASS_PREFIX, COLORS, DEFAULTS, ELEVATIONS, ROUNDS, STYLE, ARROW_ID };
