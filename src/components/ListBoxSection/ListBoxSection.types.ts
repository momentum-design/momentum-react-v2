import { Node } from '@react-types/shared';

export interface Props<T> {
  /**
   * className prop description
   */
  className?: string;
  header: T;
  section?: Node<T>;
}
