import { ButtonControlControl } from './ButtonControl.types';

const CLASS_PREFIX = 'md-button-control';

const DEFAULTS = {};

const CONTROLS: Record<string, ButtonControlControl> = {
  CLOSE: 'close',
  MAXIMIZE: 'maximize',
  MINIMIZE: 'minimize',
};

const ICONS = {
  close: 'cancel',
  maximize: 'arrow-up',
  minimize: 'arrow-down',
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, CONTROLS, DEFAULTS, ICONS, STYLE };
