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

  /**
   * List state which contains the items (and their config) to be rendered inside the list box
   */
  state: ListState<T>;

  /**
   * Determines if the listbox should autofocus or not
   */
  autoFocus?: boolean | FocusStrategy;

  /**
   * Determines if the listbox allows for empty selection
   */
  disallowEmptySelection?: boolean;
}
