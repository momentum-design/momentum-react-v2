import { ReactNode } from 'react';

export interface Props {
  /**
   * className prop description
   */
  className?: string;
  children?: ReactNode;
  position?: 'start' | 'middle' | 'end' | 'fill';
}
