import { Color } from './Overlay.types';

const CLASS_PREFIX = 'md-overlay';

const COLORS: Record<string, Color> = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};

const DEFAULTS = {
  COLOR: COLORS.PRIMARY,
  FULLSCREEN: false,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, COLORS, DEFAULTS, STYLE };
