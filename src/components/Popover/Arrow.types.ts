import type { TippyProps } from '@tippyjs/react';
import type { CSSProperties } from 'react';

export type Color = 'primary' | 'secondary' | 'tertiary' | 'quaternary';
export type Placement = TippyProps['placement'];

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
  placement: Placement;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
