import { Node } from '@react-types/shared';

export interface Props<T> {
  /**
   * className prop description
   */
  className?: string;
  item: Node<T>;
}
