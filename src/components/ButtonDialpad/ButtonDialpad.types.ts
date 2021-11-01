import { ReactNode } from 'react';
import { AriaButtonProps } from '@react-types/button';

export interface Props extends AriaButtonProps {
  /**
   * Custom class to be able to override the component's CSS
   */
  className?: string;
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

  /**
   * title to use for this component.
   */
  title?: string;
}
