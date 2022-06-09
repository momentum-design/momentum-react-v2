import { CSSProperties, ReactElement } from 'react';

import { AvatarProps } from '../Avatar';
import { ButtonGroupProps } from '../ButtonGroup';
import { ModalContainerProps } from '../ModalContainer';

export type Shape = 'rectangle' | 'square';

export type SupportedImage = AvatarProps;
export type SupportedActions = ButtonGroupProps;

export interface Props extends ModalContainerProps {
  /**
   * Actions associated with this Banner.
   */
  actions?: ReactElement<SupportedActions>;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Description associated with this Banner. Appears below the title.
   */
  description?: string;

  /**
   * Details associated with this Banner. Appears below the description.
   */
  details?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Image associated with this Banner. This appears at the top of the Banner.
   */
  image?: ReactElement<SupportedImage>;

  /**
   * If this Banner is an alert. In this case, it is centered with priority within the page.
   */
  isAlert?: boolean;

  /**
   * Shape to render this Banner as.
   */
  shape?: Shape;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Title of this Banner. Appears below the Image.
   */
  title?: string;
}
