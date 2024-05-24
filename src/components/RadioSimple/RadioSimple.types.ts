import { CSSProperties, ReactNode } from 'react';
import { AriaRadioProps } from '@react-types/radio';

export interface Props extends AriaRadioProps {
  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Child components of this RadioSimple.
   */
  children?: ReactNode;

  ariaLabel?: string;
  ariaLabelledBy?: string;
}
