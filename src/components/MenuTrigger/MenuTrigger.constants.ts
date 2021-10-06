const CLASS_PREFIX = 'md-menu-trigger';

const DEFAULTS = {
  BACKGROUND: 'primary' as const,
  OVERLAY_RADIUS: 75 as const,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  overlay: `${CLASS_PREFIX}-overlay`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
