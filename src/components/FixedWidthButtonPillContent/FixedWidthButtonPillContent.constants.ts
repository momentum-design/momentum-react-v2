import { SIZES as BUTTON_PILL_SIZES } from '../ButtonPill/ButtonPill.constants';
import { SIZES as ICON_SIZES } from '../Icon/Icon.constants';

const CLASS_PREFIX = 'md-fixed-width-button-pill-content';

const DEFAULTS = {
  ICON: false,
  ICON_SCALE: ICON_SIZES[32],
  BUTTON_PILL_SIZE: BUTTON_PILL_SIZES[40],
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  buttonContent: `${CLASS_PREFIX}-button-content`,
  hidden: `${CLASS_PREFIX}-hidden`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
