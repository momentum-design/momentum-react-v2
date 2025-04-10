import type { MdcButtonProps } from '../../types';
export interface Props extends Omit<MdcButtonProps, 'size' | 'variant'> {
  /**
   * Primary text to display above the secondary text.
   */
  primaryText?: string;

  /**
   * Secondary text to display below the primary text.
   */
  secondaryText?: string;
}
