const CLASS_PREFIX = 'md-chip';

const DEFAULTS = {
  DISABLED: false,
  ERROR: false,
  AVATAR: undefined,
  OUTLINE: false,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  disabled: `${CLASS_PREFIX}-disabled`,
  error: `${CLASS_PREFIX}-error`,
  rightSection: `${CLASS_PREFIX}-right-section`,
  leftSection: `${CLASS_PREFIX}-left-section`,
  centerSection: `${CLASS_PREFIX}-center-section`,
  avatar: `${CLASS_PREFIX}-avatar`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
