import { commonStyles } from '../../storybook/helper.stories.argtypes';

export default {
  ...commonStyles,
  /**
   * Below is an example. See [Storybook argTypes documentation]{@link https://storybook.js.org/docs/react/api/argtypes}.
   */
  children: {
    description: 'Provides the child nodes for this element.', // Description of this prop.
    control: { type: 'text' }, // Control
    table: {
      type: {
        summary: 'ReactNode', // Explicit type of this prop.
      },
      defaultValue: {
        summary: 'undefined', // Default value when rendering this component.
      },
    },
  },
};
