import { commonAriaPressProps, commonStyles } from '../../storybook/helper.stories.argtypes';
import { MeetingMarker } from '../MeetingListItem/MeetingListItem.types';

export default {
  ...commonStyles,
  ...commonAriaPressProps,
  children: {
    description: 'Provides the child nodes for this element.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  isDisabled: {
    defaultValue: false,
    description: 'Determines if this item is disabled',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: false,
      },
    },
  },
  buttonGroup: {
    defaultValue: undefined,
    description: 'Provides the nodes for the end of the item',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  color: {
    defaultValue: undefined,
    description: 'Provides the color status of this item',
    control: { type: 'select' },
    options: [...Object.keys(MeetingMarker)],
    table: {
      type: {
        summary: 'MeetingMarker',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  image: {
    defaultValue: undefined,
    description: 'Provides the nodes for the start of the item',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
};
