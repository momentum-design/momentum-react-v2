import { MultiTemplateWithPseudoStates, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import Link, { LinkProps } from './';
import argTypes from './Link.stories.args';
import Documentation from './Link.stories.docs.mdx';
import Icon from '../Icon';
import Text from '../Text';
import React from 'react';

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

const LinkContainer = (props) => {
  if (props.inverted) {
    return (
      <div style={{ backgroundColor: 'var(--mds-color-theme-teaching-background-normal)' }}>
        <Link {...props} />
      </div>
    );
  } else {
    return <Link {...props} />;
  }
};

const States = MultiTemplateWithPseudoStates<LinkProps>(LinkContainer).bind({});

States.parameters = {
  variants: [
    { label: 'Default link', href: 'https://www.webex.com/' },
    { label: 'Inverted', inverted: true, href: 'https://www.webex.com/' },
  ],
};

States.argTypes = { ...argTypes };
delete States.argTypes.disabled;
delete States.argTypes.inverted;

const LinkHasIcon = Template<LinkProps>(Link).bind({});

LinkHasIcon.args = {
  href: 'https://www.webex.com/',
  target: '_blank',
  hasExternalLinkIcon: true,
  iconProps: { id: 'icon' },
  tooltipContent: 'opens a new window',
  tooltipType: 'description',
};

LinkHasIcon.argTypes = { ...argTypes };

const ButtonCircleLink = Template<LinkProps>(Link).bind({});

ButtonCircleLink.args = {
  href: 'https://www.webex.com/',
  target: '_blank',
  iconProps: { id: 'icon' },
  tooltipContent: 'opens a new tab',
  tooltipType: 'description',
  children: (
    <div className="md-link-button-wrapper" style={{ width: '2.5rem', height: '2.5rem' }}>
      <Icon name="chat-group" autoScale={150} />
    </div>
  ),
};

ButtonCircleLink.argTypes = { ...argTypes };

const ButtonPillLink = Template<LinkProps>(Link).bind({});

ButtonPillLink.args = {
  href: 'https://www.webex.com/',
  target: '_blank',
  iconProps: { id: 'icon' },
  tooltipContent: 'opens a new tab',
  tooltipType: 'description',
  className: 'md-link-ButtonPillLink',
  children: (
    <div
      className="md-button-pill-wrapper"
      style={{ display: 'flex', height: '2.5rem', padding: '0 1rem', lineHeight: '2.5rem' }}
    >
      <Text>Go to Download page</Text>
      <Icon name="chat-group" autoScale={150} />
    </div>
  ),
};

ButtonPillLink.argTypes = { ...argTypes };

export { Example, States, LinkHasIcon, ButtonCircleLink, ButtonPillLink };
