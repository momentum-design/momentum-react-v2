import { commonStyles } from '../../storybook/helper.stories.argtypes';

const radioGroupArgTypes = {
  // NOTE: Below is an example. See [Storybook argTypes documentation]{@link https://storybook.js.org/docs/react/api/argtypes}.
  children: {
    description: 'Provides the child nodes for this element.', // NOTE: Description of this prop.
    control: { type: 'text' }, // NOTE: Control type for this prop.
    table: {
      disable: true,
    },
  },
};

export { radioGroupArgTypes };

export default {
  ...commonStyles,
  ...radioGroupArgTypes,
};
