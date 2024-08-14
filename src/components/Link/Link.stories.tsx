import { MultiTemplateWithPseudoStates, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import Link, { LinkProps } from './';
import argTypes from './Link.stories.args';
import Documentation from './Link.stories.docs.mdx';
import React from 'react';
import { omit } from 'lodash';

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
      <div style={{ backgroundColor: 'var(--mds-color-theme-inverted-background-normal)' }}>
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
States.argTypes = omit(States.argTypes, ['disabled', 'inverted']);

const LinkHasIcon = Template<LinkProps>(Link).bind({});

LinkHasIcon.args = {
  href: 'https://www.webex.com/',
  target: '_blank',
  tooltipContent: 'opens a new window',
  tooltipType: 'description',
};

LinkHasIcon.argTypes = { ...argTypes };

export { Example, States, LinkHasIcon };
