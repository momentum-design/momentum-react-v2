import { PLACEMENTS } from '../ModalArrow/ModalArrow.constants';
import { ELEVATIONS, ROUNDS } from '../ModalContainer/ModalContainer.constants';

const CLASS_PREFIX = 'md-popover';

const DEFAULTS = {
  IS_PADDED: true,
  ROUND: ROUNDS[0],
  ELEVATION: ELEVATIONS[0],
  COLOR: 'primary',
  TRIGGER: 'click',
  PLACEMENT: PLACEMENTS.BOTTOM as string,
  SHOW_ARROW: true,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  arrowWrapper: `${CLASS_PREFIX}-arrow-wrapper`,
};

// default offset between popover and trigger component:
const OFFSET = 5;

export { CLASS_PREFIX, DEFAULTS, STYLE, OFFSET };
