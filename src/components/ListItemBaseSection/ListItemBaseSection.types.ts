import { CSSProperties, ReactNode } from 'react';

export interface Props {
  /**
   * className prop description
   * Child components of this ButtonPill.
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
   * Horizontal position of the section inside a list item
   */
  position?: 'start' | 'middle' | 'end' | 'fill';

  /**
   * Title to show tool tip.
   */
  title?: string;
}
