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
      'The value is used to provide a value for the RadioSimple.',
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
      'The ariaLabel is used to provide an aria-label for the RadioSimple.',
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
      'The ariaLabelledBy is used to provide an aria-labelledby for the RadioSimple.',
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
      'The isDisabled is to set the disable state for the RadioSimple.',
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
