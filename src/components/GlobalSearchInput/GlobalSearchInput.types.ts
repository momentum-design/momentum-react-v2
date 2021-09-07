import { CSSProperties, ReactNode } from 'react';

export interface Props {
  /**
   * Child components of this ButtonPill.
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

  /**
   * Current value of input
   */
  value?: string;

  /**
   * Whether the global search is searching or not
   */
  searching?: boolean;

  /**
   * Called when the input changes
   */
  onChange?: () => string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
}
