import { ReactNode } from 'react';
import { AriaButtonProps } from '@react-types/button';

export interface Props extends AriaButtonProps {
  /**
   * Child components of this ButtonDialpad. This prop replaces primaryText.
   */
  children?: ReactNode;
  /**
   * Whether or not this ButtonDialpad is disabled.
   */
  disabled?: boolean;
}
