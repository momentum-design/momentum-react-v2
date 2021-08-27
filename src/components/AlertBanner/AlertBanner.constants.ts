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
  ISCENTERED: false,
  COLOR: 'default',
  ISGROWN: false,
  ISPILLED: false,
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
