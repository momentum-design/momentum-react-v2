import { commonStyles } from '../../storybook/helper.stories.argtypes';

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
};
