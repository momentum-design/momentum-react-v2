import { CSSProperties, ReactNode } from 'react';

export type Arrow = 'bottom' | 'left' | 'right' | 'top';
export type Color = 'primary' | 'secondary' | 'tertiary' | 'quaternary';
export type Elevation = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Round = 0 | 25 | 50 | 75 | 100 | 125 | 150;

export interface Props {
  /**
   * Where to render the ModalArrow component.
   */
  arrow?: Arrow;

  /**
   * Child components of this ModalContainer.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Color of this ModalContainer.
   */
  color?: Color;

  /**
   * The elevation of this ModalContainer.
   */
  elevation?: Elevation;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * If this ModalContainer is padded.
   */
  isPadded?: boolean;

  /**
   * If this ModalContainer is round and to what degree.
   */
  round?: Round;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
