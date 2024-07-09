import { AllowedTagNames } from '../Text/Text.types';

const CLASS_PREFIX = 'md-toast';

const DEFAULTS = {
  HEADING_LEVEL_2: 'h2' as AllowedTagNames,
};

const STYLE = {
  controls: `${CLASS_PREFIX}-controls`,
  header: `${CLASS_PREFIX}-header`,
  title: `${CLASS_PREFIX}-title`,
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
