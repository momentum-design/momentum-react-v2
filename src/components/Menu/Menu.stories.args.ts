import { commonStyles } from '../../storybook/helper.stories.argtypes';
import * as LIST_ITEM_BASE_CONSTANTS from '../ListItemBase/ListItemBase.constants';
import { DEFAULTS } from '../Menu/Menu.constants';

export default {
  ...commonStyles,
  children: {
    description: 'Provides the items nodes for this menu element.',
    table: {
      type: {
        summary: '<Item />',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onAction: {
    action: 'onAction',
    description: 'Handler that is called when an item is selected.',
    table: {
      category: 'React Aria - Menu',
      type: {
        summary: '(key: Key) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onSelectionChange: {
    action: 'onSelectionChange',
    description: 'Handler that is called when an item/items is selected.',
    table: {
      category: 'React Aria - Menu',
      type: {
        summary: "(keys: 'all' | Set<Key>) => void",
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  items: {
    defaultValue: [],
    description:
      'From [AriaMenuProps](https://react-spectrum.adobe.com/react-aria/useMenu.html). The list of options for this menu element.',
    control: { type: 'object' },
    table: {
      category: 'React Aria - Menu',
      type: {
        summary: 'CollectionBase<T>',
      },
      defaultValue: {
        summary: [],
      },
    },
  },
  defaultSelectedKey: {
    defaultValue: undefined,
    description:
      'From [AriaMenuProps](https://react-spectrum.adobe.com/react-aria/useMenu.html). Default selected keys. (Must be exact type as the key)',
    control: { type: 'string' },
    table: {
      category: 'React Aria - Menu',
      type: {
        summary: 'React.Key',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  disabledKeys: {
    defaultValue: [],
    description:
      'From [AriaSelectProps](https://react-spectrum.adobe.com/react-aria/useMenu.html). List with disabled keys. (They must be exact type as the key)',
    control: { type: 'array' },
    table: {
      category: 'React Aria - Menu',
      type: {
        summary: 'React.Key[]',
      },
      defaultValue: {
        summary: [],
      },
    },
  },
  itemSize: {
    defaultValue: DEFAULTS.ITEM_SIZE,
    description: 'Size of the list item base',
    control: { type: 'select' },
    options: [undefined, ...Object.values(LIST_ITEM_BASE_CONSTANTS.SIZES)],
    table: {
      type: {
        summary: 'ListItemBaseSize',
      },
      defaultValue: {
        summary: DEFAULTS.ITEM_SIZE,
      },
    },
  },
  itemShape: {
    defaultValue: DEFAULTS.ITEM_SHAPE,
    description: 'The shape of the list item base container',
    control: { type: 'select' },
    options: [undefined, ...Object.values(LIST_ITEM_BASE_CONSTANTS.SHAPES)],
    table: {
      type: {
        summary: "'rectangle' | 'isPilled'",
      },
      defaultValue: {
        summary: DEFAULTS.ITEM_SHAPE,
      },
    },
  },
  ariaLabelledby: {
    description: 'The aria-labelledby for the menu wrapper',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: 'undefined',
    },
  },
  selectionMode: {
    description: 'Default selection mode for the whole menu',
    default: undefined,
    control: { type: 'select' },
    options: ['single', 'multiple', 'none'],
    table: {
      type: {
        summary: "'single' | 'multiple' | 'none'",
      },
      defaultValue: 'multiple',
    },
  },
  tickPosition: {
    defaultValue: DEFAULTS.TICK_POSITION,
    description: 'Position of the tick when selected, none when no tick',
    control: { type: 'select' },
    options: ['left', 'right', 'none', undefined],
    table: {
      type: {
        summary: "'left' | 'right' | 'none'",
      },
      defaultValue: {
        summary: DEFAULTS.TICK_POSITION,
      },
    },
  },
  shouldItemFocusBeInset: {
    description: 'Whether if the focus ring wrapping the list items should be inset',
    control: 'boolean',
  },
};
