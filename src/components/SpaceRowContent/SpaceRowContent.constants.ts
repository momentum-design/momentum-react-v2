import { TEAM_COLORS } from '../ThemeProvider/ThemeProvider.constants';

const CLASS_PREFIX = 'md-space-row-content';

const DEFAULTS = {
  TEAM_COLOR: TEAM_COLORS.default,
  DISABLED: false,
};

const STYLE = {
  textWrapper: `${CLASS_PREFIX}-text-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
