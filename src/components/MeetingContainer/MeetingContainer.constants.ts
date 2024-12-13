import { TEXT_CONSTANTS } from '../Text';

import type { ScheduleInfoColor } from './MeetingContainer.types';

const CLASS_PREFIX = 'md-meeting-container';

const SCHEDULE_INFO_COLORS: Record<string, ScheduleInfoColor> = {
  SUCCESS: 'success',
  SECONDARY: 'secondary',
  PRIMARY: 'primary',
};

const ANCHORS = {
  TOP: 'top',
  CENTER: 'center',
};

const DEFAULTS = {
  ANCHOR: ANCHORS.TOP,
  IS_DISABLED: false,
  SCHEDULE_INFO_COLOR: SCHEDULE_INFO_COLORS.SECONDARY,
  TITLE_TYPE: TEXT_CONSTANTS.TYPES.HEADER_PRIMARY,
  TITLE_TAG_NAME: 'h3' as const,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  actions: `${CLASS_PREFIX}-actions`,
  tags: `${CLASS_PREFIX}-tags`,
  details: `${CLASS_PREFIX}-details`,
  avatar: `${CLASS_PREFIX}-avatar`,
  container: `${CLASS_PREFIX}-container`,
  spaceLink: `${CLASS_PREFIX}-space-link`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE, SCHEDULE_INFO_COLORS, ANCHORS };
