import { CSSProperties } from 'react';
import { AriaSwitchBase } from '@react-types/switch';

export interface Props extends Omit<AriaSwitchBase, 'children'> {
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
   * Boolean to describe when toggle is on/off
   */
  isSelected?: boolean;

  /**
   * String that displays the label of this toggle.
   */
  label?: string;
}
