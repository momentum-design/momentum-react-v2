import { CSSProperties } from 'react';
import { AriaListBoxProps } from '@react-types/listbox';
import { AsyncLoadable } from '@react-types/shared';

export interface Props<T> extends AriaListBoxProps<T>, AsyncLoadable {
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
   * Function called when the user is scrolling through the list
   */
  onScroll?: () => void;

  /**
   * Height of the list item inside this list
   */
  itemHeight?: number;
}
