import React, { useState } from 'react';
import { Story } from '@storybook/react';

import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import ButtonPill from '../ButtonPill';
import { Item } from '@react-stately/collections';

import Dialog, { DialogProps } from './';
import Documentation from './Dialog.stories.docs.mdx';
import Tooltip from '../Tooltip';
import ButtonCircle from '../ButtonCircle';
import Popover from '../Popover';
import Select from '../Select';
import Text from '../Text';

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

type StoryProps = DialogProps & {
  hasActions: boolean;
};

const coreArgs = {
  descriptionText:
    'This is a long sentence used for details, this should wrap eventually and look very in-place. Be sure to modify what is needed.',
  headerText: 'This is a Title',
  'close-button-aria-label': 'Close',
  size: 'medium' as const,
  hasActions: true,
};

function Template(): Story<StoryProps> {
  const LocalTemplate: Story<StoryProps> = (args: StoryProps) => {
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
          <Dialog {...args} onClose={close}>
            {args.hasActions && (
              <>
                <ButtonPill
                  onClick={close}
                  size={32}
                  slot="footer-button-primary"
                  variant="primary"
                >
                  Primary
                </ButtonPill>
                <ButtonPill
                  variant="secondary"
                  onClick={close}
                  size={32}
                  slot="footer-button-secondary"
                >
                  Secondary
                </ButtonPill>
              </>
            )}
            {args.children}
          </Dialog>
        )}
      </div>
    );
  };

  return LocalTemplate;
}

const Example = Template().bind({});

Example.argTypes = {
  onClose: { action: 'closed' },
  size: { control: 'select', options: ['small', 'medium', 'large'] },
};

Example.args = {
  ...coreArgs,
};

const ContainsPopovers: Story<StoryProps> = (args: StoryProps) => {
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
        <Dialog {...args} onClose={close}>
          {args.hasActions && (
            <>
              <ButtonPill onClick={close} size={32} slot="footer-button-primary" variant="primary">
                Primary
              </ButtonPill>
              <ButtonPill
                variant="secondary"
                onClick={close}
                size={32}
                slot="footer-button-secondary"
              >
                Secondary
              </ButtonPill>
            </>
          )}
          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
            slot="dialog-body"
          >
            Focus and interact with these buttons. Closing the popovers / tooltips using Esc will
            not close the OverlayAlert.
            <Tooltip
              placement="top"
              triggerComponent={<ButtonCircle prefixIcon="accessibility-regular" />}
              type="label"
            >
              Tooltip content
            </Tooltip>
            <Popover
              interactive
              placement="top"
              triggerComponent={<ButtonCircle prefixIcon="accessories-regular" />}
              trigger="click"
            >
              Popover content
              <ButtonPill>Button Inside Popover</ButtonPill>
            </Popover>
            <Select popoverSingleOpenGroupId="select1" aria-label="select1">
              <Item>
                <Text tagName="p">option1</Text>
              </Item>
              <Item>
                <Text tagName="p">option2</Text>
              </Item>
            </Select>
          </div>
        </Dialog>
      )}
    </div>
  );
};

ContainsPopovers.argTypes = {
  onClose: { action: 'closed' },
  size: { control: 'select', options: ['small', 'medium', 'large'] },
};

ContainsPopovers.args = {
  ...coreArgs,
  size: 'large' as const,
};

export { Example, ContainsPopovers };
