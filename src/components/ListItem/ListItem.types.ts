import { CSSProperties, ReactNode } from 'react';

export type ListItemSize = 32 | 40 | 50;

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
   * Determines if this item is disabled
   */
  isDisabled?: boolean;

  /**
   * Size of the list item
   */
  size?: ListItemSize;

  /**
   * The shape of the list item container
   */
  shape?: 'rectangle' | 'rounded';
}
