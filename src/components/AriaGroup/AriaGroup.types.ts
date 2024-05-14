import { ReactNode } from 'react';

export interface Props {
  /**
   * aria-label attribute for the AriaGroup
   */
  ariaLabel?: string;

  /**
   * aria-labelledby attribute for the AriaGroup
   */
  ariaLabelledby?: string;

  /**
   * Child components of this AriaGroup.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;
}
