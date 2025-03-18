import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import { Story } from '@storybook/react';

import Coachmark, { CoachmarkProps } from './';
import argTypes from './Coachmark.stories.args';
import Documentation from './Coachmark.stories.docs.mdx';
import ButtonPill from '../ButtonPill';
import React from 'react';
import Text from '../Text';

export default {
  title: 'Momentum UI/Coachmark',
  component: Coachmark,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example: Story<CoachmarkProps> = (args: CoachmarkProps) => (
  <div style={{ minHeight: '300px', display: 'inline-block' }}>
    <ButtonPill onPress={() => document.getElementById(args.id)?.showPopover()}>open</ButtonPill>
    <ButtonPill onPress={() => document.getElementById(args.id)?.hidePopover()}>close</ButtonPill>
    <ButtonPill id={args.triggerID}>Trigger (dummy)</ButtonPill>
    <Coachmark {...args} />
  </div>
);

Example.argTypes = { ...argTypes };
Example.args = {
  id: 'coachmark',
  triggerID: 'trigger',
  'close-button-aria-label': 'Close',
  children: (
    <div>
      <Text tagName="p" type="header-primary">
        Coachmark title
      </Text>
      <Text tagName="p" type="body-secondary">
        Some content in here, blah blah.
      </Text>
    </div>
  ),
};

export { Example };
