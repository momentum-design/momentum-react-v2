import { CSSProperties, ReactElement } from 'react';

import { ReactionButtonProps } from '../ReactionButton';

export type SupportedChildren = ReactionButtonProps;
export interface Props {
  /**
   * Child components of this ReactionPicker.
   */
  children?: ReactElement<SupportedChildren> | Array<ReactElement<SupportedChildren>>;

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
}
