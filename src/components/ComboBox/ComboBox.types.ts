import { CSSProperties } from 'react';
import type { ComboBoxProps } from '@react-types/combobox';

export interface Props<T> extends ComboBoxProps<T> {
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

  showButton?: boolean;
}
