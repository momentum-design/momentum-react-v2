import { PLACEMENTS } from '../ModalArrow/ModalArrow.constants';
import { COLORS } from '../ModalContainer/ModalContainer.constants';

const CLASS_PREFIX = 'md-popover';
const BACKDROP_CLASS = 'tippy-backdrop';

const BOUNDARIES = {
  VIEWPORT: 'viewport',
  WINDOW: 'window',
  PARENT: 'scrollParent',
};

const CLOSE_BUTTON_PLACEMENTS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  NONE: 'none',
};

const DEFAULTS = {
  VARIANT: 'small',
  TRIGGER: 'click',
  PLACEMENT: PLACEMENTS.AUTO as string,
  OFFSET_DISTANCE: 5,
  OFFSET_SKIDDING: 0,
  SHOW_ARROW: true,
  INTERACTIVE: false,
  COLOR: COLORS.PRIMARY,
  BOUNDARY: BOUNDARIES.PARENT,
  HIDE_ON_ESC: true,
  CLOSE_BUTTON_PLACEMENT: CLOSE_BUTTON_PLACEMENTS.NONE,
  FOCUS_BACK_ON_TRIGGER_COMPONENT: false,
  STRATEGY: 'absolute' as const,
  ADD_BACKDROP: true,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  arrowWrapper: `${CLASS_PREFIX}-arrow-wrapper`,
  closeButton: `${CLASS_PREFIX}-close-button`,
  backdrop: `${CLASS_PREFIX}-backdrop`,
};

// padding between the edge of the popover and the arrow, to ensure the arrow doesn't get pushed outside
const ARROW_PADDING = 5;

export {
  CLASS_PREFIX,
  DEFAULTS,
  STYLE,
  ARROW_PADDING,
  BOUNDARIES,
  CLOSE_BUTTON_PLACEMENTS,
  BACKDROP_CLASS,
};
