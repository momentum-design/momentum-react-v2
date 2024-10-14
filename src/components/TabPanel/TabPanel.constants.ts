import { AllowedTagNames } from './TabPanel.types';

const CLASS_PREFIX = 'md-tab-panel';

const DEFAULTS = {
  as: 'div' as AllowedTagNames,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
