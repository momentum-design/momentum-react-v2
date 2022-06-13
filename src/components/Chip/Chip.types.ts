import { CSSProperties, ReactElement } from 'react';
import { AvatarProps } from '../Avatar';
import { IconProps } from '../Icon';
import { TeamColor } from '../ThemeProvider/ThemeProvider.types';

export type SupportedAvatar = ReactElement<AvatarProps>;
export type SupportedIcon = ReactElement<IconProps>;
export type SupportedColor = TeamColor;
export type SupportedSize = 16 | 24 | 28 | 32;

export interface Props {
  /**
   * Text of the chip, overwritten by text prop.
   */
  children?: string;

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
   * The text to be displayed by the chip.
   */
  text?: string;

  /**
   * The left Icon shown inside the chip.
   */
  leftIcon?: SupportedIcon;

  /**
   * The right Icon shown inside the chip
   */
  rightIcon?: SupportedIcon;

  /**.2
   * Avatar shown in place of the left icon if present.
   */
  avatar?: SupportedAvatar;

  /**
   * Boolean to describe if the chip will have an outline style.
   */
  outline?: boolean;

  /**
   * Boolean to describe if the chip is disabled.
   */
  disabled?: boolean;

  /**
   * Boolean to describe if the chip is in the error state.
   */
  error?: boolean;

  /**
   * String to describe the color.
   */
  chipColor?: SupportedColor;

  /**
   * Boolean to describe if a chip should be multiline style.
   */
  multiline?: boolean;

  /**
   * Boolean to describe if a chip should be search style.
   */
  search?: boolean;

  /**
   * Number to describe the size of component.
   */
  size?: SupportedSize;
}
