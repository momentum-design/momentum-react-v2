const CLASS_PREFIX = 'md-radio';

const DEFAULTS = {
  GROUP_DISABLED: false,
  GROUP_READONLY: false,
  GROUP_LABEL: undefined,
  GROUP_DESCRIPTION: undefined,
  GROUP_ORIENTATION: 'vertical',
  GROUP_ARIA_LABEL: 'radio button group',
  OPTION_DISABLED: false,
};

const STYLE = {
  group: `${CLASS_PREFIX}-group`,
  description: `${CLASS_PREFIX}-group-description`,
  wrapper: `${CLASS_PREFIX}-wrapper`,
  button: `${CLASS_PREFIX}-button`,
  focus: `${CLASS_PREFIX}-focus`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
