import React, { useState } from 'react';
import { Story } from '@storybook/react';

import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import ModalContainer from '../ModalContainer';

import Overlay, { OverlayProps } from './';
import argTypes from './Overlay.stories.args';
import Documentation from './Overlay.stories.docs.mdx';

export default {
  title: 'Momentum UI/Overlay',
  component: Overlay,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example: Story<OverlayProps> = (args: OverlayProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: 'var(--mds-color-theme-background-solid-primary-normal)',
        border:
          '1px var(--md-globals-border-style-solid) var(--mds-color-theme-outline-secondary-normal)',
        display: 'flex',
        padding: '4rem',
        position: 'relative',
        width: '80%',
      }}
    >
      {isOpen && (
        <Overlay {...args}>
          <ModalContainer color="tertiary" elevation={2} round={50} isPadded>
            <div style={{ marginRight: '1rem' }}>Foreground Container</div>
            <button onClick={toggleOpen}>Close Overlay</button>
          </ModalContainer>
        </Overlay>
      )}
      <ModalContainer color="tertiary" elevation={2} round={50} isPadded>
        <div style={{ marginRight: '1rem' }}>Background Container</div>
        <button onClick={toggleOpen}>Open Overlay</button>
      </ModalContainer>
    </div>
  );
};

Example.argTypes = { ...argTypes };

export { Example };
