const CLASS_PREFIX = 'md-checkbox';

const DEFAULTS = {
  IS_SELECTED: false,
  IS_DISABLED: false,
  IS_INDETERMINATE: false,
  LABEL: undefined,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  selected: `${CLASS_PREFIX}-selected`,
  notSelected: `${CLASS_PREFIX}-not-selected`,
  focus: `${CLASS_PREFIX}-focus`,
  icon: `${CLASS_PREFIX}-icon`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
