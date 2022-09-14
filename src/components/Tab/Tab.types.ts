import { CSSProperties, ReactElement } from 'react';
import { BadgeProps } from '../Badge';
import { IconProps } from '../Icon';
import { TextProps } from '../Text';
import { AriaButtonProps } from '@react-types/button';

export interface Props extends AriaButtonProps {
  /**
   * Child components of this Tab.
   */
  children?: string | ReactElement<TextProps | BadgeProps | IconProps | undefined>[];

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
   * Determines whether the tab is active or not.
   */
  active?: boolean;

  /**
   * Determines whether the tab is disabled or not.
   */
  disabled?: boolean;
}
