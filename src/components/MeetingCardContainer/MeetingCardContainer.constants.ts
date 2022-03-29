import type { Color, Height, Rounding } from './MeetingCardContainer.types';

const CLASS_PREFIX = 'md-meeting-card-container';

const COLORS: Record<string, Color> = {
  INACTIVE: 'inactive',
  SUCCESS: 'success',
  TRANSPARENT: 'transparent',
};

const HEIGHTS: Record<string, Height> = {
  AUTO: 'auto',
  LARGE: 'large',
  MEDIUM: 'medium',
  SMALL: 'small',
  TINY: 'tiny',
};

const ROUNDINGS: Record<number, Rounding> = {
  0: 0,
  1: 1,
  2: 2,
};

const DEFAULTS = {
  COLOR: COLORS.INACTIVE,
  HEIGHT: HEIGHTS.SMALL,
  ROUNDING: ROUNDINGS[2],
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, COLORS, DEFAULTS, HEIGHTS, ROUNDINGS, STYLE };
