import type { Round } from './Popover.types';

const CLASS_PREFIX = 'md-popover';

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
  IS_PADDED: true,
  ROUND: ROUNDS[0],
  COLOR: 'primary',
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  arrowWrapper: `${CLASS_PREFIX}-arrow-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
