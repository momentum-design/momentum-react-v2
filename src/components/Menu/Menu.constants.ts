import { ListItemBaseSize } from '../ListItemBase/ListItemBase.types';
import { TickPosition } from './Menu.types';

const CLASS_PREFIX = 'md-menu';

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

const DEFAULTS = {
  ITEM_SIZE: 40 as ListItemBaseSize,
  ITEM_SHAPE: 'rectangle' as const,
  TICK_POSITION: 'right' as TickPosition,
};

const GROUP = 'group';

export { CLASS_PREFIX, STYLE, DEFAULTS, GROUP };
