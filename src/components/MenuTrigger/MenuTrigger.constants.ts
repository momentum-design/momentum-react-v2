const CLASS_PREFIX = 'md-menu-trigger';
import { PLACEMENTS } from '../ModalArrow/ModalArrow.constants';
import { COLORS } from '../ModalContainer/ModalContainer.constants';
import type { PlacementType } from '../ModalArrow/ModalArrow.types';

const MENU_TRIGGER_PLACEMENTS: Record<string, PlacementType> = PLACEMENTS;
delete MENU_TRIGGER_PLACEMENTS.LEFT;
delete MENU_TRIGGER_PLACEMENTS.LEFT_START;
delete MENU_TRIGGER_PLACEMENTS.LEFT_END;
delete MENU_TRIGGER_PLACEMENTS.RIGHT;
delete MENU_TRIGGER_PLACEMENTS.RIGHT_START;
delete MENU_TRIGGER_PLACEMENTS.RIGHT_END;
delete MENU_TRIGGER_PLACEMENTS.AUTO;
delete MENU_TRIGGER_PLACEMENTS.AUTO_START;
delete MENU_TRIGGER_PLACEMENTS.AUTO_END;

const DEFAULTS = {
  VARIANT: 'medium',
  PLACEMENT: MENU_TRIGGER_PLACEMENTS.BOTTOM_START as string,
  SHOW_ARROW: false,
  COLOR: COLORS.PRIMARY,
};
const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  overlay: `${CLASS_PREFIX}-overlay`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE, MENU_TRIGGER_PLACEMENTS };
