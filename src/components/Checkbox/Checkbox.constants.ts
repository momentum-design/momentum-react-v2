const CLASS_PREFIX = 'md-checkbox';

const DEFAULTS = {
  IS_SELECTED: false,
  DISABLED: false,
  IS_INDETERMINATE: false,
  LABEL: undefined,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  selected: `${CLASS_PREFIX}-selected`,
  notSelected: `${CLASS_PREFIX}-notSelected`,
  icon: `${CLASS_PREFIX}-icon`,
  label: `${CLASS_PREFIX}-label`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
