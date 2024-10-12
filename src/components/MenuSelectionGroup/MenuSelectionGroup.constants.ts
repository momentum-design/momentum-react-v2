import { TickPosition } from './MenuSelectionGroup.types';
const CLASS_PREFIX = 'md-menu-selection-group';

const DEFAULTS = {
  TICK_POSITION: 'right' as TickPosition,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  header: `${CLASS_PREFIX}-header-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
