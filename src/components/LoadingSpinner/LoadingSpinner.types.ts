import { CSSProperties, ReactNode } from 'react';
import { IconScale } from '../Icon';

export interface Props {
  /**
   * Child components of this LoadingSpinner.
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
   * Size of the loading spinner (same as IconScale).
   * @default 24
   */
  scale?: IconScale;
}
