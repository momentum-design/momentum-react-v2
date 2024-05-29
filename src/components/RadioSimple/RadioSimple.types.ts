import { CSSProperties, ReactNode } from 'react';
import { AriaRadioProps } from '@react-types/radio';

export interface RadioSimpleProps extends AriaRadioProps {
  /**
   * Optional ariaLabel on the RadioSimple component.
   */
  ariaLabel?: string;

  /**
   * Optional ariaLabelledBy on the RadioSimple component.
   */
  ariaLabelledBy?: string;

  /**
   * Child components of this RadioSimple.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * The id for the RadioSimple component.
   */
  id?: string;

  /**
   * Disabled state for the RadioSimple component.
   */
  isDisabled?: boolean;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * The value of the RadioSimple component.
   */
  value: string;
}
