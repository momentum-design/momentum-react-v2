import { CSSProperties, ReactNode } from 'react';

export type Color = 'primary' | 'secondary' | 'tertiary' | 'quaternary';
export type Elevation = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type ModalContainerRadius = 0 | 12 | 24;

export interface Props {
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
   * Amount of radius for the container
   */
  radius?: ModalContainerRadius;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
