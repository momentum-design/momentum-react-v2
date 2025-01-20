import React from 'react';

import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import SpatialNavigationProvider from './';
import Documentation from './SpatialNavigationProvider.stories.docs.mdx';
import ButtonPill from '../ButtonPill';
import TextInput from '../TextInput';
import Checkbox from '../Checkbox';
import { Item } from '@react-stately/collections';
import Select from '../Select';
import RadioGroup from '../RadioGroup';
import { mapTree, useTreeContext, convertNestedTree2MappedTree } from '../Tree/Tree.utils';
import TreeNodeBase from '../TreeNodeBase';
import Icon from '../Icon';
import { createTreeNode as tNode } from '../Tree/test.utils';
import MenuTrigger from '../MenuTrigger';
import Menu from '../Menu';
import ButtonCircle from '../ButtonCircle';
import Text from '../Text';
import type { TreeNodeRecord } from '../Tree/Tree.types';
import { PRESERVE_TABINDEX_CLASSNAME } from '../../utils/navigation';
import Tree from '../Tree';
import Flex from '../Flex';
import argTypes from './SpatialNavigationProvider.stories.args';
import { DEFAULTS } from './SpatialNavigationProvider.constants';
import { visualDebugger } from './SpatialNavigationProvider.utils';
import ButtonGroup from '../ButtonGroup';

export default {
  title: 'Momentum UI/SpatialNavigationProvider',
  component: SpatialNavigationProvider,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const ButtonGrid = Template(({ back }) => {
  visualDebugger();
  return (
    <SpatialNavigationProvider
      navigationKeyMapping={{ ...DEFAULTS.SPATIAL_NAVIGATION_KEY_MAPPING, back }}
    >
      <main
        style={{
          width: 'calc(100vw - 5rem)',
          height: 'calc(100vh - 5rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(5, 1fr)',
        }}
      >
        {[...Array(20).keys()].map((i) => (
          <ButtonPill ghost style={{ width: '10rem', margin: 'auto' }} key={i}>
            button {i + 1}
          </ButtonPill>
        ))}
      </main>
    </SpatialNavigationProvider>
  );
}).bind({});
ButtonGrid.argTypes = { ...argTypes };

const Form = Template(({ back }) => {
  visualDebugger();
  return (
    <SpatialNavigationProvider
      navigationKeyMapping={{ ...DEFAULTS.SPATIAL_NAVIGATION_KEY_MAPPING, back }}
    >
      <main
        style={{
          width: 'calc(100vw - 5rem)',
          height: 'calc(100vh - 5rem)',
          display: 'flex',
        }}
      >
        <div
          style={{
            margin: 'auto',
            maxWidth: '200rem',
            gap: '1rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ButtonPill ghost>Start</ButtonPill>
          <TextInput label={'Display Name'} clearAriaLabel="Clear" type="name" />
          <TextInput
            type="text"
            label={'Password'}
            clearAriaLabel="Clear"
            autoComplete="current-password"
          />
          <Checkbox label="Remember me" />
          <Select label={'Single Value'} placeholder={'Select an option'}>
            <Item key="1">This is a very long option and should trim.</Item>
            <Item key="2">Blue</Item>
            <Item key="3">Green</Item>
            <Item key="4">Yellow</Item>
          </Select>

          <ButtonGroup round compressed>
            <ButtonPill outline ghost key="0" size={40} style={{ minWidth: '6.8rem' }}>
              <Icon key="0" name="microphone-on" autoScale={125} style={{ marginLeft: 'auto' }} />
              <div key="1" style={{ marginRight: 'auto' }}>
                Mute
              </div>
            </ButtonPill>
            <MenuTrigger
              key="2"
              placement="top-end"
              triggerComponent={
                <ButtonCircle outline ghost key="1" size={40}>
                  <Icon name="arrow-down" autoScale={100} />
                </ButtonCircle>
              }
              children={[
                <Menu key="0" selectionMode="single">
                  <Item>Item 1</Item>
                  <Item>Item 2</Item>
                </Menu>,
              ]}
            />
          </ButtonGroup>

          <RadioGroup
            options={[
              {
                label: 'Option 1',
                value: 'option1',
              },
              {
                label: 'Option 2',
                value: 'option2',
              },
              {
                label: 'Option 3',
                value: 'option3',
              },
            ]}
            label={'Example'}
          />
        </div>
      </main>
    </SpatialNavigationProvider>
  );
}).bind({});
Form.argTypes = { ...argTypes };

// prettier-ignore
const exampleTree =
  tNode('root', true, [
    tNode('1', false, [
      tNode('1.1',true, [
        tNode('1.1.1'),
        tNode('1.1.2')]),
      tNode('1.2')]),
    tNode('2', true, [
      tNode('2.1'),
      tNode('2.2', true, [
        tNode('2.2.1'),
        tNode('2.2.2'),
        tNode('2.2.3')]),
    ]),
    tNode('3'),
    tNode('4', true, [
      tNode('4.1', false, [
        tNode('4.1.1'),
        tNode('4.1.2')]),
      tNode('4.2')]),
  ]);

const exampleTreeMap = convertNestedTree2MappedTree(exampleTree);

const ExampleTreeNode = ({ node }: { node: TreeNodeRecord }) => {
  const treeContext = useTreeContext();
  const nodeDetails = treeContext.getNodeDetails(node.id);

  if (node.id === '<root>') {
    return null;
  }

  return (
    <TreeNodeBase nodeId={node.id} style={{ width: '20rem' }}>
      {() => (
        <div
          style={{
            marginLeft: `${nodeDetails.level}rem`,
            marginRight: `1rem`,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {!nodeDetails.isLeaf && (
              <Icon name={nodeDetails.isOpen ? 'arrow-down' : 'arrow-right'} scale={12} />
            )}
            <Text tagName="p">Node {node.id}</Text>
          </div>
          {nodeDetails.isLeaf && (
            <MenuTrigger
              className={PRESERVE_TABINDEX_CLASSNAME}
              triggerComponent={
                <ButtonCircle size={20} ghost aria-label="More menu">
                  <Icon name="more" weight="bold" autoScale={100} />
                </ButtonCircle>
              }
            >
              <Menu selectionMode="single" key="2">
                <Item key="one">One</Item>
                <Item key="two">Two</Item>
                <Item key="three">Three</Item>
              </Menu>
            </MenuTrigger>
          )}
        </div>
      )}
    </TreeNodeBase>
  );
};

const TreeNavigation = Template(({ back }) => {
  visualDebugger();
  return (
    <SpatialNavigationProvider
      navigationKeyMapping={{ ...DEFAULTS.SPATIAL_NAVIGATION_KEY_MAPPING, back }}
    >
      <main
        style={{
          width: 'calc(100vw - 5rem)',
          height: 'calc(100vh - 5rem)',
          display: 'grid',
          gridTemplateColumns: '1fr 3fr 1fr',
          gridTemplateRows: '1fr 8fr 1fr',
        }}
      >
        <Flex>
          <ButtonPill outline inverted style={{ width: '10rem', margin: 'auto' }}>
            Top Left
          </ButtonPill>
        </Flex>

        <Flex>
          <ButtonPill outline inverted style={{ width: '10rem', margin: 'auto' }}>
            Top
          </ButtonPill>
        </Flex>

        <Flex>
          <ButtonPill outline inverted style={{ width: '10rem', margin: 'auto' }}>
            Top Right
          </ButtonPill>
        </Flex>

        <Flex>
          <ButtonPill outline inverted style={{ width: '10rem', margin: 'auto' }}>
            Left
          </ButtonPill>
        </Flex>
        <Flex>
          <Tree
            style={{ margin: 'auto', overflow: 'auto', maxHeight: '500px' }}
            treeStructure={exampleTree}
            isRenderedFlat={true}
            shouldNodeFocusBeInset={true}
            aria-label={'some tree'}
          >
            {mapTree(exampleTreeMap, (node) => (
              <ExampleTreeNode key={node.id.toString()} node={node} />
            ))}
          </Tree>
        </Flex>

        <Flex>
          <ButtonPill outline inverted style={{ width: '10rem', margin: 'auto' }}>
            Right
          </ButtonPill>
        </Flex>

        <Flex>
          <ButtonPill outline inverted style={{ width: '10rem', margin: 'auto' }}>
            Bottom Left
          </ButtonPill>
        </Flex>

        <Flex>
          <ButtonPill outline inverted style={{ width: '10rem', margin: 'auto' }}>
            Bottom
          </ButtonPill>
        </Flex>

        <Flex>
          <ButtonPill outline inverted style={{ width: '10rem', margin: 'auto' }}>
            Bottom Right
          </ButtonPill>
        </Flex>
      </main>
    </SpatialNavigationProvider>
  );
}).bind({});
TreeNavigation.argTypes = { ...argTypes };

export { ButtonGrid, Form, TreeNavigation };
