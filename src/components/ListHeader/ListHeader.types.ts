import { CSSProperties, ReactNode } from 'react';

export type OutlinePosition = 'top' | 'bottom';
export type OutlineColor = 'primary' | 'secondary';

export interface Props {
  /**
   * Child components of this ListHeader.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Determines wether the header has an outline. (Can be bottom or top)
   * @default false
   */
  outline?: boolean;

  /**
   * Position of the outline.
   * @default bottom
   */
  outlinePosition?: OutlinePosition;

  /**
   * Color of the outline.
   * @default primary
   */
  outlineColor?: OutlineColor;

  /**
   * Determines wether the header has bold text.
   * @default false
   */
  bold?: boolean;
}
