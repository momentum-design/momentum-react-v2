import { PLACEMENTS } from '../ModalArrow/ModalArrow.constants';
import { PlacementType } from '../ModalArrow/ModalArrow.types';

type Orientation = 'horizontal' | 'vertical' | undefined;

/**
 * This function detects based on the placement arg if an the arrow
 * is horizontal (left or right) or vertical (top or bottom)
 *
 * `undefined` if placement is `undefined`
 * @param placement
 * @returns
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
