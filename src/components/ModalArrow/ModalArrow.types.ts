import { CSSProperties } from 'react';

export type Color = 'primary' | 'secondary' | 'tertiary' | 'quaternary';
export type Side = 'bottom' | 'left' | 'right' | 'top';

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
   * The side that this arrow will appear on.
   */
  side: Side;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
