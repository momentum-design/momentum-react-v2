import { CSSProperties, ReactElement } from 'react';

import { ButtonSimpleProps } from 'components/ButtonSimple';
import { IconProps } from 'components/Icon';

export type SupportedButtons = ButtonSimpleProps;
export type SupportedImages = IconProps;

export interface Props {
  /**
   * Buttons to mount to this component.
   */
  buttons?: ReactElement<SupportedButtons> | Array<ReactElement<SupportedButtons>>;

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
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Image to be displayed with this component.
   */
  image?: ReactElement<SupportedImages>;

  /**
   * If this component should have its contents centered.
   */
  isCentered?: boolean;

  /**
   * If this component show grow its width to the parent container.
   */
  isGrown?: boolean;

  /**
   * If this component should be the pill shape.
   */
  isPilled?: boolean;

  /**
   * If this ToastBanner will display static children. This will override the `color` prop.
   */
  isStatic?: boolean;

  /**
   * Label/message to be displayed with this component.
   */
  label?: string;

  /**
   * Size of this component.
   */
  size?: 'default' | 'small';

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
