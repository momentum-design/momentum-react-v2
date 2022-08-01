import { CSSProperties } from 'react';
import { AriaRadioGroupProps, AriaRadioProps } from '@react-types/radio';

export interface GroupProps extends Omit<AriaRadioGroupProps, 'children'> {
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
  options?: Array<Props | string>;

  /**
   * The description for the RadioGroup.
   */

  description?: string;
}

export interface Props extends Omit<AriaRadioProps, 'children'> {
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
