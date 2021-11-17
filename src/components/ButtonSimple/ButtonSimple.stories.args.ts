import {
  commonAriaButton,
  commonAriaHover,
  commonHTMLAttributes,
  commonStyles,
} from '../../storybook/helper.stories.argtypes';

const buttonSimpleArgTypes = {
  children: {
    description: 'Provides the child nodes for this element.',
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
};

export { buttonSimpleArgTypes };

export default {
  ...commonStyles,
  ...commonHTMLAttributes,
  ...commonAriaHover,
  ...commonAriaButton,
  ...buttonSimpleArgTypes,
};
