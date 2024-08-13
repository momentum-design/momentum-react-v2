import { CSSProperties } from 'react';
import { AriaSearchFieldProps } from '@react-types/searchfield';
import { HEIGHTS } from './SearchInput.constants';

export type SearchFieldHeight = typeof HEIGHTS[number];

export interface SearchFilterTranslations {
  /**
   * The text shown in the filter bubble
   */
  text: string;
  /**
   * The accessible description of the empty state of the filter
   * e.g. describing what to do with this filter
   */
  empty: string;
  /**
   * The accessible description of the nonempty state of the filter
   * e.g. describing the active filter
   */
  nonempty: string;
  /**
   * The accessible description of the filter being added
   */
  filterAdded: string;
  /**
   * The accessible description of the filter being removed
   */
  filterRemoved: string;
}

export interface SearchFilter {
  /**
   * The type of filter, used at the key so must be unique e.g. from/in/with
   */
  term: string;
  /**
   * The value currently being filtered by the filter
   */
  value: string;
  /**
   * The translations object for filter
   */
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
  clearButtonAriaLabel: string;

  /**
   * Initial text for accessible label
   */
  initialLabel?: string;

  /**
   * Height of the search field
   * @default 32
   */
  height?: SearchFieldHeight;

  /**
   * While isCombobox=true, the HTML ID of the element that this SearchInput relates to,
   * used for the aria-controls attribute
   */
  controls?: string;

  /**
   * Whether SearchInput is being used with a role of combobox or else searchbox
   */
  isCombobox?: boolean;

  /**
   * While isCombobox=true, whether the combobox is expanded/collapsed,
   * used for the aria-expanded attribute
   */
  isExpanded?: boolean;
}
