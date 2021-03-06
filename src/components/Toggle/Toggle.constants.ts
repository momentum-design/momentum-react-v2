const CLASS_PREFIX = 'md-toggle';

const DEFAULTS = {
  IS_DISABLED: false,
  DEFAULT_SELECTION: false,
  LABEL: undefined,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  toggle: `${CLASS_PREFIX}-switch`,
  on: `${CLASS_PREFIX}-on`,
  off: `${CLASS_PREFIX}-off`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
