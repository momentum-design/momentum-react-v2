import type { AriaSelectProps } from '@react-types/select';
import { CSSProperties } from 'react';

export type SelectDirection = 'top' | 'bottom';

export interface Props<T> extends AriaSelectProps<T> {
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
   * Text to display inside the dropdown when there is no selection.
   */
  placeholder?: string;

  /**
   * Direction in which the option list will display
   * @default bottom
   */
  direction?: SelectDirection;

  /**
   * title to use for this component.
   */
  title?: string;

  /**
   * showBorder for the component
   */
  showBorder?: boolean;

  /**
   * To override the list box max height
   */
  listboxMaxHeight?: string;
}
