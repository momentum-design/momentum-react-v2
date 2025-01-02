import { CSSProperties, ReactNode } from 'react';
import { AriaLabelRequired } from '../../utils/a11y';

export type RadioSimpleProps = AriaLabelRequired & {
  /**
   * Child components of this RadioSimple.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * The id for the RadioSimple component.
   */
  id?: string;

  /**
   * Disabled state for the RadioSimple component.
   */
  isDisabled?: boolean;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * The value of the RadioSimple component.
   */
  value: string;
};
