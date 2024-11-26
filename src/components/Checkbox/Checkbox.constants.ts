const CLASS_PREFIX = 'md-checkbox';

const DEFAULTS = {
  IS_SELECTED: false,
  IS_DISABLED: false,
  IS_INDETERMINATE: false,
  LABEL: undefined,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  label: `${CLASS_PREFIX}-label`,
  selected: `${CLASS_PREFIX}-selected`,
  notSelected: `${CLASS_PREFIX}-not-selected`,
  focus: `${CLASS_PREFIX}-focus`,
  icon: `${CLASS_PREFIX}-icon`,
  description: `${CLASS_PREFIX}-description`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
