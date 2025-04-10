import type { AriaSelectProps } from '@react-types/select';
import { CSSProperties } from 'react';
import { RequireOneOf } from '../../utils/types';

export type SelectDirection = 'top' | 'bottom';

interface SelectProps<T> extends AriaSelectProps<T> {
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

  /**
   * Whether this component is a child of, or associated to, a form
   */
  isInForm?: boolean;

  /**
   * Override the list box width to allow for fixed popover strategy
   *
   * To style the list box without applying fixed popover strategy, pass in className instead
   *
   * NOTE: if set, the popover strategy will be set to 'fixed'
   */
  listboxWidth?: string;

  /**
   * Whether or not this Select should look disabled, but allow focus, etc.
   */
  shallowDisabled?: boolean;

  /**
   * Used to ensure only one select popover group is open at a time. Pass a unique string to this prop to group selects together.
   */
  popoverSingleOpenGroupId?: string;
}

export type Props<T> = SelectProps<T> &
  RequireOneOf<SelectProps<T>, ['label', 'aria-label', 'aria-labelledby']>;
