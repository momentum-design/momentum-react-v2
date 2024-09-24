import type { ReactElement, ReactNode } from 'react';

import { ButtonSimpleProps } from '../ButtonSimple';
import { PopoverProps } from '../Popover';
import { InferredIconName } from '../Icon/Icon.types';

export interface CoachmarkWithoutHeaderProps {
  /**
   * Actions associated with this Coachmark.
   */
  actions?: ReactElement<ButtonSimpleProps> | Array<ReactElement<ButtonSimpleProps>>;

  /**
   * Content to display on this Coachmark.
   */
  children: ReactNode;

  /**
   * Event handler to handle dismissing the Coachmark.
   */
  onDismiss?: () => void;
}

export interface CoachmarkWithHeaderProps extends CoachmarkWithoutHeaderProps {
  /**
   * Icon to display to the left of the title.
   */
  icon?: InferredIconName;

  /**
   * Image associated with this Coachmark.
   */
  image?: ReactElement<HTMLImageElement>;

  /**
   * Title of this Coachmark.
   */
  title?: string;
}

export interface Props extends PopoverProps, CoachmarkWithHeaderProps {
  /**
   * Whether or not this Coachmark is to be visible.
   */
  isVisible?: boolean;
}
