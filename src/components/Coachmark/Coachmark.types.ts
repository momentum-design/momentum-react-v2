import { ButtonSimpleProps } from 'components/ButtonSimple';
import { PopoverProps } from 'components/Popover';

import type { ReactElement, ReactNode } from 'react';

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
  icon?: string;

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
