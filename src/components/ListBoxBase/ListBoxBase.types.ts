import { FocusStrategy } from '@react-types/shared';
import { ListState } from '@react-stately/list';
import { CSSProperties } from 'react';

export interface Props<T> {
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

  state: ListState<T>;
  autoFocus?: boolean | FocusStrategy;
  disallowEmptySelection?: boolean;
}
