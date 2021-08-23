import { CSSProperties, ReactNode } from 'react';
import { AriaButtonProps } from '@react-types/button';

export interface Props extends AriaButtonProps {
  /**
   * Child components of this ButtonPill.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Color for this component.
   */
  color?: 'error' | 'success' | 'theme' | 'warning';

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Image to use for this component.
   */
  image?: ReactNode;

  /**
   * Label to use for this component.
   */
  label?: ReactNode;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
