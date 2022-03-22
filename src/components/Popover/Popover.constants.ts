import { PLACEMENTS } from 'components/ModalArrow/ModalArrow.constants';
import { COLORS } from 'components/ModalContainer/ModalContainer.constants';

const CLASS_PREFIX = 'md-popover';

const BOUNDARIES = {
  VIEWPORT: 'viewport',
  WINDOW: 'window',
  PARENT: 'scrollParent',
};

const DEFAULTS = {
  VARIANT: 'small',
  TRIGGER: 'click',
  PLACEMENT: PLACEMENTS.AUTO as string,
  SHOW_ARROW: true,
  INTERACTIVE: false,
  COLOR: COLORS.PRIMARY,
  BOUNDARY: BOUNDARIES.PARENT,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  arrowWrapper: `${CLASS_PREFIX}-arrow-wrapper`,
};

// default offset between popover and trigger component:
const OFFSET = 5;

// padding between the edge of the popover and the arrow, to ensure the arrow doesn't get pushed outside
const ARROW_PADDING = 5;

export { CLASS_PREFIX, DEFAULTS, STYLE, OFFSET, ARROW_PADDING, BOUNDARIES };
