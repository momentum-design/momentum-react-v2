const CLASS_PREFIX = 'md-menu-trigger';

import { PLACEMENTS } from 'components/ModalArrow/ModalArrow.constants';
import type { PlacementType } from 'components/ModalArrow/ModalArrow.types';
import { COLORS } from 'components/ModalContainer/ModalContainer.constants';

const MENU_TRIGGER_PLACEMENTS: Record<string, PlacementType> = Object.entries(PLACEMENTS)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .filter(([_, value]) => value.startsWith('top') || value.startsWith('bottom'))
  .reduce((obj, [key, placement]) => {
    return Object.assign(obj, { [key]: placement });
  }, {});

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
