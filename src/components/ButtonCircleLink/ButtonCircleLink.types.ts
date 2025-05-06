import { Props as LinkProps } from '../Link/Link.types';

export type Size = 64 | 52 | 40 | 32 | 28 | 20;

type ButtonCircleLinkProps = {
  /**
   * Color profile to use with this ButtonCircle.
   */
  color?: 'join' | 'cancel' | 'message';

  /**
   * Whether or not this ButtonCircle should look disabled, but allowing actions like onPress to be passed.
   */
  shallowDisabled?: boolean;

  /**
   * Whether or not this ButtonCircle has a transparent background.
   */
  ghost?: boolean;

  /**
   * Whether or not this ButtonCircle has an outline/border.
   */
  outline?: boolean;

  /**
   * Size index of this ButtonCircle.
   */
  size?: Size;
};

export type Props = ButtonCircleLinkProps & LinkProps;
