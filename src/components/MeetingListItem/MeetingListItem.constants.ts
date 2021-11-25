import { MeetingMarker } from './MeetingListItem.types';

const CLASS_PREFIX = 'md-meeting-list-item';

const DEFAULTS = {
  color: MeetingMarker.Empty,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  startSection: `${CLASS_PREFIX}-start-section`,
  border: `${CLASS_PREFIX}-border`,
  middleSection: `${CLASS_PREFIX}-middle-section`,
  endSection: `${CLASS_PREFIX}-end-section`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
