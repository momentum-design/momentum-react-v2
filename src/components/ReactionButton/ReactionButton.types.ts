import { CSSProperties, ReactElement } from 'react';
import { AriaButtonProps } from '@react-types/button';
import { ReactionProps } from '../Reaction';

export type SupportedChildren = ReactionProps;

export interface Props extends AriaButtonProps {
  /**
   * Child components of this ReactionPicker.
   */
  children?: ReactElement<SupportedChildren>;
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Whether or not this reaction has been selected
   */
  reacted?: boolean;

  /**
   * Size index of this Reaction.
   */
  size?: 64 | 52 | 40 | 32 | 28;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
