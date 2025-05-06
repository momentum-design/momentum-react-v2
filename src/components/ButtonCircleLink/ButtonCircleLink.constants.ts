import { Size } from './ButtonCircleLink.types';
const CLASS_PREFIX = 'md-button-circle-link';

const DEFAULTS = {
  COLOR: 'primary',
  DISABLED: false,
  SHALLOW_DISABLED: false,
  GHOST: false,
  OUTLINE: false,
  SIZE: 40,
  INVERTED: false,
};

const COLORS = {
  JOIN: 'join',
  CANCEL: 'cancel',
  MESSAGE: 'message',
};

const SIZES: Record<number, Size> = {
  64: 64,
  52: 52,
  40: 40,
  32: 32,
  28: 28,
  20: 20,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, STYLE, DEFAULTS, COLORS, SIZES };
