import { PLACEMENTS } from 'components/ModalArrow/ModalArrow.constants';
import { PlacementType } from 'components/ModalArrow/ModalArrow.types';

type Orientation = 'horizontal' | 'vertical' | undefined;

/**
 * This function detects based on the placement arg if an the arrow
 * is horizontal (left or right) or vertical (top or bottom)
 *
 * @param placement
 * @returns orientation based on placement, `undefined` if placement is `undefined`
 */
export const getArrowOrientation = (placement: PlacementType): Orientation => {
  if (placement) {
    if (placement.startsWith(PLACEMENTS.LEFT) || placement.startsWith(PLACEMENTS.RIGHT)) {
      return 'horizontal';
    }
    return 'vertical';
  }
  return undefined;
};
