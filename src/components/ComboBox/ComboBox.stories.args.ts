import { commonStyles } from '../../storybook/helper.stories.argtypes';

export default {
  ...commonStyles,
  listboxWidth: {
    defaultValue: undefined,
    description:
      'To override the list box width. NOTE: if set, the popover strategy will be set to "fixed". To style the list box without applying fixed popover strategy, pass in className instead',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  placeholder: {
    description:
      'From [AriaComboBoxOptions](https://react-spectrum.adobe.com/react-aria/useComboBox.html). Temporary text that occupies the text input when it is empty.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  selectedKey: {
    description:
      'From [AriaComboBoxOptions](https://react-spectrum.adobe.com/react-aria/useComboBox.html). The currently selected key in the collection (controlled).',
    control: { type: 'text' },
    table: {
      category: 'React Aria - Select',
      type: {
        summary: 'React.Key',
      },
    },
  },
  defaultSelectedKey: {
    description:
      'From [AriaComboBoxOptions](https://react-spectrum.adobe.com/react-aria/useComboBox.html). The currently selected key in the collection (uncontrolled).',
    control: { type: 'text' },
    table: {
      category: 'React Aria - Select',
      type: {
        summary: 'React.Key',
      },
    },
  },
  disabledKeys: {
    description:
      'From [AriaComboBoxOptions](https://react-spectrum.adobe.com/react-aria/useComboBox.html). The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with.',
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
    description:
      'From [AriaComboBoxOptions](https://react-spectrum.adobe.com/react-aria/useComboBox.html). The list of ComboBox items (controlled).',
    control: { type: 'array' },
    table: {
      category: 'React Aria - Select',
      type: {
        summary: 'Array<IComboBoxItem | IComboBoxGroup>',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  defaultItems: {
    description:
      'From [AriaComboBoxOptions](https://react-spectrum.adobe.com/react-aria/useComboBox.html). The list of ComboBox items (uncontrolled).',
    control: { type: 'array' },
    table: {
      category: 'React Aria - Select',
      type: {
        summary: 'Array<IComboBoxItem | IComboBoxGroup>',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  noResultLabel: {
    description: 'Text to display inside the list when there is no results.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  label: {
    defaultValue: undefined,
    description:
      'From [AriaComboBoxOptions](https://react-spectrum.adobe.com/react-aria/useComboBox.html). Text displayed on top of the element.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  description: {
    defaultValue: undefined,
    description:
      'From [AriaComboBoxOptions](https://react-spectrum.adobe.com/react-aria/useComboBox.html). Description associated with this component. Appears below the title.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  onSelectionChange: {
    description:
      'From [AriaComboBoxOptions](https://react-spectrum.adobe.com/react-aria/useComboBox.html). Handler that is called when the selection changes.',
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
  onOpenChange: {
    description:
      'From [AriaComboBoxOptions](https://react-spectrum.adobe.com/react-aria/useComboBox.html). Method that is called when the open state of the menu changes. Returns the new open state and the action that caused the opening of the menu.',
    control: { type: 'function' },
    table: {
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
      type: {
        summary: 'Iterable<IComboBoxItem | IComboBoxGroup>',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};
