import { OVERLAY_CONSTANTS } from '../Overlay';

const CLASS_PREFIX = 'md-overlay-alert';

const DEFAULTS = {
  OVERLAY_COLOR: OVERLAY_CONSTANTS.COLORS.SECONDARY,
};

const STYLE = {
  details: `${CLASS_PREFIX}-details`,
  title: `${CLASS_PREFIX}-title`,
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
