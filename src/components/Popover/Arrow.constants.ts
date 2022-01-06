import type { Color, Placement } from './Arrow.types';

const CLASS_PREFIX = 'md-popover-arrow';

const COLORS: Record<string, Color> = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  QUATERNARY: 'quaternary',
};

const PLACEMENTS: Record<string, Placement> = {
  TOP: 'top',
  TOP_START: 'top-start',
  TOP_END: 'top-end',
  RIGHT: 'right',
  RIGHT_START: 'right-start',
  RIGHT_END: 'right-end',
  BOTTOM: 'bottom',
  BOTTOM_START: 'bottom-start',
  BOTTOM_END: 'bottom-end',
  LEFT: 'left',
  LEFT_START: 'left-start',
  LEFT_END: 'left-end',

  // choose the side with most space:
  AUTO: 'auto',
  AUTO_START: 'auto-start',
  AUTO_END: 'auto-end',
};

const DEFAULTS = {
  BACKGROUND: 'primary',
  COLOR: COLORS.PRIMARY,
};

const STYLE = {
  svg: `${CLASS_PREFIX}-svg`,
};

export { CLASS_PREFIX, COLORS, DEFAULTS, PLACEMENTS, STYLE };
