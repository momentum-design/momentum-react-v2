import { CSSProperties, ReactNode } from 'react';
import { AriaRadioGroupProps, AriaRadioProps } from '@react-types/radio';

export interface GroupProps extends AriaRadioGroupProps {
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  options?: Array<Props | string | ReactNode>;

  setValue?: (value: string) => void;

  description?: string;
}

export interface Props extends AriaRadioProps {
  style?: CSSProperties;

  className?: string;

  label?: string;
}
