import type { AriaSelectProps } from '@react-types/select';

export type SelectDirection = 'top' | 'bottom';
export interface Props<T> extends AriaSelectProps<T> {
  /**
   * Custom class to be able to override the component's CSS
   */
  className?: string;
  /**
   * Text to display inside the dropdown when there is no selection.
   */
  placeholder?: string;
  /**
   * Direction in which the option list will display
   * @default bottom
   */
  direction?: SelectDirection;
}
