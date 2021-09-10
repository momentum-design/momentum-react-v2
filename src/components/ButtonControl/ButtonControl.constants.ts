import { ButtonControlControl } from './ButtonControl.types';

const CLASS_PREFIX = 'md-button-control';

const DEFAULTS = {};

const CONTROLS: Record<string, ButtonControlControl> = {
  CLOSE: 'close',
  FAVORITE: 'favorite',
  MAXIMIZE: 'maximize',
  MINIMIZE: 'minimize',
  MUTE: 'mute',
};

const ICONS = {
  close: 'cancel',
  favorite: 'favorite',
  maximize: 'arrow-up',
  minimize: 'arrow-down',
  mute: 'alert-muted',
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, CONTROLS, DEFAULTS, ICONS, STYLE };
