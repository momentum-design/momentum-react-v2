const CLASS_PREFIX = 'md-toast-content';

const DEFAULTS = {};

const ACTION_COLORS = {
  CANCEL: 'cancel',
  JOIN: 'join',
  SUCCESS: 'success',
  WARNING: 'warning',
};

const STYLE = {
  action: `${CLASS_PREFIX}-action`,
  actions: `${CLASS_PREFIX}-actions`,
  actor: `${CLASS_PREFIX}-actor`,
  info: `${CLASS_PREFIX}-info`,
  scope: `${CLASS_PREFIX}-scope`,
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, ACTION_COLORS, STYLE };
