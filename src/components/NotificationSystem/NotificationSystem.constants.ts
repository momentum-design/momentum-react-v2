const CLASS_PREFIX = 'md-notification-system';

const POSITION = {
  TOP_RIGHT: 'top-right',
  BOTTOM_RIGHT: 'bottom-right',
  TOP_LEFT: 'top-left',
  BOTTOM_LEFT: 'bottom-left',
} as const;

const DEFAULTS = {
  POSITION: POSITION.TOP_RIGHT,
  CONTAINER_ID_SUFFIX: 'notification_container',
  AUTOCLOSE_TIMEOUT: 3000,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

const ATTENTION = {
  MEDIUM: 'medium',
  LOW: 'low',
} as const;

export { CLASS_PREFIX, DEFAULTS, STYLE, POSITION, ATTENTION };
