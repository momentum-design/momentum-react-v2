const THEME_CLASS_PREFIX = 'md-theme';
const THEME_CLASS_PREFIX_STABLE = 'mds-theme-stable';
const CLASS_PREFIX = `${THEME_CLASS_PREFIX}-provider`;

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  globals: `${CLASS_PREFIX}-globals`,
  // momentum-design typography class to be set
  typography: 'mds-typography',
  elevation: 'mds-elevation',
};

// Some themes are disabled until tokens are properly imported.
const THEME_NAMES = {
  DARK_BRONZE: 'darkBronzeWebex',
  DARK_INDIGO: 'darkIndigoWebex',
  DARK_JADE: 'darkJadeWebex',
  DARK_LAVENDER: 'darkLavenderWebex',
  DARK_ROSE: 'darkRoseWebex',
  DARK_WEBEX: 'darkWebex',
  LIGHT_BRONZE: 'lightBronzeWebex',
  LIGHT_INDIGO: 'lightIndigoWebex',
  LIGHT_JADE: 'lightJadeWebex',
  LIGHT_LAVENDER: 'lightLavenderWebex',
  LIGHT_ROSE: 'lightRoseWebex',
  LIGHT_WEBEX: 'lightWebex',
};

const MD_THEMES = {
  WEBEX_DARK: 'webex-dark',
  WEBEX_LIGHT: 'webex-light',
};

const THEMES = {
  ...THEME_NAMES,
  ...MD_THEMES,
};

const DEFAULTS = {
  THEME: THEME_NAMES.DARK_WEBEX,
};

export {
  CLASS_PREFIX,
  DEFAULTS,
  MD_THEMES,
  STYLE,
  THEME_CLASS_PREFIX,
  THEME_CLASS_PREFIX_STABLE,
  THEME_NAMES,
  THEMES,
};

export const TEAM_COLORS = {
  default: 'default',
  gold: 'gold',
  orange: 'orange',
  lime: 'lime',
  mint: 'mint',
  cyan: 'cyan',
  cobalt: 'cobalt',
  slate: 'slate',
  violet: 'violet',
  purple: 'purple',
  pink: 'pink',
} as const;
