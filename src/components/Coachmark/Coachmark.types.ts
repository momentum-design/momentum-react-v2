import { PopoverPlacement } from '@momentum-design/components';
import { CSSProperties, ReactNode } from 'react';
import { AriaLabelRequired } from '../../utils/a11y';

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
   * Whether the close button should be shown.
   */
  'close-button'?: boolean;

  /**
   * Arial label for the close button.
   */
  'close-button-aria-label'?: string;

  /**
   * Placement of the coachmark.
   */
  placement?: PopoverPlacement;

  /**
   * Focus back to trigger on hide.
   */
  'focus-back-to-trigger'?: boolean;

  /**
   * Callback for when the coachmark is shown.
   */
  onShown?: () => void;

  /**
   * Callback for when the coachmark is hidden.
   */
  onHidden?: () => void;

  /**
   * Callback for when the coachmark is created (added to the DOM).
   */
  onCreated?: () => void;

  /**
   * Callback for when the coachmark is destroyed (removed from the DOM).
   */
  onDestroyed?: () => void;
} & AriaLabelRequired;
