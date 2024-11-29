import { CSSProperties } from 'react';
import { AriaRadioGroupProps, AriaRadioProps } from '@react-types/radio';
import { RequireOneOf } from '../../utils/types';

interface _RadioGroupProps extends Omit<AriaRadioGroupProps, 'children'> {
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
  options?: Array<RadioProps | string>;

  /**
   * The description for the RadioGroup.
   */

  description?: string;
}

export type RadioGroupProps = _RadioGroupProps &
  RequireOneOf<_RadioGroupProps, ['label', 'aria-label', 'aria-labelledby']>;

export interface RadioProps extends Omit<AriaRadioProps, 'children'> {
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
  label: string;

  /**
   * The description for the radio button.
   */

  description?: string;
}
