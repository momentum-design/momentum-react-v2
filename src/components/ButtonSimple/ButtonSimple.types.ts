import { CSSProperties, ReactNode } from 'react';
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
}
