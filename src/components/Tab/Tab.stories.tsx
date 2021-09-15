import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import AriaButtonDocs from '../../storybook/docs.stories.aria-button.mdx';

import Tab, { TabProps } from './';
import argTypes from './Tab.stories.args';
import Documentation from './Tab.stories.docs.mdx';

import Text from '../Text';
import Icon from '../Icon';
import Badge from '../Badge';
import React from 'react';

export default {
  title: 'Momentum UI/Tab',
  component: Tab,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs, AriaButtonDocs),
    },
  },
};

const Example = Template<TabProps>(Tab).bind({});

Example.argTypes = { ...argTypes };

const States = MultiTemplate<TabProps>(Tab).bind({});

States.argTypes = { ...argTypes };
delete States.argTypes.active;
delete States.argTypes.disabled;

States.parameters = {
  variants: [
    { active: undefined },
    { active: true },
    { active: false },
    { disabled: undefined },
    { disabled: true },
    { disabled: false },
  ],
};

const Children = MultiTemplate<TabProps>(Tab).bind({});

Children.argTypes = { ...argTypes };
delete Children.argTypes.children;

const labelOnly = <Text type="subheader-secondary">Only Label</Text>;
const iconAndLabel = (
  <>
    <Icon name="plus" scale={12} weight="bold" />
    <Text type="subheader-secondary">Icon and Label</Text>
  </>
);
const LabelAndIcon = (
  <>
    <Text type="subheader-secondary">Label and Icon</Text>
    <Icon name="arrow-down" scale={12} weight="filled" />
  </>
);
const smallBadgeAndLabel = (
  <>
    <Badge size={12} />
    <Text type="subheader-secondary">Small badge and Label</Text>
  </>
);

const bigBadgeAndLabel = (
  <>
    <Badge size={18}>2</Badge>
    <Text type="subheader-secondary">Big badge and Label</Text>
  </>
);

const twoIconsAndLabel = (
  <>
    <Icon name="plus" scale={12} weight="bold" />
    <Icon name="plus" scale={12} weight="bold" />
    <Text type="subheader-secondary">Two icons and Label</Text>
  </>
);

Children.parameters = {
  variants: [
    { children: labelOnly },
    { children: iconAndLabel },
    { children: LabelAndIcon },
    { children: smallBadgeAndLabel },
    { children: bigBadgeAndLabel },
    { children: twoIconsAndLabel },
  ],
};

export { Example, States, Children };
