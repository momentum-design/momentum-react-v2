const CLASS_PREFIX = 'md-aria-toolbar';

const DEFAULTS = {
  ORIENTATION: 'horizontal' as const,
  SHOULD_RENDER_AS_BUTTON_GROUP: false,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
