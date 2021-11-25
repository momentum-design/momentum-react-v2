const CLASS_PREFIX = 'md-list-item-base';

const SIZES = {
  32: 32,
  40: 40,
  50: 50,
  70: 70,
};

const SHAPES = {
  rectangle: 'rectangle',
  isPilled: 'isPilled',
};

const DEFAULTS = {
  SIZE: (shape: string): number => (shape === SHAPES.isPilled ? SIZES[50] : SIZES[40]),
  IS_DISABLED: false,
  IS_PADDED: false,
  SHAPE: SHAPES.rectangle,
  ROLE: 'listitem',
  SHOULD_ITEM_FOCUS_BE_INSET: false,
  INTERACTIVE: true,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  contextMenuWrapper: `${CLASS_PREFIX}-context-menu-wrapper`,
};

export { DEFAULTS, STYLE, SIZES, SHAPES };
