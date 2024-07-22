import { ReactNode } from 'react';
import { AriaLinkProps } from '@react-types/link';
import { Props as IconProps } from '../Icon/Icon.types';

export interface Props extends AriaLinkProps {
  /**
   * Custom class to be able to override the component's CSS
   */
  className?: string;
  /**
   * Child components of this component. This prop replaces primaryText.
   */
  children?: ReactNode;

  /**
   * Whether or not this component is disabled.
   */
  disabled?: boolean;

  /**
   * Whether or not this component has inverted theme colors.
   */
  inverted?: boolean;

  /**
   * title to use for this component.
   */
  title?: string;

  /**
   * whether or not this component has icon【name = pop-out】 in the right
   */
  isWithIcon?: boolean;

  /**
   * icon props
   * When use iconProps isWithIcon is necessary
   */
  iconProps?: Partial<IconProps>;
}
