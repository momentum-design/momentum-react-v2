import { commonStyles } from '../../storybook/helper.stories.argtypes';
import type { Meta } from '@storybook/react';
import { TabListProps } from '.';

import _buttonGroupArgTypes from '../ButtonGroup/ButtonGroup.stories.args';
import { cloneDeep } from 'lodash';

const buttonGroupArgTypes = cloneDeep(_buttonGroupArgTypes);
Object.values(buttonGroupArgTypes).forEach((prop) => {
  if (prop.table.category) return;

  prop.table.category = 'Momentum - ButtonGroup';
});
delete buttonGroupArgTypes.children;

buttonGroupArgTypes.round.defaultValue = true;
buttonGroupArgTypes.spaced.defaultValue = true;

const tabListArgTypes: Meta<TabListProps>['argTypes'] = {
  // NOTE: Below is an example. See [Storybook argTypes documentation]{@link https://storybook.js.org/docs/react/api/argtypes}.
  children: {
    description: 'Provides the child nodes for this element.', // NOTE: Description of this prop.
    table: {
      type: {
        summary: 'ReactNode', // NOTE: Explicit type of this prop.
      },
      defaultValue: {
        summary: 'undefined', // NOTE: Default value for this prop.
      },
    },
  },
  onTabSelection: {
    description: 'Handler that is called when a tab is pressed.',
    table: {
      type: {
        summary: '(key: React.Key) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

export { tabListArgTypes };

export default {
  ...tabListArgTypes,
  ...buttonGroupArgTypes,
};
