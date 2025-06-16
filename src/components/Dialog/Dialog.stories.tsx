import React, { useState } from 'react';
import { Story } from '@storybook/react';

import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import ButtonPill from '../ButtonPill';

import Dialog, { DialogProps } from './';
import argTypes from './Dialog.stories.args';
import Documentation from './Dialog.stories.docs.mdx';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import ButtonCircle from '../ButtonCircle';

export default {
  title: 'Momentum UI/Dialog',
  component: Dialog,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

function Template(): Story<DialogProps> {
  const LocalTemplate: Story<DialogProps> = (args: DialogProps, { parameters }) => {
    const { hasActions } = parameters;

    const [isOpen, setIsOpen] = useState(false);

    const open = () => {
      setIsOpen(true);
    };

    const close = () => {
      setIsOpen(false);
    };

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
        <ButtonPill onClick={open}>Open</ButtonPill>
        {isOpen && (
          <Dialog
            {...args}
            footerButtonPrimary={
              hasActions ? (
                <ButtonPill onClick={close} size={32}>
                  Primary
                </ButtonPill>
              ) : undefined
            }
            footerButtonSecondary={
              hasActions ? (
                <ButtonPill variant="secondary" onClick={close} size={32}>
                  Secondary
                </ButtonPill>
              ) : undefined
            }
            onClose={close}
          />
        )}
      </div>
    );
  };

  return LocalTemplate;
}

const coreArgs = {
  descriptionText:
    'This is a long sentence used for details, this should wrap eventually and look very in-place. Be sure to modify what is needed.',
  headerText: 'This is a Title',
  'close-button-aria-label': 'Close',
};

const Example = Template().bind({});

Example.argTypes = { ...argTypes, onClose: { action: 'closed' } };

Example.parameters = {
  hasActions: true,
};

Example.args = { ...coreArgs };

const ContainsPopovers: Story<DialogProps> = (args: DialogProps, { parameters }) => {
  const { hasActions } = parameters;
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

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
      <ButtonPill onClick={open}>Open</ButtonPill>
      {isOpen && (
        <Dialog
          {...args}
          footerButtonPrimary={
            hasActions ? (
              <ButtonPill onClick={close} size={32}>
                Primary
              </ButtonPill>
            ) : undefined
          }
          footerButtonSecondary={
            hasActions ? (
              <ButtonPill variant="secondary" onClick={close} size={32}>
                Secondary
              </ButtonPill>
            ) : undefined
          }
          onClose={close}
          {...args}
        >
          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Focus on this button. Closing the tooltip using Esc will not close the OverlayAlert.
            <Tooltip
              placement="top"
              triggerComponent={
                <ButtonCircle>
                  <Icon name="accessibility" />
                </ButtonCircle>
              }
              type="label"
            >
              Tooltip content
            </Tooltip>
          </div>
        </Dialog>
      )}
    </div>
  );
};

ContainsPopovers.argTypes = { ...argTypes };

ContainsPopovers.parameters = {
  hasActions: true,
};
export { Example, ContainsPopovers };
