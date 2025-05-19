import type { MdcButtonProps } from '../../types';
import type { ReactNode } from 'react';

export type Props = Omit<MdcButtonProps, 'active' | 'color'> & {
  /**
   * onPress event handler, which internally maps to the onClick event.
   *
   * @deprecated Use `onClick` instead.
   */
  onPress?: (event: MouseEvent) => void;

  /**
   * Child components of this ButtonCircle.
   */
  children?: ReactNode;

  /**
   * Color profile to use with this ButtonCircle.
   */
  color?: 'join' | 'cancel' | 'message';

  /**
   * Whether or not this ButtonCircle has a transparent background.
   *
   * @deprecated Use `variant` property to style the Button instead.
   */
  ghost?: boolean;

  /**
   * Whether or not this ButtonCircle has an outline/border.
   *
   * @deprecated Use `variant` property to style the Button instead.
   */
  outline?: boolean;

  /**
   * Whether or not this ButtonCircle should look disabled, but allowing actions like onPress to be passed.
   * Maps to softDisabled internally.
   *
   * @deprecated Use `softDisabled` instead.
   */
  shallowDisabled?: boolean;

  /**
   * Whether or not to stop the event from bubbling up.
   */
  stopPropagation?: boolean;
};
