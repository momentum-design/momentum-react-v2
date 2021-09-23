import { CSSProperties, ReactNode } from 'react';

export interface Props {
  /**
   * Buttons or icons for end of item
   */
  buttonGroup?: ReactNode;

  /**
   * Child components of this ButtonPill.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Color status
   */
  color?: 'join' | 'inactive' | 'activeNoJoin' | 'empty';

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Determines if this item is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Icon, Avatar, or other content for beginning of item
   */
  image?: ReactNode;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
