import { CSSProperties, ReactNode } from 'react';
import { AriaLabelRequired } from 'src/utils/a11y';

export type Props = {
  /**
   * Child components of this Coachmark.
   */
  children: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * ID of the coachmark.
   */
  id: string;

  /**
   * ID of the element that triggers the coachmark.
   */
  triggerID: string;

  /**
   * Arial label for the close button.
   */
  'close-button-aria-label'?: string;
} & AriaLabelRequired;
