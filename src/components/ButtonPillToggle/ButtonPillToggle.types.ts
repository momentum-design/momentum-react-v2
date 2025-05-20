import type { MdcButtonProps } from '../../types';

export type Props = Omit<MdcButtonProps, 'active'> & {
  /**
   * For controlled toggle: whether toggle button is selected or not.
   */
  isSelected?: boolean;
  /**
   * For uncontrolled toggle: whether toggle button starts selected or not.
   */
  initialIsSelected?: boolean;
  /**
   * Whether the button should be outlined (secondary) or not (tertiary).
   */
  outline?: boolean;
  /**
   * For controlled toggle: the callback function on press of the toggle button.
   * For uncontrolled toggle: the callback function to call after the button has toggled and changed value.
   */
  onChange?: (isSelected: boolean) => void;
};
