import { CSSProperties } from 'react';
import { AriaSearchFieldProps } from '@react-types/searchfield';

export interface SearchFilterTranslations {
  text: string;
  empty: string;
  nonempty: string;
  filterAdded: string;
  filterRemoved: string;
}

export interface SearchFilter {
  term: string;
  value: string;
  translations: SearchFilterTranslations;
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

  /**
   * aria-label for clear button
   */
  clearButtonAriaLabel?: string;

  /**
   * Initial text for hidden label
   */
  initialLabel?: string;
}
