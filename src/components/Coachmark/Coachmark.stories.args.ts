import { commonStyles } from '../../storybook/helper.stories.argtypes';

const coachmarkArgTypes = {
  children: {
    description: 'Content of the coachmark.', // NOTE: Description of this prop.
    control: { type: 'text' }, // NOTE: Control type for this prop.
    table: {
      type: {
        summary: 'ReactNode', // NOTE: Explicit type of this prop.
      },
    },
  },
};

export { coachmarkArgTypes };

export default {
  ...commonStyles,
  ...coachmarkArgTypes,
};
