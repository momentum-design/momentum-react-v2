const CLASS_PREFIX = 'md-button-group';

const DEFAULTS = {
  ROUND: false,
  SPACED: false,
  COMPRESSED: false,
  SEPARATOR: false,
  ORIENTATION: 'horizontal',
};

const CHILD_OF = {
  KEY: 'data-mrv2-childof',
  VALUE: 'button-group',
} as const;

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  separator: `${CLASS_PREFIX}-separator`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE, CHILD_OF };
