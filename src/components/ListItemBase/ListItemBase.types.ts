import { CSSProperties, ReactNode } from 'react';

export type ListItemBaseSize = 32 | 40 | 50;

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
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Size of the list item
   * @default 40
   */
  size?: ListItemBaseSize;

  /**
   * The shape of the list item container
   * @default "rectangle"
   */
  shape?: 'rectangle' | 'isPilled';

  /**
   * Aria role
   * @default "listitem"
   */
  role?: string;
}
