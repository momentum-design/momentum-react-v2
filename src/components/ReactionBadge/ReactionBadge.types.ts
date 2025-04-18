import type { ReactElement } from 'react';
import type { ReactionProps } from '../Reaction';
import type { MdcButtonProps } from '../../types';

export type SupportedReactions = ReactionProps;
export interface Props extends MdcButtonProps {
  /**
   * Custom number of reactions.
   */
  count?: number;

  /**
   * Whether or not the person ahs reacted with the specific reaction
   */
  reacted?: boolean;

  /**
   * Child reaction of this ReactionBadge.
   */
  reaction?: ReactElement<SupportedReactions>;
}
