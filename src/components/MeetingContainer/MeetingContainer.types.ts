import { ReactElement } from 'react';
import type { CardProps } from '../Card';
import type { ButtonCircleProps } from '../ButtonCircle';
import type { ButtonPillProps } from '../ButtonPill';
import type { TagProps } from '../Tag';
import type { AvatarProps } from '../Avatar';
import type { ButtonHyperlinkProps } from '../ButtonHyperlink';
import type { FontStyle } from '../Text/Text.types';

export type SupportedActionButton = ReactElement<ButtonPillProps | ButtonCircleProps>;
export type SupportedTag = ReactElement<TagProps>;
export type SupportedAvatar = ReactElement<AvatarProps>;
export type SupportedButtonHyperlink = ReactElement<ButtonHyperlinkProps | ButtonPillProps>;
export type ScheduleInfoColor = 'secondary' | 'success' | 'primary';

export interface Props extends CardProps {
  /**
   * Title of meeting, overrides children.
   */
  meetingTitle?: string;

  /**
   * Link to space or conversation if meeting is not space backed.
   */
  spaceLink?: SupportedButtonHyperlink;

  /**
   * Action buttons supplied by consumer.
   */
  actionButtons?: Array<SupportedActionButton>;

  /**
   * Tags supplied by consumer, renders tags if present.
   */
  tags?: Array<SupportedTag>;

  /**
   * User avatar supplied by consumer.
   */
  avatar?: SupportedAvatar;

  /**
   *  Sets title of meeting, overwritten by meetingTitle.
   */
  children?: string;

  /**
   * Left side of schedule info, provided by consumer. Ex: "In progress","10:00am-11:00am."
   */
  scheduleInfoFirst?: string;

  /**
   * Right side of schedule info, provided by consumer. Ex: duration,"Mon, Jan 1, 2023."
   */
  scheduleInfoSecond?: string;

  /**
   * Text color for left side of schedule info area
   */
  scheduleInfoFirstColor?: ScheduleInfoColor;

  /**
   * Text color for right side of schedule info area
   */
  scheduleInfoSecondColor?: ScheduleInfoColor;

  /**
   * Determines if container is static - disabled interactions, makes card transparent
   */
  isStatic?: boolean;

  /**
   * Determines if container is disabled
   */
  disabled?: boolean;

  /**
   * Takes title type
   */
  titleType?: FontStyle;
}
