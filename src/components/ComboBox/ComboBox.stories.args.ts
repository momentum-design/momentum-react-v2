import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { ComboBox_CONSTANTS as CONSTANTS } from '.';


export default {
  ...commonStyles,
  width: {
    description:
      'To override the ComboBox container and selection list width.',
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
  error: {
    description: 'Sets whether the ComboBox is in error state',
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
    description: 'Text to display inside the input when there is no inputValue or item selected',
    control: { type: 'text' },
    table: {
      category: 'React Aria - Input',
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.PLACEHOLDER,
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
  onArrowButtonPress: {
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
  shouldFilterOnArrowButton: {
    description:
      'This property represents whether to filter based on the input value when click the arrowButton.',
    control: { type: 'boolean' },
    table: {
      category: 'React Aria - Button',
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SHOULDFILTERONARROWBUTTON,
      },
    },  
  },
  selectedKey: {
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
  comboBoxGroups: {
    description:
      'The options for this selection list element.',
    control: { type: 'array' },
    table: {
      category: 'React Aria - Select',
      type: {
        summary: 'IComboBoxGroup[]',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  noResultText: {
    description: 'Text to display inside the dropdown when there is no results.',
    control: { type: 'text' },
    table: {
      category: 'React Aria - Select',
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.NO_RESULT_TEXT,
      },
    },
  },
  onSelectionChange: {
    description:
      'Handler that is called when an item is selected(if the selected item matches the selectedKey, the parameter is undefined).',
    control: { type: 'function' },
    table: {
      category: 'React Aria - Select',
      type: {
        summary: '(item: IComboBoxItem) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  openStateChange: {
    description:
      'Handler that is called when the selection list is expanded or collapsed.',
    control: { type: 'function' },
    table: {
      category: 'React Aria - Select',
      type: {
        summary: '(isOpen: boolean) => void',
      },
      defaultValue: {
        summary: 'undefined',
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
};
