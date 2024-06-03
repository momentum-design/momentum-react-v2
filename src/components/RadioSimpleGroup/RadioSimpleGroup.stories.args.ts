import { commonStyles } from '../../storybook/helper.stories.argtypes';

const radioSimpleGroupArgTypes = {
  children: {
    description:
      'The children is used to render the RadioSimple components inside the RadioSimpleGroup.',
    control: { type: 'ReactNode', required: true },
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: undefined,
    },
  },
  description: {
    description:
      'The description is used to provide additional context to the user.',
    control: { type: 'ReactNode', required: false },
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: undefined,
    },
  },
  label: {
    description:
      'The label is used to provide a title for the group of RadioSimpleGroup.',
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
      'The current value for the RadioSimpleGroup.',
    control: { type: 'text', required: false },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: undefined,
    },
  },
  defaultValue: {
    description:
      'The default value for the RadioSimpleGroup.',
    control: { type: 'text', required: false },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: undefined,
    },
  },
  isDisabled: {
    description: 'Whether the group input is disabled.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
    },
    defaultValue: false,
  },
  isReadOnly: {
    description: 'Whether the input can be selected but not changed by the user.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
    },
  },
};

export { radioSimpleGroupArgTypes };

export default {
  ...commonStyles,
  ...radioSimpleGroupArgTypes,
};
