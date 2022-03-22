import { ReactElement } from 'react';

import { ButtonCircleProps } from 'components/ButtonCircle/index';
import { ReactionProps } from 'components/Reaction';

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
