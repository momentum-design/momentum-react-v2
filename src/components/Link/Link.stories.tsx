import { MultiTemplateWithPseudoStates, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Link, { LinkProps } from './';
import argTypes from './Link.stories.args';
import Documentation from './Link.stories.docs.mdx';
import ButtonCircle from '../ButtonCircle';
import Icon from '../Icon';
import React from 'react';
import ButtonPill from '../ButtonPill';

export default {
  title: 'Momentum UI/Link',
  component: Link,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  args: {
    children: 'Example Text',
  },
};

const Example = Template<LinkProps>(Link).bind({});

Example.args = {
  href: 'https://www.webex.com/',
  target: '_blank',
};

Example.argTypes = { ...argTypes };

const States = MultiTemplateWithPseudoStates<LinkProps>(Link).bind({});

States.parameters = {
  variants: [
    { label: 'Default link', href: 'https://www.webex.com/' },
    { inverted: true, href: 'https://www.webex.com/' },
  ],
};

States.argTypes = { ...argTypes };
delete States.argTypes.disabled;
delete States.argTypes.inverted;

const LinkHasIcon = Template<LinkProps>(Link).bind({});

LinkHasIcon.args = {
  href: 'https://www.webex.com/',
  target: '_blank',
  hasIcon: true,
  iconProps: { id: 'icon' },
  tooltipContent: 'opens a new window',
  type: 'description',
};

LinkHasIcon.argTypes = { ...argTypes };

const ButtonCircleLink = Template<LinkProps>(Link).bind({});

ButtonCircleLink.args = {
  href: 'https://www.webex.com/',
  target: '_blank',
  iconProps: { id: 'icon' },
  tooltipContent: 'opens a new tab',
  type: 'description',
  children: (
    <ButtonCircle>
      <Icon name="chat-group" autoScale={150} />
    </ButtonCircle>
  ),
};

ButtonCircleLink.argTypes = { ...argTypes };

const ButtonPillLink = Template<LinkProps>(Link).bind({});

ButtonPillLink.args = {
  href: 'https://www.webex.com/',
  target: '_blank',
  iconProps: { id: 'icon' },
  tooltipContent: 'opens a new tab',
  type: 'description',
  children: <ButtonPill>example</ButtonPill>,
};

ButtonPillLink.argTypes = { ...argTypes };

export { Example, States, LinkHasIcon, ButtonCircleLink, ButtonPillLink };
