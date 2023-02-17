const CLASS_PREFIX = 'md-button-pill';

const DEFAULTS = {
  COLOR: 'primary',
  DISABLED: false,
  SHALLOW_DISABLED: false,
  GHOST: false,
  GROWN: false,
  OUTLINE: false,
  SIZE: 40,
  SOLID: false,
};

const COLORS = {
  JOIN: 'join',
  CANCEL: 'cancel',
  MESSAGE: 'message',
};

const SIZES = {
  40: 40,
  32: 32,
  28: 28,
  24: 24,
  20: 20,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, COLORS, DEFAULTS, SIZES, STYLE };
