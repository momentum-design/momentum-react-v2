import { ReactNode } from 'react';
import { ButtonSimpleProps } from '../ButtonSimple';

export type ContentVariations = {
  stringContentVariations: string[];
  includeIcon: boolean;
};

export interface Props extends ButtonSimpleProps {
  /**
   * Child components of this ButtonPill.
   */
  children?: ReactNode;

  /**
   * Color profile to use with this ButtonPill.
   */
  color?: 'join' | 'cancel' | 'message';

  /**
   * Whether or not this ButtonPill is disabled.
   */
  disabled?: boolean;

  /**
   * Whether or not this ButtonPill should look disabled, but allowing actions like onPress to be passed.
   */
  shallowDisabled?: boolean;

  /**
   * Whether or not this ButtonPill has a transparent background.
   */
  ghost?: boolean;

  /**
   * If this component show grow its width to the parent container.
   */
  grown?: boolean;

  /**
   * Whether or not this ButtonPill has an outline/border.
   */
  outline?: boolean;

  /**
   * Whether or not this ButtonCircle has inverted background (black for dark mode and white for light mode).
   */
  inverted?: boolean;

  /**
   * Size index of this ButtonPill.
   */
  size?: number;

  /**
   * An object consisting of an array of strings, stringContentVariations, and a boolean, includeIcon.
   * stringContentVariations are the strings that may be passed as children to the `<ButtonPill />` component
   * depending on various state changes. includeIcon is whether or not to include an icon in the fixed width.
   * Use this prop to acheive a fixed button width based on the longest string and avoid unwanted layout changes.
   */
  contentVariations?: ContentVariations;
}
