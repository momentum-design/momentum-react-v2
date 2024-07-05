import {
  commonAriaButton,
  commonHTMLAttributes,
  commonStyles,
} from '../../storybook/helper.stories.argtypes';
import { ArgTypes } from '@storybook/react';

import { ALERT_BADGE_CONSTANTS as CONSTANTS } from './';

const argTypes: ArgTypes = {
  ...commonAriaButton,
  ...commonHTMLAttributes,
  ...commonStyles,
  children: {
    description: 'Provides the child nodes for this element. Overrides `image` and `label` props.',
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
  color: {
    description: 'Colorizes this component.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.COLORS)],
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
    description: 'Provides the image for this component.',
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  label: {
    description: 'Provides the label for this component.',
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
};

export default argTypes;
