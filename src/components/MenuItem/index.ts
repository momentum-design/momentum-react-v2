import { default as MenuItem } from './MenuItem';
import * as CONSTANTS from './MenuItem.constants';
import { Props } from './MenuItem.types';

export { CONSTANTS as MENU_ITEM_CONSTANTS };

export type MenuItemProps<T> = Props<T>;

export default MenuItem;
