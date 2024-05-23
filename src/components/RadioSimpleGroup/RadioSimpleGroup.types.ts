import { CSSProperties, ReactNode } from 'react';
import { AriaRadioGroupProps } from '@react-types/radio';

export interface RadioSimpleGroupProps extends AriaRadioGroupProps {
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * The description for the RadioGroup.
   */

  description?: string;

  /**
   * A wrapper that contains the RadioSimples inside this RadioSimpleGroup
   */

  children?: ReactNode;

  /**
   * The visible GroupSimple label
   */

  label?: ReactNode;
}
