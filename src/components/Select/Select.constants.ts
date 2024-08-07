import { FocusStrategy } from '@react-types/shared';
import { SelectDirection } from '.';

const CLASS_PREFIX = 'md-select';

const DIRECTIONS: Record<string, SelectDirection> = {
  bottom: 'bottom',
  top: 'top',
};

const DEFAULTS = {
  DIRECTION: DIRECTIONS.bottom,
  FOCUS_STRATEGY: 'first' as FocusStrategy,
  SHOULD_SHOW_BORDER: true,
  IS_IN_FORM: true,
  SHALLOW_DISABLED: false,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  dropdownInput: `${CLASS_PREFIX}-dropdown-input`,
  selected: `${CLASS_PREFIX}-selected`,
  open: `${CLASS_PREFIX}-open`,
  iconWrapper: `${CLASS_PREFIX}-icon-wrapper`,
  selectedItemWrapper: `${CLASS_PREFIX}-selected-item-wrapper`,
  menuListBox: `${CLASS_PREFIX}-menu-listbox`,
  popover: `${CLASS_PREFIX}-popover`,
  borderLess: 'borderLess',
};

const SELECT_HEIGHT_ADJUST_BORDER = 2; // 2px extra because of the border(top, down);

export { DEFAULTS, STYLE, SELECT_HEIGHT_ADJUST_BORDER, DIRECTIONS };
