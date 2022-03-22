import { CSSProperties, ReactElement } from 'react';

import { AriaButtonProps } from '@react-types/button';

import { BadgeProps } from 'components/Badge';
import { IconProps } from 'components/Icon';
import { TextProps } from 'components/Text';

export interface Props extends AriaButtonProps {
  /**
   * Child components of this Tab.
   */
  children?: string | ReactElement<TextProps | BadgeProps | IconProps>[];

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
