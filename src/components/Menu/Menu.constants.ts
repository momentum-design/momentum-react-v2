import { ListItemBaseSize } from '../ListItemBase/ListItemBase.types';

const CLASS_PREFIX = 'md-menu';

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  separator: `${CLASS_PREFIX}-separator`,
};

const DEFAULTS = {
  ITEM_SIZE: 40 as ListItemBaseSize,
  ITEM_SHAPE: 'rectangle' as const,
  IS_TICK_ON_LEFT_SIDE: false,
  HAS_SEPARATORS: false,
};

const GROUP = 'group';

export { CLASS_PREFIX, STYLE, DEFAULTS, GROUP };
