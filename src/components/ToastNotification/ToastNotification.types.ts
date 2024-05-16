import { PressEvent } from '@react-types/shared';
import { CSSProperties, ReactElement, ReactNode } from 'react';

import { AvatarProps } from '../Avatar';
import { IconProps } from '../Icon';
import { BadgeProps } from '../Badge';
import { ButtonPillProps } from '../ButtonPill';
import { ButtonCircleProps } from '../ButtonCircle';

export type SupportedLeadingVisuals = AvatarProps | IconProps | BadgeProps;
export type SupportedButtonGroup = ButtonPillProps | ButtonCircleProps;

export interface Props {
  /**
   * The free string or a ReactElement that appears inside the Notification toast.
   */
  content: ReactNode;
  /**
   * Leading visual of this notification toast. It can be an Icon, Avatar or Badge.
   */
  leadingVisual?: ReactElement<SupportedLeadingVisuals>;

  /**
   * Button group that appears on the bottom of this Notification toast.
   */
  buttonGroup?: ReactElement<SupportedButtonGroup>;

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
   * Callback when user clicks on the close button.
   */
  onClose?: (event: PressEvent) => void;

  /**
   * Close button's aria-label
   */
  closeButtonLabel?: string;
}
