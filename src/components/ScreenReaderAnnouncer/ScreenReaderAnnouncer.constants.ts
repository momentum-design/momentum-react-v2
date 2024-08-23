const CLASS_PREFIX = 'md-screen-reader-announcer';

const LEVELS = {
  ASSERTIVE: 'assertive',
  POLITE: 'polite',
};

const DEFAULTS = {
  IDENTITY: 'default',
  DELAY: 150,
  LEVEL: LEVELS.POLITE,
  TIMEOUT: 20_000,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE, LEVELS };
