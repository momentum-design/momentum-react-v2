import { ReactNode } from 'react';
import { MeetingMarker } from '../MeetingListItem';

export interface Props {
  /**
   * Child components of this MeetingRowContent.
   */
  children?: ReactNode;

  /**
   * Buttons or icons for end of item
   */
  buttonGroup?: ReactNode;

  /**
   * Determines if this item is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Icon, Avatar, or other content for beginning of item
   */
  image?: ReactNode;

  /**
   * Color status
   */
  color?: MeetingMarker;
}
