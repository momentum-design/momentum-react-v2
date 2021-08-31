import { CSSProperties } from 'react';
import { AriaButtonProps } from '@react-types/button';
import { ReactionProps } from '../Reaction';

export type SupportedReactions = ReactionProps;

export interface Props extends AriaButtonProps {
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom number of reactions.
   */
  count?: number;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * The name of the Reaction component to render.
   */
  name: string;

  /**
   * Whether or not the person ahs reacted with the specific reaction
   */
  reacted?: boolean;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
