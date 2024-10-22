import { Meta } from '@storybook/react';
import { TabPanelProps } from '.';
import { commonStyles as _commonStyles } from '../../storybook/helper.stories.argtypes';

const tabPanelArgTypes: Meta<TabPanelProps>['argTypes'] = {
  children: {
    description: 'Provides the child nodes for this element.',
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
