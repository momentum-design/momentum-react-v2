import { CSSProperties, ReactNode, ComponentProps } from 'react';
import FocusLock from 'react-focus-lock';

export type Color = 'primary' | 'secondary';

export interface Props {
  /**
   * Child components of this Overlay.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Color for this component.
   */
  color?: Color;

  /**
   * If this component covers the full view port.
   */
  fullscreen?: boolean;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Props to be passed to FocusLock
   */
  focusLockProps?: Omit<ComponentProps<typeof FocusLock>, 'children'>;

  /**
   * Callback function for when the escape key is pressed on the container div
   * @param event - React Keyboard Event
   */
  onKeyDown?: (event: React.KeyboardEvent) => void;
}
