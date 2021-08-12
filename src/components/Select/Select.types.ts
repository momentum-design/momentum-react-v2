import type { AriaSelectProps } from '@react-types/select';

export interface Props<T> extends AriaSelectProps<T> {
  /**
   * className prop description
   */
  className?: string;
  /**
   * Text to display inside the dropdown when there is no selection.
   */
  placeholder?: string;
}
