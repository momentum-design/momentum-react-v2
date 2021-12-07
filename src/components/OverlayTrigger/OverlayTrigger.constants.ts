import { Positioning, Type } from './OverlayTrigger.types';

const POSITIONINGS: Record<string, Positioning> = {
  NONE: 'none',
  RELATIVE: 'relative',
};

const TYPES: Record<string, Type> = {
  DIALOG: 'dialog',
  GRID: 'grid',
  LISTBOX: 'listbox',
  MENU: 'menu',
  TREE: 'tree',
};

const DEFAULTS = {
  TYPE: TYPES.DIALOG,
  HOVER_POSITIONING: POSITIONINGS.NONE,
  PRESS_POSITIONING: POSITIONINGS.NONE,
  HOVER_DELAY: 1000,
};

export { DEFAULTS, POSITIONINGS, TYPES };
