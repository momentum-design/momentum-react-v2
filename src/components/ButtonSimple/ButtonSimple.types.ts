import { AriaRole, CSSProperties, ReactNode } from 'react';
import { AriaButtonProps } from '@react-types/button';
import { HoverProps } from '@react-aria/interactions';

export interface Props extends AriaButtonProps, HoverProps {
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
   * title to use for this component.
   */
  title?: string;

  /**
   * Use the native onKeyDown event handler to allow `enter` & `space` keypress events fire a onClick (like a native HTML button does)
   *
   * This is necessary since `react-aria` supress that behaviour by design.
   */
  useNativeKeyDown?: boolean;

  /**
   * Role for adding accessibility
   */
  role?: AriaRole;

  /**
   * Tabindex for accessibility
   */
  tabIndex?: number;
}
