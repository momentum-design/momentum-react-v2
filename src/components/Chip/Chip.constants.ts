import { TeamColor } from '../ThemeProvider/ThemeProvider.types';

const CLASS_PREFIX = 'md-chip';

const DEFAULTS = {
  DISABLED: false,
  ERROR: false,
  AVATAR: undefined,
  OUTLINE: false,
  COLOR: undefined,
  MULTILINE: false,
  SEARCH: false,
  SIZE: 28,
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

const MULTILINE_COLORS: Record<string, TeamColor> = {
  MINT: 'mint',
  COBALT: 'cobalt',
  ORANGE: 'orange',
  PINK: 'pink',
  LIME: 'lime',
  CYAN: 'cyan',
  PURPLE: 'purple',
  VIOLET: 'violet',
};

export { CLASS_PREFIX, DEFAULTS, STYLE, MULTILINE_COLORS };
