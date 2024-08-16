import { Size } from './ButtonCircle.types';

const CLASS_PREFIX = 'md-button-circle';

const DEFAULTS = {
  COLOR: 'primary',
  DISABLED: false,
  SHALLOW_DISABLED: false,
  GHOST: false,
  OUTLINE: false,
  SIZE: 40,
  INVERTED: false,
  ONLY_TRIGGERS_TOOLTIP: false,
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

export { CLASS_PREFIX, COLORS, DEFAULTS, SIZES, STYLE };
