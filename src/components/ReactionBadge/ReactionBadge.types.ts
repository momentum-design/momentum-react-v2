import { CSSProperties, ReactNode } from 'react';
import { AriaButtonProps } from '@react-types/button';

export interface Props extends AriaButtonProps {
  /**
   * Child components of this ButtonPill.
   * TODO: this will become custom emoji/reaction component mapping string -> SVG
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom number of people who have reacted.
   */
  count?: number;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Whether or not the person ahs reacted with the specific reaction
   */
  reacted?: boolean;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
