import { SelectDirection } from './Select.types';

const CLASS_PREFIX = 'md-select';

const DEFAULTS = {
  DIRECTION: 'bottom' as SelectDirection,
  SHOULD_AUTOFOCUS: true,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  dropdownInput: `${CLASS_PREFIX}-dropdown-input`,
  selected: `${CLASS_PREFIX}-selected`,
  open: `${CLASS_PREFIX}-open`,
  iconWrapper: `${CLASS_PREFIX}-icon-wrapper`,
  selectedItemWrapper: `${CLASS_PREFIX}-selected-item-wrapper`,
  overlay: `${CLASS_PREFIX}-overlay`,
};

const SELECT_HEIGHT_ADJUST_BORDER = 2; // 2px extra because of the border(top, down);

export { DEFAULTS, STYLE, SELECT_HEIGHT_ADJUST_BORDER };
