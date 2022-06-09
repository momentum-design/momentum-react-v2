import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import NavigationTab, { NavigationTabProps } from './';
import argTypes from './NavigationTab.stories.args';
import Documentation from './NavigationTab.stories.docs.mdx';

export default {
  title: 'Momentum UI/NavigationTab',
  component: NavigationTab,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<NavigationTabProps>(NavigationTab).bind({});

Example.argTypes = { ...argTypes };

const Sizes = MultiTemplate<NavigationTabProps>(NavigationTab).bind({});

Sizes.argTypes = { ...argTypes };
delete Sizes.argTypes.size;

Sizes.parameters = {
  variants: [{ size: undefined }, { size: 48 }, { size: 200 }],
};

const Active = MultiTemplate<NavigationTabProps>(NavigationTab).bind({});

Active.argTypes = { ...argTypes };
delete Active.argTypes.active;

Active.parameters = {
  variants: [{ active: undefined }, { active: true }, { active: false }],
};

export { Example, Sizes };
