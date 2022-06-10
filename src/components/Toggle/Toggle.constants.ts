const CLASS_PREFIX = 'md-toggle';

const DEFAULTS = {
  IS_DISABLED: false,
  IS_SELECTED: false,
  LABEL: undefined,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  toggle: `${CLASS_PREFIX}-switch`,
  disabled: `${CLASS_PREFIX}-disabled`,
  focused: `${CLASS_PREFIX}-focused`,
  on: `${CLASS_PREFIX}-on`,
  off: `${CLASS_PREFIX}-off`,
  label: `${CLASS_PREFIX}-label`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
