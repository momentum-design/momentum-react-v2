import { ReactNode } from 'react';
import { ButtonSimpleProps } from '../ButtonSimple';
import { AriaToggleButtonProps } from '@react-types/button';
export type Size = 64 | 52 | 40 | 32 | 28 | 20;
export interface Props extends ButtonSimpleProps, AriaToggleButtonProps {
  /**
   * Child components of this ButtonCircle.
   */
  children?: ReactNode;

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
   * Whether to use the outline variant of this ButtonCircle if available.
   */
  outline?: boolean;

  /**
   * Size index of this ButtonCircle.
   */
  size?: Size;
}
