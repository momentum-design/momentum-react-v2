import { CSSProperties, Key, ReactNode } from 'react';
import { Node } from '@react-types/shared';
import { TreeState } from '@react-stately/tree';

export interface Props<T> {
  /**
   * Child components of this MenuSection.
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

  item: Node<T>;
  state: TreeState<T>;
  onAction?: (key: Key) => void;
}
