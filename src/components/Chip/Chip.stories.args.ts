import { commonStyles } from '../../storybook/helper.stories.argtypes';
import {} from '@momentum-design/components';
const chipArgTypes = {
  label: {
    description: 'The visible label text of the chip',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  iconName: {
    description:
      'The name of the icon in the chip (must match the icon name in the Icon component)',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  color: {
    description: 'Sets the chip color',
    control: { type: 'select' },
    options: [
      undefined,
      'default',
      'cobalt',
      'gold',
      'lime',
      'mint',
      'pink',
      'purple',
      'slate',
      'violet',
    ],
    table: {
      type: {
        summary: 'Color',
      },
      defaultValue: {
        summary: 'default',
      },
    },
  },
  disabled: {
    description: 'Sets whether the chip is disabled',
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
  onClick: {
    action: 'onClick',
    description: 'Handler that is called when the element is clicked',
    table: {
      category: 'Mdc Button Attributes',
      type: {
        summary: '(e: MouseEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onFocus: {
    action: 'onFocus',
    description: 'Handler that is called when the element receives focus.',
    table: {
      category: 'Mdc Button Attributes',
      type: {
        summary: '(e: FocusEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onBlur: {
    action: 'onBlur',
    description: 'Handler that is called when the element loses focus.',
    table: {
      category: 'Mdc Button Attributes',
      type: {
        summary: '(e: FocusEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onKeyDown: {
    action: 'onKeyDown',
    description: 'Handler that is called when a key is pressed.',
    table: {
      category: 'Mdc Button Attributes',
      type: {
        summary: '(e: KeyboardEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onKeyUp: {
    action: 'onKeyUp',
    description: 'Handler that is called when a key is released.',
    table: {
      category: 'Mdc Button Attributes',
      type: {
        summary: '(e: KeyboardEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

export { chipArgTypes };

export default {
  ...commonStyles,
  ...chipArgTypes,
};
