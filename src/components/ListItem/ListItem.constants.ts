const CLASS_PREFIX = 'md-list-item';

const SIZES = {
  32: 32,
  40: 40,
  50: 50,
};

const SHAPES = {
  rectangle: 'rectangle',
  rounded: 'rounded',
};

const DEFAULTS = {
  SIZE: SIZES[40],
  IS_DISABLED: false,
  SHAPE: SHAPES.rectangle,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  focusRing: `${CLASS_PREFIX}-focus-ring`,
};

export { DEFAULTS, STYLE, SIZES, SHAPES };
