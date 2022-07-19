import { CSSProperties, ReactElement, ReactNode } from 'react';
import { RadioAriaProps } from '@react-aria/radio';

export interface GroupProps {
  /**
   * Child components of this RadioGroup.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  label?: string;
}

export interface Props extends RadioAriaProps {
  style?: CSSProperties;
}

export type RadioValue = {
  value: string;
  child: ReactNode;
};
