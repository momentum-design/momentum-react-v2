import { Color, Side } from './ModalArrow.types';

const CLASS_PREFIX = 'md-modal-arrow';

const COLORS: Record<string, Color> = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  QUATERNARY: 'quaternary',
};

const SIDES: Record<string, Side> = {
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
};

const DEFAULTS = {
  COLOR: COLORS.PRIMARY,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, COLORS, DEFAULTS, SIDES, STYLE };
