import { OVERLAY_CONSTANTS } from '../Overlay';

const CLASS_PREFIX = 'md-overlay-alert';

const DEFAULTS = {
  /**
   * Default <Overlay /> color prop.
   */
  OVERLAY_COLOR: OVERLAY_CONSTANTS.COLORS.SECONDARY,
  /**
   * Default props for react focus lock, which will be passed to Overlay
   */
  FOCUS_LOCK_PROPS: { returnFocus: true },
};

const STYLE = {
  details: `${CLASS_PREFIX}-details`,
  title: `${CLASS_PREFIX}-title`,
  wrapper: `${CLASS_PREFIX}-wrapper`,
  modalContainer: `${CLASS_PREFIX}-modal-container`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
