import { ReactNode } from 'react';
import type { MdcButtonProps } from '../../types';

export type Props = Omit<MdcButtonProps, 'active' | 'color'> & {
  /**
   * onPress event handler, which internally maps to the onClick event.
   *
   * @deprecated Use `onClick` instead.
   */
  onPress?: (event: MouseEvent) => void;

  /**
   * Child components of this ButtonPill.
   */
  children?: ReactNode;

  /**
   * Color profile to use with this ButtonPill.
   */
  color?: 'join' | 'cancel' | 'message';

  /**
   * Whether or not this ButtonPill has a transparent background.
   *
   * @deprecated Use `variant` property to style the Button instead.
   */
  ghost?: boolean;

  /**
   * Whether or not this ButtonPill has an outline/border.
   *
   * @deprecated Use `variant` property to style the Button instead.
   */
  outline?: boolean;

  /**
   * Whether or not this ButtonPill should look disabled, but allowing actions like onPress to be passed.
   * Maps to softDisabled internally.
   *
   * @deprecated Use `softDisabled` instead.
   */
  shallowDisabled?: boolean;

  /**
   * Whether or not this ButtonPill has an outline even when disabled. Respects existing outline prop and will not display outline if outline is false.
   */
  disabledOutline?: boolean;

  /**
   * If this component show grow its width to the parent container.
   */
  grown?: boolean;

  /**
   * Whether or not to stop the event from bubbling up.
   * This stops the click event and some other React aria events from bubbling up.
   * This is a temporary solution until ListItems and other components are migrated
   * to the new momentum-design library.
   */
  stopPropagation?: boolean;
};
