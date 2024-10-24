import type { Meta } from '@storybook/react';
import { cloneDeep } from 'lodash';
import { TabListProps } from '.';
import { ButtonGroupProps } from '../ButtonGroup';
import _buttonGroupArgTypes from '../ButtonGroup/ButtonGroup.stories.args';
import { DEFAULTS } from './TabList.constants';
const buttonGroupArgTypes: Meta<ButtonGroupProps>['argTypes'] = cloneDeep(_buttonGroupArgTypes);
Object.values(buttonGroupArgTypes).forEach((prop) => {
  if (prop.table.category) return;

  prop.table.category = 'Momentum - ButtonGroup';
});
delete buttonGroupArgTypes.children;

buttonGroupArgTypes.round.defaultValue = true;
buttonGroupArgTypes.spaced.defaultValue = true;

const tabListArgTypes: Meta<TabListProps>['argTypes'] = {
  children: {
    description: 'Provides the child nodes for this element.',
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
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
  isSubTabList: {
    description: 'Whether the tab list should look like a sub tabs list',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.IS_SUBTAB_LIST,
      },
    },
  },
};

export { tabListArgTypes };

export default {
  ...tabListArgTypes,
  ...buttonGroupArgTypes,
};
