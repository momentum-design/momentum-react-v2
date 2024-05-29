import { CSSProperties, ReactNode } from 'react';
import { AriaRadioGroupProps } from '@react-types/radio';

export interface RadioSimpleGroupProps extends AriaRadioGroupProps {
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * A wrapper that contains the RadioSimples inside this RadioSimpleGroup
   */
  children: ReactNode;

  /**
   * The optional description for the RadioGroup.
   */
  description?: string;

  /**
   * The optional visible RadioSimpleGroup label
   */
  label?: ReactNode;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
