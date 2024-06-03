import React, { useState } from 'react';
import { Story } from '@storybook/react';

import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import ButtonCircle from '../ButtonCircle';
import ButtonControl from '../ButtonControl';
import ButtonPill from '../ButtonPill';
import ButtonGroup from '../ButtonGroup';
import Icon from '../Icon';

import OverlayAlert, { OverlayAlertProps } from './';
import argTypes from './OverlayAlert.stories.args';
import Documentation from './OverlayAlert.stories.docs.mdx';

export default {
  title: 'Momentum UI/OverlayAlert',
  component: OverlayAlert,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

function Template(): Story<OverlayAlertProps> {
  const LocalTemplate: Story<OverlayAlertProps> = (args: OverlayAlertProps, { parameters }) => {
    const { hasActions, hasControls } = parameters;

    const [isOpen, setIsOpen] = useState(false);

    const open = () => {
      setIsOpen(true);
    };

    const close = () => {
      setIsOpen(false);
    };

    const actions = !!hasActions && [
      <ButtonPill key={0} onPress={close} size={28}>
        OK
      </ButtonPill>,
      <ButtonPill key={1} color="cancel" onPress={close} size={28}>
        Cancel
      </ButtonPill>,
      <ButtonGroup key={2} round>
        <ButtonPill onPress={close} size={28}>
          Grouped Button
        </ButtonPill>
        <ButtonCircle onPress={close} size={28}>
          <Icon name="accessibility" autoScale />
        </ButtonCircle>
      </ButtonGroup>,
    ];

    const controls = !!hasControls && [
      <ButtonControl key={0} onPress={close} control="minimize" />,
      <ButtonControl key={1} onPress={close} control="maximize" />,
      <ButtonControl key={2} onPress={close} control="close" />,
    ];

    return (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: 'var(--mds-color-theme-background-solid-primary-normal)',
          border:
            '1px var(--md-globals-border-style-solid) var(--mds-color-theme-outline-secondary-normal)',
          display: 'flex',
          height: '80%',
          paddingLeft: '4rem',
          position: 'relative',
          width: '80%',
        }}
      >
        <ButtonPill onPress={open}>Open</ButtonPill>
        {isOpen && <OverlayAlert actions={<>{actions}</>} controls={<>{controls}</>} {...args} onClose={close}/>}
      </div>
    );
  };

  return LocalTemplate;
}

const coreArgs = {
  details:
    'This is a long sentence used for details, this should wrap eventually and look very in-place. Be sure to modify what is needed.',
  title: 'This is a Title',
};

const Example = Template().bind({});

Example.argTypes = { ...argTypes, onClose: { action: 'closed' } };

Example.parameters = {
  hasActions: true,
  hasControls: true,
};

Example.args = { ...coreArgs };

const WithoutActions = Template().bind({});

WithoutActions.argTypes = { ...argTypes };

WithoutActions.parameters = {
  hasActions: false,
  hasControls: true,
};

WithoutActions.args = { ...coreArgs };

const WithoutControls = Template().bind({});

WithoutControls.argTypes = { ...argTypes };

WithoutControls.parameters = {
  hasActions: true,
  hasControls: false,
};

WithoutControls.args = { ...coreArgs };

const WithoutTitle = Template().bind({});

WithoutTitle.argTypes = { ...argTypes };

WithoutTitle.parameters = {
  hasActions: true,
  hasControls: true,
};

WithoutTitle.args = { ...{ details: coreArgs.details } };

const FigmaExample: Story<OverlayAlertProps> = (args: OverlayAlertProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const actions = [
    <ButtonPill key={0} outline inverted onPress={close} size={32}>
      Secondary
    </ButtonPill>,
    <ButtonPill key={1} onPress={close} size={32}>
      Primary
    </ButtonPill>,
  ];

  const controls = [<ButtonControl key={2} onPress={close} control="close" />];

  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: 'var(--mds-color-theme-background-solid-primary-normal)',
        border:
          '1px var(--md-globals-border-style-solid) var(--mds-color-theme-outline-secondary-normal)',
        display: 'flex',
        height: '80%',
        paddingLeft: '4rem',
        position: 'relative',
        width: '80%',
      }}
    >
      <ButtonPill onPress={open}>Open</ButtonPill>
      {isOpen && (
        <OverlayAlert
          details="In ultrices dapibus tortor in posuere. Sed rhoncus mi sem."
          title="Title"
          actions={<>{actions}</>}
          controls={<>{controls}</>}
          {...args}
        />
      )}
    </div>
  );
};

FigmaExample.argTypes = { ...argTypes };

export { Example, WithoutActions, WithoutControls, WithoutTitle, FigmaExample };
