const CLASS_PREFIX = 'md-button-pill-link';

const DEFAULTS = {
  COLOR: 'primary',
  DISABLED: false,
  DISABLED_OUTLINE: false,
  SHALLOW_DISABLED: false,
  GHOST: false,
  GROWN: false,
  OUTLINE: false,
  SIZE: 40,
  INVERTED: false,
} as const;

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, STYLE, DEFAULTS };
