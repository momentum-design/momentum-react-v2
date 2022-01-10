import type { Color, PlacementType } from './Popover.types';
import type { CSSProperties } from 'react';

export interface Props {
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * The color of this ModalArrow.
   */
  color?: Color;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * The placement of the arrow.
   */
  placement: PlacementType;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
