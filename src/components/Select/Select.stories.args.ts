import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { SELECT_CONSTANTS as CONSTANTS } from '.';

export default {
  ...commonStyles,
  placeholder: {
    defaultValue: undefined,
    description: 'Text to display inside the dropdown when there is no selection.',
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
  direction: {
    defaultValue: CONSTANTS.DIRECTIONS.bottom,
    description: 'Text to display inside the dropdown when there is no selection.',
    control: { type: 'select' },
    options: [...Object.values(CONSTANTS.DIRECTIONS)],
    table: {
      type: {
        summary: 'SelectDirection',
      },
      defaultValue: {
        summary: CONSTANTS.DIRECTIONS.bottom,
      },
    },
  },
  label: {
    defaultValue: undefined,
    description:
      'From [AriaSelectProps](https://react-spectrum.adobe.com/react-aria/useSelect.html). Text displayed on top of the element.',
    control: { type: 'text' },
    table: {
      category: 'React Aria - Select',
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  showBorder: {
    defaultValue: CONSTANTS.DEFAULTS.SHOULD_SHOW_BORDER,
    description: 'If this component should have border around it.',
    control: { type: 'boolean' },
    options: [true, false],
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SHOULD_SHOW_BORDER,
      },
    },
  },
  items: {
    defaultValue: [],
    description:
      'From [AriaSelectProps](https://react-spectrum.adobe.com/react-aria/useSelect.html). The list of options for this select element.',
    control: { type: 'object' },
    table: {
      category: 'React Aria - Select',
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
      'From [AriaSelectProps](https://react-spectrum.adobe.com/react-aria/useSelect.html). Default selected keys. (Must be exact type as the key)',
    control: { type: 'string' },
    table: {
      category: 'React Aria - Select',
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
      'From [AriaSelectProps](https://react-spectrum.adobe.com/react-aria/useSelect.html). List with disabled keys. (They must be exact type as the key)',
    control: { type: 'array' },
    table: {
      category: 'React Aria - Select',
      type: {
        summary: 'React.Key[]',
      },
      defaultValue: {
        summary: [],
      },
    },
  },
  onSelectionChange: {
    defaultValue: undefined,
    description:
      'From [AriaSelectProps](https://react-spectrum.adobe.com/react-aria/useSelect.html). Handler that is called when the selection changes.',
    control: { type: 'function' },
    table: {
      category: 'React Aria - Select',
      type: {
        summary: '(key: React.Key) => any',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
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
};
