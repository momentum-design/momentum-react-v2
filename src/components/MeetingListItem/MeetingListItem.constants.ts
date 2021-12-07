import { MeetingMarker } from './MeetingListItem.types';

const CLASS_PREFIX = 'md-meeting-list-item';

const DEFAULTS = {
  color: MeetingMarker.Transparent,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  startSection: `${CLASS_PREFIX}-start-section`,
  border: `${CLASS_PREFIX}-border`,
  middleSection: `${CLASS_PREFIX}-middle-section`,
  endSection: `${CLASS_PREFIX}-end-section`,
  startSectionNoImage: `${CLASS_PREFIX}-start-section-no-image`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
