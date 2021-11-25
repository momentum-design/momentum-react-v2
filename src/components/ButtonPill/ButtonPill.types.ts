import { ReactNode } from 'react';
import { ButtonSimpleProps } from '../ButtonSimple';

export interface Props extends ButtonSimpleProps {
  /**
   * Child components of this ButtonPill.
   */
  children?: ReactNode;

  /**
   * Color profile to use with this ButtonPill.
   */
  color?: 'join' | 'cancel' | 'message';

  /**
   * Whether or not this ButtonPill is disabled.
   */
  disabled?: boolean;

  /**
   * Whether or not this ButtonPill is ghosted.
   */
  ghost?: boolean;

  /**
   * Whether to use the outline variant of this ButtonPill if available.
   */
  outline?: boolean;

  /**
   * Whether to use the solid background variant of this ButtonPill. Only available with outline currently.
   */
  solid?: boolean;

  /**
   * Size index of this ButtonPill.
   */
  size?: number;
}
