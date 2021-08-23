import React from 'react';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import AriaButtonDocs from '../../storybook/docs.stories.aria-button.mdx';

import Icon from '../Icon';

import AlertBadge, { AlertBadgeProps } from './';
import argTypes from './AlertBadge.stories.args';
import Documentation from './AlertBadge.stories.docs.mdx';

export default {
  title: 'Momentum UI/AlertBadge',
  component: AlertBadge,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs, AriaButtonDocs),
    },
  },
};

const Example = Template<AlertBadgeProps>(AlertBadge).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  image: <Icon name="blocked" autoScale />,
  label: <div>Example</div>,
};

const Colors = MultiTemplate<AlertBadgeProps>(AlertBadge).bind({});

Colors.argTypes = { ...argTypes };
delete Colors.argTypes.color;

Colors.parameters = {
  variants: [
    { image: <Icon name="blocked" autoScale />, label: <div>Undefined</div> },
    { image: <Icon name="blocked" autoScale />, label: <div>Theme</div>, color: 'theme' },
    { image: <Icon name="blocked" autoScale />, label: <div>Success</div>, color: 'success' },
    { image: <Icon name="blocked" autoScale />, label: <div>Warning</div>, color: 'warning' },
    { image: <Icon name="blocked" autoScale />, label: <div>Error</div>, color: 'error' },
  ],
};

const Common = MultiTemplate<AlertBadgeProps>(AlertBadge).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;
delete Common.argTypes.color;
delete Common.argTypes.label;
delete Common.argTypes.image;

Common.parameters = {
  variants: [
    { image: <Icon name="hide" autoScale />, label: <div>Undefined</div> },
    { image: <Icon name="hide" autoScale /> },
    { image: <Icon name="announcement" autoScale />, label: <div>Theme</div>, color: 'theme' },
    { image: <Icon name="announcement" autoScale />, color: 'theme' },
    { image: <Icon name="check" autoScale />, label: <div>Success</div>, color: 'success' },
    { image: <Icon name="check" autoScale />, color: 'success' },
    { image: <Icon name="external-user" autoScale />, label: <div>Warning</div>, color: 'warning' },
    { image: <Icon name="external-user" autoScale />, color: 'warning' },
    { image: <Icon name="shield" autoScale />, label: <div>Error</div>, color: 'error' },
    { image: <Icon name="shield" autoScale />, color: 'error' },
  ],
};

export { Example, Colors, Common };
