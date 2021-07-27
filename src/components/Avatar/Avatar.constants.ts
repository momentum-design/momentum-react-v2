const CLASS_PREFIX = 'md-avatar';

const SIZES = {
  24: 24,
  32: 32,
  48: 48,
  72: 72,
  88: 88,
  124: 124,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  iconWrapper: `${CLASS_PREFIX}-iconWrapper`,
};

const DEFAULTS = {
  SIZE: SIZES[24],
  COLOR: 'default',
};

export { DEFAULTS, SIZES, STYLE, CLASS_PREFIX };
