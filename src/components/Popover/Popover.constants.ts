import { PLACEMENTS } from '../ModalArrow/ModalArrow.constants';

const CLASS_PREFIX = 'md-popover';

const DEFAULTS = {
  VARIANT: 'small',
  TRIGGER: 'click',
  PLACEMENT: PLACEMENTS.BOTTOM as string,
  SHOW_ARROW: true,
  COLOR: 'primary',
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  arrowWrapper: `${CLASS_PREFIX}-arrow-wrapper`,
};

// default offset between popover and trigger component:
const OFFSET = 5;

// padding between the edge of the popover and the arrow, to ensure the arrow doesn't get pushed outside
const ARROW_PADDING = 5;

export { CLASS_PREFIX, DEFAULTS, STYLE, OFFSET, ARROW_PADDING };
