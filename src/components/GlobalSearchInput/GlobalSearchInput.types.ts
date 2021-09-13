import { CSSProperties } from 'react';
import { AriaSearchFieldProps } from '@react-types/searchfield';

export interface SearchFilter {
  term: 'from' | 'in' | 'with';
  value: string;
}

export interface Props extends AriaSearchFieldProps {
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
   * List of keywords to highlight at the beginning of the input
   */
  filters?: SearchFilter[];

  /**
   * Callback that is triggered when user deletes a keyword
   */
  onFiltersChange?: (keywords: SearchFilter[]) => void;
}
