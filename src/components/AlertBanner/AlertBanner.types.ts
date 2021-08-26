import { CSSProperties, ReactElement } from 'react';
import { ButtonCircleProps } from '../ButtonCircle';
import { IconProps } from '../Icon';

export type SupportedButtons = ButtonCircleProps;
export type SupportedImages = IconProps;

export interface Props {
  /**
   * Buttons to mount to this component.
   */
  buttons?: ReactElement<SupportedButtons> | Array<ReactElement<SupportedButtons>>;

  /**
   * If this component should have its contents centered.
   */
  isCentered?: boolean;

  /**
   * Label/message to be displayed with this component. Overrides `label`.
   */
  children?: string;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Color for this component.
   */
  color?: 'default' | 'error' | 'success' | 'theme' | 'warning';

  /**
   * If this component show grow its width to the parent container.
   */
  isGrown?: boolean;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Image to be displayed with this component.
   */
  image?: ReactElement<SupportedImages>;

  /**
   * Label/message to be displayed with this component.
   */
  label?: string;

  /**
   * If this component should be the pill shape.
   */
  isPilled?: boolean;

  /**
   * Size of this component.
   */
  size?: 'default' | 'small';

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
