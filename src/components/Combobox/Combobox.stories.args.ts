import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { Combobox_CONSTANTS as CONSTANTS } from '.';
import { ICON_CONSTANTS } from '../Icon';
export default {
  ...commonStyles,
  width: {
    defaultValue: '15rem',
    description:
      'To override the Combobox container and selection list width.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.WIDTH,
      },
    },
  },
  height: {
    defaultValue: CONSTANTS.DEFAULTS.HEIGHT,
    description:
      'To override the Combobox container height, It also affects the width of the arrowButton, which is used to ensure that the button is square',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.HEIGHT,
      },
    },
  },
  error: {
    defaultValue: false,
    description: 'Sets whether the Combobox is in error state',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: false,
      },
    },
  },
  placeholder: {
    defaultValue: CONSTANTS.DEFAULTS.PLACEHOLDER,
    description: 'Text to display inside the input when there is no inputValue or item selected',
    control: { type: 'text' },
    table: {
      category: 'React Aria - Input',
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onInputChange: {
    defaultValue: undefined,
    description:
      'Handler that is called when the InputValue changes.',
    control: { type: 'function' },
    table: {
      category: 'React Aria - Input',
      type: {
        summary: '(event: InputEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onPress: {
    defaultValue: undefined,
    description:
      'Handler that is called when the press is released over the arrowButton.',
    control: { type: 'function' },
    table: {
      category: 'React Aria - Button',
      type: {
        summary: '(event: PressEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },  
  },
  iconScale: {
    defaultValue: CONSTANTS.DEFAULTS.ICON_SCALE,
    description: 'Size of the arrow icon.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(ICON_CONSTANTS.SIZES)],
    table: {
      category: 'React Aria - Button',
      type: {
        summary: 'IconScale',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.ICON_SCALE,
      },
    },
  },
  selectedKey: {
    defaultValue: CONSTANTS.DEFAULTS.SELECTEDKEY,
    description:
      'It also affects the value of the input (displayed as the label of the corresponding item',
    control: { type: 'text' },
    table: {
      category: 'React Aria - Select',
      type: {
        summary: 'React.Key',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SELECTEDKEY,
      },
    },
  },
  disabledKeys: {
    defaultValue: [],
    description:
      'List with disabled keys. (They must be exact type as the key)',
    control: { type: 'array' },
    table: {
      category: 'React Aria - Select',
      type: {
        summary: 'React.Key[]',
      },
      defaultValue: {
        summary: '[]',
      },
    },
  },
  items: {
    defaultValue: [],
    description:
      'The options for this selection list element.',
    control: { type: 'array' },
    table: {
      category: 'React Aria - Select',
      type: {
        summary: 'IComboboxGroup[]',
      },
      defaultValue: {
        summary: '[]',
      },
    },
  },
  children: {
    description: 'Provides the items nodes for this selection list element.',
    table: {
      category: 'React Aria - Select',
      type: {
        summary: 'CollectionChildren<any>',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  noResultText: {
    defaultValue:'No results found',
    description: 'Text to display inside the dropdown when there is no results.',
    control: { type: 'text' },
    table: {
      category: 'React Aria - Select',
      type: {
        summary: 'string',
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
      category: 'React Aria - Select',
      type: {
        summary: '(item: IComboboxItem) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onSelectionChange: {
    defaultValue: undefined,
    description:
      'Handler that is called when the selection changes.',
    control: { type: 'function' },
    table: {
      category: 'React Aria - Select',
      type: {
        summary: '(item: IComboboxItem) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};
