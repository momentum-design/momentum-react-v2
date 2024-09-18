const CLASS_PREFIX = 'md-tab-list';

const DEFAULTS = {
  ORIENTATION: 'horizontal',
  ROLE: 'tablist',
  SPACED: 'false',
};

const KEYCODES = {
  ARROW_DOWN_KEY:'ArrowDown', 
  ARROW_LEFT_KEY:'ArrowLeft', 
  ARROW_RIGHT_KEY:'ArrowRight', 
  ARROW_UP_KEY:'ArrowUp', 
  TAB_KEY:'Tab',
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE, KEYCODES };
