import { CSSProperties, ReactNode } from 'react';
import { AriaButtonProps } from '@react-types/button';

export type Size = 64 | 52 | 40 | 32 | 28;
export interface Props extends AriaButtonProps {
  /**
   * Child components of this ButtonCircle.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Color profile to use with this ButtonCircle.
   */
  color?: 'join' | 'cancel' | 'message';

  /**
   * Whether or not this ButtonCircle is disabled.
   */
  disabled?: boolean;

  /**
   * Whether or not this ButtonCircle is ghosted.
   */
  ghost?: boolean;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Whether to use the outline variant of this ButtonCircle if available.
   */
  outline?: boolean;

  /**
   * Size index of this ButtonCircle.
   */
  size?: 64 | 52 | 40 | 32 | 28;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
