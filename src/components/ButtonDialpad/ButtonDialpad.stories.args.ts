import { commonAriaButton, commonStyles } from '../../storybook/helper.stories.argtypes';

import { BUTTON_DIALPAD_CONSTANTS as CONSTANTS } from './';

export default {
  ...commonStyles,
  ...commonAriaButton,
  children: {
    description: 'Provides the child node for this element. This overrides the `primaryText` prop.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  disabled: {
    description: 'Whether to render the `<ButtonDialpad />` is disabled.',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.DISABLED,
      },
    },
  },
  primaryText: {
    description: 'Provides the primary text for this `<ButtonDialPad />`.',
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
  secondaryText: {
    description: 'Provides the prsecondaryimary text for this `<ButtonDialPad />`.',
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
  size: {
    description: 'Modifies the size of this `<ButtonPill />`.',
    options: [undefined, ...Object.values(CONSTANTS.SIZES)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SIZE,
      },
    },
  },
};
