import { Node } from '@react-types/shared';
import { ReactNode } from 'react';

export interface Props<T> {
  /**
   * className prop description
   */
  className?: string;
  header: ReactNode;
  section?: Node<T>;
}
