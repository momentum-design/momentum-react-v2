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
  SHOWTOOLTIP: false,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  contextMenuWrapper: `${CLASS_PREFIX}-context-menu-wrapper`,
};

const KEYS = {
  TAB_KEY: 'Tab',
  ENTER_KEY: 'Enter',
  SPACE_KEY: ' ',
  LEFT_KEY: 'ArrowLeft',
  UP_KEY: 'ArrowUp',
  RIGHT_KEY: 'ArrowRight',
  DOWN_KEY: 'ArrowDown',
};

export { DEFAULTS, KEYS, STYLE, SIZES, SHAPES };
