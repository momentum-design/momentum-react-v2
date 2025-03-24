import { CSSProperties } from 'react';

export interface Props {
  /**
   * Size of the Divider dot
   *
   * @default 'small'
   */
  size?: 'small' | 'medium' | 'large';

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
}
