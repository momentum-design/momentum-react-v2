import { ButtonCircleProps } from './../ButtonCircle/index';
import { CSSProperties, ReactElement } from 'react';
import { ReactionProps } from '../Reaction';

export type SupportedChildren = ReactionProps;

export interface Props extends ButtonCircleProps {
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
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
