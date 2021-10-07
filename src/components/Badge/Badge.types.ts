import { CSSProperties } from 'react';

export interface Props {
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
   * Child component of this Badge
   */
  children?: string;

  /**
   * Size index of this Badge
   */
  size?: number;
}
