import { FocusStrategy } from '@react-types/shared';
import { Direction } from './ComboBox.types';
import { InferredIconName } from '../Icon/Icon.types';

const CLASS_PREFIX = 'md-combo-box';

const STYLE = {
  description: `${CLASS_PREFIX}-description`,
  label: `${CLASS_PREFIX}-label`,
  wrapper: `${CLASS_PREFIX}-wrapper`,
  trigger: `${CLASS_PREFIX}-trigger`,
  input: `${CLASS_PREFIX}-input`,
  button: `${CLASS_PREFIX}-button`,
  listBox: `${CLASS_PREFIX}-listbox`,
  popover: `${CLASS_PREFIX}-popover`,
};

const KEYS = {
  NO_RESULT: 'no_result',
};

type IconName = {
  [key: string]: InferredIconName;
};

const ICON: IconName = {
  ARROW_UP: 'arrow-down',
  ARROW_DOWN: 'arrow-down',
};

const DIRECTIONS: Record<string, Direction> = {
  bottom: 'bottom',
  top: 'top',
};

const DEFAULTS = {
  DIRECTION: DIRECTIONS.bottom,
  FOCUS_STRATEGY: 'first' as FocusStrategy,
};

const EVENT = {
  KEY: {
    ESCAPE: 'Escape',
    ENTER: 'Enter',
    TAB: 'Tab',
    ARROW_DOWN: 'ArrowDown',
    ARROW_UP: 'ArrowUp',
  },
};

export { STYLE, KEYS, EVENT, ICON, DEFAULTS };
