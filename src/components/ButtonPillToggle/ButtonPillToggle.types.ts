import { ButtonPillProps } from '../ButtonPill';
import { AriaButtonProps, AriaToggleButtonProps } from '@react-types/button';

export interface Props extends Omit<ButtonPillProps, keyof AriaButtonProps>, AriaToggleButtonProps {
  /**
   * Whether pressed state should set 'aria-pressed' (default) or 'aria-expanded'
   */
  ariaStateKey?: 'aria-pressed' | 'aria-expanded';
}
