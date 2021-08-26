import { CSSProperties, ReactNode } from 'react';

export interface Props {
  /**
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
   * Whether or not this reaction has been selected
   */
  reacted?: boolean;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
