import { ButtonPillProps } from '../ButtonPill';
import { AriaButtonProps, AriaToggleButtonProps } from '@react-types/button';

export interface Props
  extends Omit<ButtonPillProps, keyof AriaButtonProps>,
    AriaToggleButtonProps {}
