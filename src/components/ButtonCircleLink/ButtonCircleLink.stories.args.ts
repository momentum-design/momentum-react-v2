import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { buttonCircleArgTypes } from '../ButtonCircle/ButtonCircle.stories.args';
import LinkArgTypes from '../Link/Link.stories.args';

const buttonCircleLinkArgTypes = {
  href: {
    control: { type: 'text' },
    description: 'A URL to link to if elementType="a".',
    table: {
      category: 'React Aria - Link',
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  target: {
    control: { type: 'text' },
    description: 'The target window for the link.',
    table: {
      category: 'React Aria - Link',
      type: {
        summary: 'HTMLAttributeAnchorTarget',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  tooltipContent: {
    description:
      'Used for tooltip content that gets triggered when the link is hovered; e.g Opens a new tab',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  tooltipType: {
    description: `Determines, whether the tooltip is the description or the label of the trigger component, or none`,
    options: ['none', 'label', 'description'],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'description',
      },
    },
  },
  onPress: {
    action: 'onPress',
    description: 'Handler that is called when the press is released over the target.',
    table: {
      category: 'React Aria - Link',
      type: {
        summary: '(e: PressEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

export { buttonCircleLinkArgTypes };

export default {
  ...commonStyles,
  ...buttonCircleArgTypes,
  ...LinkArgTypes,
};
