import { ReactNode } from 'react';
import { ButtonSimpleProps } from '../ButtonSimple';

export interface Props extends ButtonSimpleProps {
  /**
   * Child components of this ButtonPill.
   */
  children?: ReactNode;

  /**
   * Color profile to use with this ButtonPill.
   */
  color?: 'join' | 'cancel' | 'message';

  /**
   * Whether or not this ButtonPill is disabled.
   */
  disabled?: boolean;

  /**
   * Whether or not this ButtonPill should look disabled, but allowing actions like onPress to be passed.
   */
  shallowDisabled?: boolean;

  /**
   * Whether or not this ButtonPill has a transparent background.
   */
  ghost?: boolean;

  /**
   * If this component show grow its width to the parent container.
   */
  grown?: boolean;

  /**
   * Whether or not this ButtonPill has an outline/border.
   */
  outline?: boolean;

  /**
   * Whether or not this ButtonCircle has inverted background (black for dark mode and white for light mode).
   */
  inverted?: boolean;

  /**
   * Size index of this ButtonPill.
   */
  size?: number;

  /**
   * Whether or not this ButtonPill has an action or not, like when it only triggers a Tooltip.
   */
  hasAction?: boolean;
}
