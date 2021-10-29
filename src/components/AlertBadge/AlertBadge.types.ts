import { CSSProperties, ReactNode } from 'react';
import { ButtonSimpleProps } from '../ButtonSimple';

export interface Props extends ButtonSimpleProps {
  /**
   * Child components of this ButtonPill.
   */
  children?: ReactNode;

  /**
   * Color for this component.
   */
  color?: 'error' | 'success' | 'theme' | 'warning';

  /**
   * Image to use for this component.
   */
  image?: ReactNode;

  /**
   * Label to use for this component.
   */
  label?: ReactNode;
}
