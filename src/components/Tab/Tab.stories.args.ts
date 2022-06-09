import { commonAriaButton, commonStyles } from '../../storybook/helper.stories.argtypes';
import { TAB_CONSTANTS as CONSTANTS } from './';

export default {
  ...commonStyles,
  ...commonAriaButton,
  children: {
    description:
      'Provides the child nodes for this element. It can be a free string, or an Icon, Badge or Text component.',
    control: 'text',
    table: {
      type: {
        summary: 'string | Text | Icon | Badge',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  active: {
    description: 'Tells whether the tab is currently active or not.',
    control: 'boolean',
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.ACTIVE,
      },
    },
  },
  disabled: {
    description: 'Whether to render the Tab as disabled.',
    control: 'boolean',
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.DISABLED,
      },
    },
  },
};
