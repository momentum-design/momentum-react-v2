import { ButtonCircleProps } from '../ButtonCircle';
import { AriaButtonProps, AriaToggleButtonProps } from '@react-types/button';

export interface Props
  extends Omit<ButtonCircleProps, keyof AriaButtonProps>,
    AriaToggleButtonProps {}
