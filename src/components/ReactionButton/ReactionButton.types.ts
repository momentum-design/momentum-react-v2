import { ButtonCircleProps } from './../ButtonCircle/index';
import { ReactElement } from 'react';
import { ReactionProps } from '../Reaction';

export type SupportedChildren = ReactionProps;

export interface Props extends ButtonCircleProps {
  /**
   * Child components of this ReactionPicker.
   */
  children?: ReactElement<SupportedChildren>;

  /**
   * Whether or not this reaction has been selected
   */
  reacted?: boolean;
}
