const CLASS_PREFIX = 'md-alert-banner';

const COLORS = {
  DEFAULT: 'default',
  ERROR: 'error',
  SUCCESS: 'success',
  THEME: 'theme',
  WARNING: 'warning',
};

const SIZES = {
  DEFAULT: 'default',
  SMALL: 'small',
};

const DEFAULTS = {
  COLOR: 'default',
  IS_CENTERED: false,
  IS_GROWN: false,
  IS_PILLED: false,
  IS_STATIC: false,
  SIZE: 'default',
};

const STYLE = {
  button: `${CLASS_PREFIX}-button`,
  buttons: `${CLASS_PREFIX}-buttons`,
  image: `${CLASS_PREFIX}-image`,
  label: `${CLASS_PREFIX}-label`,
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, COLORS, DEFAULTS, SIZES, STYLE };
