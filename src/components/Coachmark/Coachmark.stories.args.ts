import { commonStyles, extendArgTypes } from 'storybook/helper.stories.argtypes';

import { popoverArgTypes } from 'components/Popover/Popover.stories.args';

const coachmarkArgTypes = {
  actions: {
    description: 'Action buttons to use with this component.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ReactElement<ButtonSimpleProps> | Array<ReactElement<ButtonSimpleProps>>',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  children: {
    description: 'Content of this component.',
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
  onDismiss: {
    description: 'Event handler that is triggered when the user dismisses this component.',
    control: { type: 'none' },
    table: {
      type: {
        summary: '() => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  icon: {
    description: 'Icon to display to the left of the title.',
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
  image: {
    description: 'Image to display on this component.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'HTMLImageElement',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  isVisible: {
    description: 'Whether or not this component should be visible.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  target: {
    description: 'The element this component should target when rendering its location.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ReactElement',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  title: {
    description: 'Title to display on this component.',
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

export { coachmarkArgTypes };

export default {
  ...commonStyles,
  ...extendArgTypes('Popover', popoverArgTypes, ['interactive', 'trigger']),
  ...coachmarkArgTypes,
};
