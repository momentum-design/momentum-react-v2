import type { Color } from 'components/ModalContainer/ModalContainer.types';

import type { PlacementType } from './ModalArrow.types';

const CLASS_PREFIX = 'md-modal-arrow';

const COLORS: Record<string, Color> = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  QUATERNARY: 'quaternary',
};

const PLACEMENTS: Record<string, PlacementType> = {
  TOP: 'top',
  TOP_START: 'top-start',
  TOP_END: 'top-end',
  RIGHT: 'right',
  RIGHT_START: 'right-start',
  RIGHT_END: 'right-end',
  BOTTOM: 'bottom',
  BOTTOM_START: 'bottom-start',
  BOTTOM_END: 'bottom-end',
  LEFT: 'left',
  LEFT_START: 'left-start',
  LEFT_END: 'left-end',

  // choose the side with most space:
  AUTO: 'auto',
  AUTO_START: 'auto-start',
  AUTO_END: 'auto-end',
};

const DEFAULTS = {
  COLOR: COLORS.PRIMARY,
  PLACEMENT: PLACEMENTS.AUTO as string,
};

const STYLE = {
  svg: `${CLASS_PREFIX}-svg`,
};

// arrow height as a constant - is not adjustable at the moment. could become flexible
// by applying styling logic to ModalArrow svg creation
const ARROW_HEIGHT = 12;

export { CLASS_PREFIX, COLORS, DEFAULTS, PLACEMENTS, STYLE, ARROW_HEIGHT };
