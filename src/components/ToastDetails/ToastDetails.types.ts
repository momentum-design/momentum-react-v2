import { CSSProperties, ReactElement } from 'react';

import { AvatarProps } from '../Avatar';
import { ButtonControlProps } from '../ButtonControl';

export type SupportedControlButtons = ButtonControlProps;
export type SupportedImages = AvatarProps;

export interface Props {
  /**
   * Badges to display on this ToastDetails. This overrides the info prop.
   */
  badges?: string | Array<string>;

  /**
   * The title of this ToastDetails.
   */
  children?: string;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Control buttons for this ToastDetails.
   */
  controls?: ReactElement<SupportedControlButtons> | Array<ReactElement<SupportedControlButtons>>;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Image for this ToastDetails.
   */
  image: ReactElement<SupportedImages>;

  /**
   * Colorizable information associated with this ToastDetails.
   */
  info?: string;

  /**
   * Color to use when rendering the info prop.
   */
  infoColor?: 'cancel' | 'join' | 'success' | 'warning';

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * The subject of this ToastDetails.
   */
  subject?: string;

  /**
   * The title of this ToastDetails. Overrides the children prop.
   */
  title?: string;
}
