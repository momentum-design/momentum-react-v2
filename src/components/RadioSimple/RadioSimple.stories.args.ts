import { commonStyles } from '../../storybook/helper.stories.argtypes';

const radioSimpleArgTypes = {
  children: {
    description:
      'Children is a prop that is used to render the RadioSimple components inside the RadioSimpleGroup.',
    control: { type: 'ReactNode', required: false },
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: undefined,
    },
  },
  value: {
    description:
      'The value for the RadioSimple. This is used to provide a value for the RadioSimple.',
    control: { type: 'text', required: true },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: undefined,
    },
  },
  ariaLabel: {
    description:
      'The ariaLabel for the RadioSimple. This is used to provide an aria-label for the RadioSimple.',
    control: { type: 'text', required: false },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: 'example-ariaLabel',
    },
  },
  ariaLabelledBy: {
    description:
      'The ariaLabelledBy for the RadioSimple. This is used to provide an aria-labelledby for the RadioSimple.',
    control: { type: 'text', required: false },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: 'example-ariaLabelledBy',
    },
  },
  isDisabled: {
    description:
      'The isDisabled for the RadioSimple. This is typically set the disable state for the RadioSimple.',
    control: { type: 'boolean', required: false },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: false,
    },
  },
};

export { radioSimpleArgTypes };

export default {
  ...commonStyles,
  ...radioSimpleArgTypes,
};
