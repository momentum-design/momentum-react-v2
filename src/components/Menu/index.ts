import { default as Menu, MenuContext } from './Menu';
import * as CONSTANTS from './Menu.constants';
import { Props } from './Menu.types';

export { CONSTANTS as MENU_CONSTANTS, MenuContext };

export type MenuProps<T> = Props<T>;

export default Menu;
