import { CSSProperties } from 'react';
import { IconProps } from '../Icon';

export type TextToastTextAlign = 'left' | 'center';

export interface Props {
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

  /**
   * Text to be displayed in TextToast component
   */
  text: string;

  /**
   * Alignment of the Text in the TextToast component.
   *
   * @default center
   */
  textAlignment?: TextToastTextAlign;

  /**
   * IconProps to be passed in - allows defining the icon which should
   * be shown on the left-hand side of the text. At least the `name` property
   * should be passed in through the object, otherwise the Icon will not be shown.
   *
   * @default undefined
   */
  iconProps?: IconProps;
}
