/* eslint-disable react/display-name */
import React from 'react';
import omit from 'lodash/omit';

import TreeNodeBase from '.';

import { DocumentationPage } from '../../storybook/helper.stories.docs';
import Documentation from './TreeNodeBase.stories.docs.mdx';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import {
  getComponentStates,
  MultiTemplateWithPseudoStates,
  Template,
} from '../../storybook/helper.stories.templates';

import ListItemBaseSection from '../ListItemBaseSection';
import { SHAPES, SIZES } from './TreeNodeBase.constants';
import { action } from '@storybook/addon-actions';
import Icon from '../Icon';
import ButtonPill from '../ButtonPill';
import Avatar from '../Avatar';
import { PresenceType } from '../Avatar/Avatar.types';
import argTypes from './TreeNodeBase.stories.args';
import Tree from '../Tree';
import { createTreeNode as tNode } from '../Tree/test.utils';

export default {
  title: 'Momentum UI/TreeNodeBase',
  component: TreeNodeBase,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const TreeWrapper = ({ children }) => (
  <Tree excludeTreeRoot={false} treeStructure={tNode('root', true, [])}>
    {children}
  </Tree>
);

const Example = Template((args) => (
  <>
    {getComponentStates(
      TreeNodeBase,
      {
        ...args,
        nodeId: 'root',
        children: () => () =>
          (
            <>
              <ListItemBaseSection position="start">Start</ListItemBaseSection>
              <ListItemBaseSection position="middle">Middle</ListItemBaseSection>
              <ListItemBaseSection position="end">end</ListItemBaseSection>
            </>
          ),
        onPress: action('onPress'),
        contextMenuActions: [{ text: 'Action 1' }],
      },
      {},
      TreeWrapper
    )}
  </>
)).bind({});

Example.argTypes = { ...argTypes };

const Common = MultiTemplateWithPseudoStates(TreeNodeBase).bind({});

Common.argTypes = omit({ ...argTypes }, ['isDisabled', 'size', 'shape']);

Common.parameters = {
  variants: [
    {
      label: 'Simple',
      nodeId: 'root',
      children: () => () =>
        (
          <>
            <ListItemBaseSection position="fill">Text</ListItemBaseSection>
          </>
        ),
      Wrapper: TreeWrapper,
    },
    {
      label: 'With Icon',
      nodeId: 'root',
      children: () => () =>
        (
          <>
            <ListItemBaseSection position="fill">Text</ListItemBaseSection>
            <ListItemBaseSection position="end">
              <Icon name="placeholder" scale={16} />
            </ListItemBaseSection>
          </>
        ),
      Wrapper: TreeWrapper,
    },
    {
      label: 'With Button',
      nodeId: 'root',
      children: () => () => (state) =>
        (
          <>
            <ListItemBaseSection position="fill">Text</ListItemBaseSection>
            <ListItemBaseSection position="end">
              <ButtonPill disabled={state === 'Disable'} color="join" size={24}>
                Join
              </ButtonPill>
            </ListItemBaseSection>
          </>
        ),
      Wrapper: TreeWrapper,
    },
    {
      label: 'With 2 Icons',
      nodeId: 'root',
      children: () => () =>
        (
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
      Wrapper: TreeWrapper,
    },
  ],
};

const Sizes = MultiTemplateWithPseudoStates(TreeNodeBase).bind({});

Sizes.argTypes = { ...argTypes };
delete Sizes.argTypes.size;

Sizes.parameters = {
  columns: 3,
  variants: [
    ...Object.values(SIZES).map((size) => ({
      size,
      label: `Size: ${size}`,
      nodeId: 'root',
      children: () => () =>
        (
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
      Wrapper: TreeWrapper,
    })),
  ],
};

const Shapes = MultiTemplateWithPseudoStates(TreeNodeBase).bind({});

Shapes.argTypes = { ...argTypes };
delete Shapes.argTypes.shape;
delete Shapes.argTypes.size;

Shapes.parameters = {
  variants: [
    ...Object.values(SHAPES).map((shape) => {
      return {
        shape,
        label: `Default Size List Item + Shape ${shape}`,
        nodeId: 'root',
        children: () => () =>
          (
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

        Wrapper: TreeWrapper,
      };
    }),
    ...Object.values(SHAPES).map((shape) => {
      return {
        shape,
        size: 32,
        label: `Compact List Item + Shape ${shape}`,
        nodeId: 'root',
        children: () => () =>
          (
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
        Wrapper: TreeWrapper,
      };
    }),
    ...Object.values(SHAPES).map((shape) => {
      return {
        isPadded: true,
        shape,
        label: `Padded Default Size List Item + Shape ${shape}`,
        nodeId: 'root',
        children: () => () =>
          (
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
        Wrapper: TreeWrapper,
      };
    }),
  ],
};

export { Example, Sizes, Shapes, Common };
