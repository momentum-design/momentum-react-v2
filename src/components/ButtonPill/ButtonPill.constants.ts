const CLASS_PREFIX = 'md-button-pill';

const DEFAULTS = {
  COLOR: 'primary',
  DISABLED: false,
  GHOST: false,
  OUTLINE: false,
  SHAPE: 'pill',
  SIZE: 40,
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
};

const STYLE = {
  focusRing: `${CLASS_PREFIX}-focus-ring`,
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export {
  COLORS,
  DEFAULTS,
  SIZES,
  STYLE,
  CLASS_PREFIX,
};