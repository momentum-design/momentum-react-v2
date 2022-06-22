import { CheckboxProps } from '@react-types/checkbox';
import { CSSProperties } from 'react';

export interface Props extends CheckboxProps {
  /**
   * String that displays the label of this checkbox.
   */
  label?: string;

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
}
