/* eslint-disable react/display-name */

import { action } from '@storybook/addon-actions';
import React from 'react';

import StyleDocs from 'storybook/docs.stories.style.mdx';
import { DocumentationPage } from 'storybook/helper.stories.docs';
import {
  getComponentStates,
  MultiTemplateWithPseudoStates,
  Template,
} from 'storybook/helper.stories.templates';

import Avatar from 'components/Avatar';
import { PresenceType } from 'components/Avatar/Avatar.types';
import ButtonPill from 'components/ButtonPill';
import Icon from 'components/Icon';
import ListItemBaseSection from 'components/ListItemBaseSection';

import { SHAPES, SIZES } from './ListItemBase.constants';
import Documentation from './ListItemBase.documentation.mdx';
import argTypes from './ListItemBase.stories.args';

import ListItemBase from '.';

export default {
  title: 'Momentum UI/ListItemBase',
  component: ListItemBase,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template((args) => (
  <>
    {getComponentStates(
      ListItemBase,
      {
        ...args,
        children: (
          <>
            <ListItemBaseSection position="start">Start</ListItemBaseSection>
            <ListItemBaseSection position="middle">Middle</ListItemBaseSection>
            <ListItemBaseSection position="end">end</ListItemBaseSection>
          </>
        ),
        onPress: action('onPress'),
      },
      {}
    )}
  </>
)).bind({});

Example.argTypes = { ...argTypes };

const Common = MultiTemplateWithPseudoStates(ListItemBase).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.isDisabled;
delete Common.argTypes.size;
delete Common.argTypes.shape;

Common.parameters = {
  variants: [
    {
      label: 'Simple',
      children: (
        <>
          <ListItemBaseSection position="fill">Text</ListItemBaseSection>
        </>
      ),
    },
    {
      label: 'With Icon',
      children: (
        <>
          <ListItemBaseSection position="fill">Text</ListItemBaseSection>
          <ListItemBaseSection position="end">
            <Icon name="placeholder" scale={16} />
          </ListItemBaseSection>
        </>
      ),
    },
    {
      label: 'With Button',
      children: (state) => (
        <>
          <ListItemBaseSection position="fill">Text</ListItemBaseSection>
          <ListItemBaseSection position="end">
            <ButtonPill disabled={state === 'Disable'} color="join" size={24}>
              Join
            </ButtonPill>
          </ListItemBaseSection>
        </>
      ),
    },
    {
      label: 'With 2 Icons',
      children: (
        <>
          <ListItemBaseSection position="start">
            <Icon name="placeholder" scale={16} />
          </ListItemBaseSection>
          <ListItemBaseSection position="fill">Text</ListItemBaseSection>
          <ListItemBaseSection position="end">
            <Icon name="placeholder" scale={16} />
          </ListItemBaseSection>
        </>
      ),
    },
  ],
};

const Sizes = MultiTemplateWithPseudoStates(ListItemBase).bind({});

Sizes.argTypes = { ...argTypes };
delete Sizes.argTypes.size;

Sizes.parameters = {
  columns: 3,
  variants: [
    ...Object.values(SIZES).map((size) => ({
      size,
      label: `Size: ${size}`,
      children: (
        <>
          <ListItemBaseSection position="start">
            <Icon name="placeholder" scale={16} />
          </ListItemBaseSection>
          <ListItemBaseSection position="fill">Text</ListItemBaseSection>
          <ListItemBaseSection position="end">
            <Icon name="placeholder" scale={16} />
          </ListItemBaseSection>
        </>
      ),
    })),
  ],
};

const Shapes = MultiTemplateWithPseudoStates(ListItemBase).bind({});

Shapes.argTypes = { ...argTypes };
delete Shapes.argTypes.shape;
delete Shapes.argTypes.size;

Shapes.parameters = {
  variants: [
    ...Object.values(SHAPES).map((shape) => {
      return {
        shape,
        label: `Default Size List Item + Shape ${shape}`,
        children: (
          <>
            <ListItemBaseSection position="start">
              {shape === SHAPES.isPilled ? (
                <Avatar title="John Adams" size={32} presence={PresenceType.Active} />
              ) : (
                <Icon name="placeholder" scale={16} />
              )}
            </ListItemBaseSection>
            <ListItemBaseSection position="fill">Text</ListItemBaseSection>
            <ListItemBaseSection position="end">
              <Icon name="placeholder" scale={16} />
            </ListItemBaseSection>
          </>
        ),
      };
    }),
    ...Object.values(SHAPES).map((shape) => {
      return {
        shape,
        size: 32,
        label: `Compact List Item + Shape ${shape}`,
        children: (
          <>
            <ListItemBaseSection position="start">
              {shape === SHAPES.isPilled ? (
                <Avatar title="John Adams" size={24} presence={PresenceType.Active} />
              ) : (
                <Icon name="placeholder" scale={16} />
              )}
            </ListItemBaseSection>
            <ListItemBaseSection position="fill">Text</ListItemBaseSection>
            <ListItemBaseSection position="end">
              <Icon name="placeholder" scale={16} />
            </ListItemBaseSection>
          </>
        ),
      };
    }),
    ...Object.values(SHAPES).map((shape) => {
      return {
        isPadded: true,
        shape,
        label: `Padded Default Size List Item + Shape ${shape}`,
        children: (
          <>
            <ListItemBaseSection position="start">
              {shape === SHAPES.isPilled ? (
                <Avatar title="John Adams" size={32} presence={PresenceType.Active} />
              ) : (
                <Icon name="placeholder" scale={16} />
              )}
            </ListItemBaseSection>
            <ListItemBaseSection position="fill">Text</ListItemBaseSection>
            <ListItemBaseSection position="end">
              <Icon name="placeholder" scale={16} />
            </ListItemBaseSection>
          </>
        ),
      };
    }),
  ],
};

export { Example, Sizes, Shapes, Common };
