import type { MdcButtonProps } from '../../types';
import { ReactNode } from 'react';

export type Props = Omit<MdcButtonProps, 'active' | 'color'> & {
  onPress?: (event: MouseEvent) => void;
  /**
   * Color profile to use with this ButtonCircle.
   */
  color?: 'join' | 'cancel' | 'message';
  /**
   * Whether or not this ButtonCircle has a transparent background.
   */
  ghost?: boolean;

  /**
   * Whether or not this ButtonCircle has an outline/border.
   */
  outline?: boolean;
  /**
   * Child components of this ButtonCircle.
   */
  children?: ReactNode;

  shallowDisabled?: boolean;
};
