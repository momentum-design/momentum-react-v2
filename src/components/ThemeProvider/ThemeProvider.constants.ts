const THEME_CLASS_PREFIX = 'md-theme';
const CLASS_PREFIX = `${THEME_CLASS_PREFIX}-provider`;

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  globals: `${CLASS_PREFIX}-globals`,
};

// Some themes are disabled until tokens are properly imported.
const THEME_NAMES = {
  // DARK_BRONZE: 'darkBronze',
  // DARK_INDIGO: 'darkIndigo',
  // DARK_JADE: 'darkJade',
  // DARK_LAVENDER: 'darkLavender',
  // DARK_ROSE: 'darkRose',
  DARK_WEBEX: 'darkWebex',
  // LIGHT_BRONZE: 'lightBronze',
  // LIGHT_INDIGO: 'lightIndigo',
  // LIGHT_JADE: 'lightJade',
  // LIGHT_LAVENDER: 'lightLavender',
  // LIGHT_ROSE: 'lightRose',
  LIGHT_WEBEX: 'lightWebex',
};

const DEFAULTS = {
  THEME: THEME_NAMES.DARK_WEBEX,
};

export { CLASS_PREFIX, DEFAULTS, STYLE, THEME_CLASS_PREFIX, THEME_NAMES };

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
};
