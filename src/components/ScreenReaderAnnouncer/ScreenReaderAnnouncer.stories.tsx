import React from 'react';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import { ComponentMeta, Story } from '@storybook/react';

import ScreenReaderAnnouncer, { ScreenReaderAnnounceOptions } from './';
import argTypes from './ScreenReaderAnnouncer.stories.args';
import Documentation from './ScreenReaderAnnouncer.stories.docs.mdx';
import ButtonPill from '../ButtonPill';

export default {
  title: 'Momentum UI/ScreenReaderAnnouncer',
  component: ScreenReaderAnnouncer,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation),
      inlineStories: false,
    },
  },
} as ComponentMeta<typeof ScreenReaderAnnouncer>;

const buttonid1 = 'id-1';
const buttonid2 = 'id-2';

const Example: Story = (props: ScreenReaderAnnounceOptions) => {
  const message1 = props.body || 'This is message 1';
  const message2 = props.body || 'This is message 2';

  const onPressHandler = (id: string) => {
    ScreenReaderAnnouncer.announce({ ...props, body: id === buttonid1 ? message1 : message2 }, id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
        <p>Click this button for SR to announce 'This is message 1' or the body you define.</p>
        <ButtonPill onPress={() => onPressHandler(buttonid1)}>{`Button 1`}</ButtonPill>
        <ScreenReaderAnnouncer identity={buttonid1} />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
        <p>Click this button for SR to announce 'This is message 2' or the body you define.</p>
        <ButtonPill onPress={() => onPressHandler(buttonid2)}>{`Button 2`}</ButtonPill>
        <ScreenReaderAnnouncer identity={buttonid2} />
      </div>
      <p>
        Note: For SR not to read the announcement twice, click on 'Open canvas in new tab' in
        Storybook.
      </p>
    </div>
  );
};

Example.argTypes = { ...argTypes };

export { Example };
