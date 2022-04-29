import type { ScheduleInfoColor } from './MeetingContainer.types';
const CLASS_PREFIX = 'md-meeting-container';

const SCHEDULE_INFO_COLORS: Record<string, ScheduleInfoColor> = {
  SUCCESS: 'success',
  SECONDARY: 'secondary',
};

const ANCHORS = {
  TOP: 'top',
  CENTER: 'center',
};

const DEFAULTS = {
  ANCHOR: ANCHORS.TOP,
  IS_DISABLED: false,
  SCHEDULE_INFO_COLOR: SCHEDULE_INFO_COLORS.SECONDARY,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  header: `${CLASS_PREFIX}-header`,
  actions: `${CLASS_PREFIX}-actions`,
  tags: `${CLASS_PREFIX}-tags`,
  details: `${CLASS_PREFIX}-details`,
  upper: `${CLASS_PREFIX}-upper`,
  lower: `${CLASS_PREFIX}-lower`,
  left: `${CLASS_PREFIX}-left`,
  right: `${CLASS_PREFIX}-right`,
  padding: `${CLASS_PREFIX}-padding`,
  title: `${CLASS_PREFIX}-title`,
  spaceLink: `${CLASS_PREFIX}-spaceLink`,
  date: `${CLASS_PREFIX}-date`,
  convo: `${CLASS_PREFIX}-convo`,
  avatar: `${CLASS_PREFIX}-avatar`,
  now: `${CLASS_PREFIX}-now`,
  container: `${CLASS_PREFIX}-container`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE, SCHEDULE_INFO_COLORS, ANCHORS };
