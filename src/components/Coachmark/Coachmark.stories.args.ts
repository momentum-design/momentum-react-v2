import { commonStyles } from '../../storybook/helper.stories.argtypes';

const coachmarkArgTypes = {
  children: {
    description: 'Content of the coachmark.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'ReactNode',
      },
    },
  },
  triggerID: {
    description: 'ID of the element that triggers the coachmark.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  'close-button': {
    description: 'Whether the close button should be shown.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: true,
      },
    },
  },
  'close-button-aria-label': {
    description: 'Arial label for the close button.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  placement: {
    description: 'Placement of the coachmark.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'bottom',
      },
    },
  },
};

export { coachmarkArgTypes };

export default {
  ...commonStyles,
  ...coachmarkArgTypes,
};
