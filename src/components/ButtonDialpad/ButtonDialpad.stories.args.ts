import {
  commonHTMLAttributes,
  commonMdcButton,
  commonStyles,
} from '../../storybook/helper.stories.argtypes';

export default {
  ...commonStyles,
  ...commonHTMLAttributes,
  ...commonMdcButton,
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
};
