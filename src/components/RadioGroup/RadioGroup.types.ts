import { CSSProperties } from 'react';
import { AriaRadioGroupProps, AriaRadioProps } from '@react-types/radio';

export type RadioGroupOrientation = 'horizontal' | 'vertical';

export interface RadioGroupProps extends Omit<AriaRadioGroupProps, 'children'> {
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Array of radio button options.
   */
  options?: Array<RadioProps | RadioSimpleProps | string>;

  /**
   * The description for the RadioGroup.
   */
  description?: string;

  /**
   * Boolean to describe if the radio component is a ReactNode.
   */
  isRadioSimple?: boolean;
}

export interface RadioProps extends Omit<AriaRadioProps, 'children' > {
  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * The label for the radio button.
   */
  label?: string;
}

export interface RadioSimpleProps extends AriaRadioProps {
  /**
   * The label for the RadioSimple component.
   */
  ariaLabel?: string;

  /**
   * The ariaLabelledby for the RadioSimple component.
   */
  ariaLabelledby?: string;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;
}
