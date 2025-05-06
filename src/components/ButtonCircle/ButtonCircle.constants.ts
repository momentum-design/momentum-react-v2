const CLASS_PREFIX = 'md-button-circle';

const DEFAULTS = {
  COLOR: 'primary',
  DISABLED: false,
  SHALLOW_DISABLED: false,
  GHOST: false,
  OUTLINE: false,
  SIZE: 40,
  INVERTED: false,
} as const;

const COLORS = {
  JOIN: 'join',
  CANCEL: 'cancel',
  MESSAGE: 'message',
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  widthOverride: `${CLASS_PREFIX}-width-override`,
};

export { CLASS_PREFIX, COLORS, DEFAULTS, STYLE };
