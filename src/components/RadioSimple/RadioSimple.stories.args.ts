import { commonStyles } from '../../storybook/helper.stories.argtypes';

const radioSimpleArgTypes = {
  // NOTE: Below is an example. See [Storybook argTypes documentation]{@link https://storybook.js.org/docs/react/api/argtypes}.
  children: {
    description: 'Provides the child nodes for this element.', // NOTE: Description of this prop.
    control: { type: 'text' }, // NOTE: Control type for this prop.
    table: {
      type: {
        summary: 'ReactNode', // NOTE: Explicit type of this prop.
      },
      defaultValue: {
        summary: 'undefined', // NOTE: Default value for this prop.
      },
    },
  },
};

export { radioSimpleArgTypes };

export default {
  ...commonStyles,
  ...radioSimpleArgTypes,
};
