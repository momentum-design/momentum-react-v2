import { ReactNode } from "react";

export interface Props {
  /**
   * Child components of this ButtonPill.
   */
  children?: ReactNode;

  /**
   * Whether or not this ButtonPill is disabled.
   */
  disabled?: boolean;

  /**
   * Whether or not this ButtonPill is ghosted.
   */
  ghost?: boolean;

  /**
   * Icon to display on this ButtonPill.
   */
  icon?: ReactNode;

  /**
   * Message to display on this ButtonPill.
   */
  message?: string;

  /**
   * Click event handler.
   */
  onClick?: () => void;

  /**
   * Whether to use the outline variant of this ButtonPill if available.
   */
  outline?: boolean;

  /**
   * Size index of this ButtonPill.
   */
  size?: number;

  /**
   * Color profile to use with this ButtonPill.
   */
  color?: 'join' | 'cancel' | 'message';
}
