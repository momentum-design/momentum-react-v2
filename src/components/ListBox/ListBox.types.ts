import type { AriaListBoxProps } from '@react-types/listbox';
import { CSSProperties } from 'react';

export interface Props<T> extends AriaListBoxProps<T> {
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
}
