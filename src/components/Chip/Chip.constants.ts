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
  rightSection: `${CLASS_PREFIX}-rightSection`,
  leftSection: `${CLASS_PREFIX}-leftSection`,
  centerSection: `${CLASS_PREFIX}-centerSection`,
  avatar: `${CLASS_PREFIX}-avatar`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
