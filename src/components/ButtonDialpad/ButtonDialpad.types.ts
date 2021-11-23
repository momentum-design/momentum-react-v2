import { ReactNode } from 'react';
import { ButtonSimpleProps } from '../ButtonSimple';

export interface Props extends ButtonSimpleProps {
  /**
   * Child components of this ButtonDialpad. This prop replaces primaryText.
   */
  children?: ReactNode;
  /**
   * Whether or not this ButtonDialpad is disabled.
   */
  disabled?: boolean;

  /**
   * Primary text to display above the secondary text.
   */
  primaryText?: string;

  /**
   * Secondary text to display below the primary text.
   */
  secondaryText?: string;

  /**
   * Size index of this ButtonPill.
   */
  size?: number;
}
