import { TEAM_COLORS } from 'components/ThemeProvider/ThemeProvider.constants';

const CLASS_PREFIX = 'md-space-list-item';

const DEFAULTS = {
  TEAM_COLOR: TEAM_COLORS.default,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  textWrapper: `${CLASS_PREFIX}-text-wrapper`,
  isNewActivity: `${CLASS_PREFIX}-is-new-activity`,
  dotDivider: `${CLASS_PREFIX}-dot-divider`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
