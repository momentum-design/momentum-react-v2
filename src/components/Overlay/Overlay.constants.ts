import { Positioning } from './Overlay.types';

const POSITIONINGS: Record<string, Positioning> = {
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
};

const DEFAULTS = {
  AUTO_FOCUS: false,
  CONTAIN: false,
  IS_OPEN: true,
  RESTORE_FOCUS: false,
};

export { DEFAULTS, POSITIONINGS };
