import { CSSProperties } from 'react';

export type TextToastTextAlign = 'left' | 'center';

export interface Props {
  /**
   * Text to be displayed in TextToast component
   */
  text: string;

  /**
   * Alignment of the Text in the TextToast component.
   *
   * Default: `center`
   */
  textAlignment?: TextToastTextAlign;

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
