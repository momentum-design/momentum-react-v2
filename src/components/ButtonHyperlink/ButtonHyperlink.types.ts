import { ReactNode } from 'react';
import { AriaButtonProps } from '@react-types/button';
import { AriaLinkProps } from '@react-types/link';
import { roleType } from './ButtonHyperlink.constants';

type myProps = AriaLinkProps & AriaButtonProps<'a'>;
export interface Props extends myProps {
  /**
   * Custom class to be able to override the component's CSS
   */
  className?: string;
  /**
   * Child components of this ButtonDialpad. This prop replaces primaryText.
   */
  children?: ReactNode;

  /**
   * Whether or not this ButtonDialpad is disabled.
   */
  disabled?: boolean;

  /**
   * Whether or not this ButtonDialpad has inverted theme colors.
   */
  inverted?: boolean;

  /**
   * title to use for this component.
   */
  title?: string;

  /**
   * role to be 'button' or 'link'
   */
  role?: roleType;
}
