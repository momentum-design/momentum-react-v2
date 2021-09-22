const CLASS_PREFIX = 'md-list-item-base';

const SIZES = {
  32: 32,
  40: 40,
  50: 50,
};

const SHAPES = {
  rectangle: 'rectangle',
  isPilled: 'isPilled',
  rectangleNoPadding: 'rectangleNoPadding',
};

const DEFAULTS = {
  SIZE: (shape: string): number => (shape === SHAPES.isPilled ? SIZES[50] : SIZES[40]),
  IS_DISABLED: false,
  SHAPE: SHAPES.rectangle,
  ROLE: 'listitem',
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { DEFAULTS, STYLE, SIZES, SHAPES };
