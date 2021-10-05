const CLASS_PREFIX = 'md-navigation-tab';

const DEFAULTS = {
  SIZE: 48,
  COUNT: 0,
  ACTIVE: false,
};

const SIZES = {
  48: 48,
  200: 200,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  icon: `${CLASS_PREFIX}-icon`,
  label: `${CLASS_PREFIX}-label`,
  count: `${CLASS_PREFIX}-count`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE, SIZES };
