import { ReactNode } from 'react';
import { ButtonSimpleProps } from '../ButtonSimple';
export type Size = 64 | 52 | 40 | 32 | 28 | 20;
export interface Props extends ButtonSimpleProps {
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
   * Whether or not this ButtonCircle should look disabled, but allowing actions like onPress to be passed.
   */
  shallowDisabled?: boolean;

  /**
   * Whether or not this ButtonCircle has a transparent background.
   */
  ghost?: boolean;

  /**
   * Whether or not this ButtonCircle has an outline/border.
   */
  outline?: boolean;

  /**
   * Whether or not this ButtonCircle has inverted background (black for dark mode and white for light mode).
   */
  inverted?: boolean;

  /**
   * Size index of this ButtonCircle.
   */
  size?: Size;
}
