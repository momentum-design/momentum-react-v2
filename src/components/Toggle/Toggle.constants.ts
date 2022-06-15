const CLASS_PREFIX = 'md-toggle';

const DEFAULTS = {
  IS_DISABLED: false,
  IS_SELECTED: false,
  LABEL: undefined,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  toggle: `${CLASS_PREFIX}-switch`,
  label: `${CLASS_PREFIX}-label`,
  disabled: `${CLASS_PREFIX}--disabled`,
  focused: `${CLASS_PREFIX}--focused`,
  on: `${CLASS_PREFIX}--on`,
  off: `${CLASS_PREFIX}--off`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
