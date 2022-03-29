import type { Color } from './CardStatus.types';

const CLASS_PREFIX = 'md-card-status';

const COLORS: Record<string, Color> = {
  INACTIVE: 'inactive',
  SUCCESS: 'success',
};

const DEFAULTS = {};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, COLORS, DEFAULTS, STYLE };
