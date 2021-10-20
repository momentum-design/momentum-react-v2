import { ButtonCircleProps } from './../ButtonCircle/index';
import { CSSProperties } from 'react';

export interface Props extends ButtonCircleProps {
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
