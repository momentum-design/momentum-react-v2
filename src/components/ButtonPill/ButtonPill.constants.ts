const CLASS_PREFIX = 'md-button-pill';

const DEFAULTS = {
  COLOR: 'primary',
  DISABLED_OUTLINE: false,
  SHALLOW_DISABLED: false,
  GHOST: false,
  GROWN: false,
  OUTLINE: false,
  SIZE: 40,
  STOP_PROPAGATION: true,
} as const;

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
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, COLORS, DEFAULTS, SIZES, STYLE };
