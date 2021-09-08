import { CSSProperties, ReactNode } from 'react';
import { AriaSearchFieldProps } from '@react-types/searchfield';

export interface Props extends AriaSearchFieldProps {
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
   * Whether the global search is searching or not
   */
  searching?: boolean;

  /**
   * Number of characters to highlight in bubble
   */
  numHighlighted?: number;
}
