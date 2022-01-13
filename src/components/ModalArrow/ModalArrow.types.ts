import type { CSSProperties } from 'react';
import type { TippyProps } from '@tippyjs/react';

export type Color = 'primary' | 'secondary' | 'tertiary' | 'quaternary';
export type PlacementType = TippyProps['placement'];

export interface Props {
  /**
   * Placement of the Modal relative to the trigger component. The
   * arrow will be placed accordingly.
   *
   * Possible values: `top`, `top-start`, `top-end`, `right`, `right-start`, `right-end`, `bottom`, `bottom-start`, `bottom-end`,
   * `left`, `left-start`, `left-end`, `auto`, `auto-start`, `auto-end`
   *
   * For example if placement is `top`, the arrow will point to the bottom, etc.
   *
   * @default `bottom`
   */
  placement?: PlacementType;

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
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
