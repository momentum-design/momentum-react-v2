import { ReactNode } from 'react';
import { PressEvents } from '@react-types/shared';

export interface Props extends PressEvents {
  /**
   * Child components of this ButtonPill.
   */
  children?: ReactNode;

  /**
   * Whether or not this ButtonPill is disabled.
   */
  disabled?: boolean;

  /**
   * Whether or not this ButtonPill is ghosted.
   */
  ghost?: boolean;

  /**
   * Whether to use the outline variant of this ButtonPill if available.
   */
  outline?: boolean;

  /**
   * Size index of this ButtonPill.
   */
  size?: 40 | 32 | 28 | 24;

  /**
   * Color profile to use with this ButtonPill.
   */
  color?: 'join' | 'cancel' | 'message';
}
