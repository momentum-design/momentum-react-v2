import { Meta } from '@storybook/react';
import { TabPanelProps } from '.';
import { commonStyles as _commonStyles } from '../../storybook/helper.stories.argtypes';

const tabPanelArgTypes: Meta<TabPanelProps>['argTypes'] = {
  // NOTE: Below is an example. See [Storybook argTypes documentation]{@link https://storybook.js.org/docs/react/api/argtypes}.
  children: {
    description: 'Provides the child nodes for this element.', // NOTE: Description of this prop.
    control: { type: 'text' }, // NOTE: Control type for this prop.
    table: {
      type: {
        summary: 'ReactNode', // NOTE: Explicit type of this prop.
      },
      defaultValue: {
        summary: 'undefined', // NOTE: Default value for this prop.
      },
    },
  },
  tagName: {
    description: 'Define the wrapping element tag',
    control: {
      type: 'select',
      options: ['div', 'section'],
    },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'div',
      },
    },
  },
};

export { tabPanelArgTypes };

const commonStyles = { ..._commonStyles };
delete commonStyles.id;

export default {
  ...commonStyles,
  ...tabPanelArgTypes,
};
