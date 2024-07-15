import { PLACEMENTS } from '../ModalArrow/ModalArrow.constants';
import { COLORS } from '../ModalContainer/ModalContainer.constants';
import { BOUNDARIES } from '../Popover/Popover.constants';

const CLASS_PREFIX = 'md-toggletip';

export const DEFAULTS = {
  BOUNDARY: BOUNDARIES.PARENT,
  COLOR: COLORS.PRIMARY,
  OFFSET_DISTANCE: 5,
  OFFSET_SKIDDING: 0,
  PLACEMENT: PLACEMENTS.BOTTOM as string,
  STRATEGY: 'absolute' as const,
  VARIANT: 'small',
} as const;

export const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};
