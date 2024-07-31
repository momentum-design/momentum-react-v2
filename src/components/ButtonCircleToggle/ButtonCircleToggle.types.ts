import { ButtonCircleProps } from '../ButtonCircle';
import { AriaButtonProps, AriaToggleButtonProps } from '@react-types/button';

export interface Props
  extends Omit<ButtonCircleProps, keyof AriaButtonProps>,
    AriaToggleButtonProps {
  /**
   * Whether pressed state should set 'aria-pressed' (default) or 'aria-expanded'
   */
  ariaStateKey?: 'aria-pressed' | 'aria-expanded';
}
