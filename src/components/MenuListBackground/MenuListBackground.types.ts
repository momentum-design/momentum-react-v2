import { CSSProperties, ReactNode } from 'react';

export interface Props {
  /**
   * Child components of this component.
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
   * Determines the colour of the background.
   * @default "primary"
   */
  color?: 'primary' | 'secondary' | 'tertiary';
}
