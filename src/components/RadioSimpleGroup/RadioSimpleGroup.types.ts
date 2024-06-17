import { CSSProperties, ReactNode } from 'react';
import { AriaRadioGroupProps } from '@react-types/radio';

export interface RadioSimpleGroupProps extends AriaRadioGroupProps {
  /**
   * The aria-describedby attribute for the RadioSimpleGroup.
   */
    ariaDescribedby?: string;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * A wrapper that contains the RadioSimples inside this RadioSimpleGroup
   */
  children: ReactNode;

  /**
   *  The RadioSimpleGroup description element, if any.
   */
  description?: ReactNode;

  /**
   * 	The RadioSimpleGroup's visible label (if any).
   */
  label?: ReactNode;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
