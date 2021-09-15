const CLASS_PREFIX = 'md-avatar-list-item';

const SCHEDULER_STATES = {
  available: 'available',
  unavailable: 'unavailable',
  unknown: 'unknown',
  quietHours: 'quiet-hours',
  none: 'none',
};

const DEFAULTS = {
  SCHEDULER_STATE: SCHEDULER_STATES.none,
  IS_MUTED: true,
  AVATAR_PROPS: { title: 'C' },
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  actionsWrapper: `${CLASS_PREFIX}-actions-wrapper`,
  textWrapper: `${CLASS_PREFIX}-text-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE, SCHEDULER_STATES };
