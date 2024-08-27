import React from 'react';
import Text from '../Text';
import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import argTypes from './Tree.stories.args';
import Documentation from './Tree.stories.docs.mdx';
import { createTreeNode as tNode } from './test.utils';
import Tree, { TreeProps, useTreeContext } from './';
import { convertNestedTree2MappedTree, mapTree } from './Tree.utils';
import TreeNodeBase from '../TreeNodeBase';
import Icon from '../Icon';
import Menu from '../Menu';
import { Item } from '@react-stately/collections';
import MenuTrigger from '../MenuTrigger';
import ButtonCircle from '../ButtonCircle';
import { TreeNodeRecord } from './Tree.types';

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

export default {
  title: 'Momentum UI/Tree',
  component: Tree,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
      source: { type: 'code' },
    },
  },
};

interface ExampleTreeNodeProps {
  node: TreeNodeRecord;
}

const ExampleTreeNode = ({ node }: ExampleTreeNodeProps) => {
  const treeContext = useTreeContext();
  const { level, isOpen, isLeaf } = treeContext.getNodeDetails(node.id);

  if (node.id === '<root>') {
    return null;
  }

  return (
    <TreeNodeBase nodeId={node.id} style={{ width: '20rem' }}>
      <div
        style={{
          marginLeft: `${level}rem`,
          marginRight: `1rem`,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {!isLeaf && <Icon name={isOpen ? 'arrow-down' : 'arrow-right'} scale={12} />}
          <Text>Node {node.id}</Text>
        </div>
        {isLeaf && (
          <MenuTrigger
            triggerComponent={
              <ButtonCircle size={20} ghost>
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
    </TreeNodeBase>
  );
};

const Example = Template<TreeProps>(Tree).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  treeStructure: exampleTree,
  isRenderedFlat: true,
  shouldNodeFocusBeInset: true,
  children: mapTree(exampleTreeMap, (node) => (
    <ExampleTreeNode key={node.id.toString()} node={node} />
  )),
};

const WithRoot = Template<TreeProps>(Tree).bind({});

WithRoot.argTypes = { ...argTypes };

WithRoot.args = {
  treeStructure: exampleTree,
  isRenderedFlat: true,
  shouldNodeFocusBeInset: true,
  excludeTreeRoot: false,
  children: mapTree(
    exampleTreeMap,
    (node) => <ExampleTreeNode key={node.id.toString()} node={node} />,
    { excludeRootNode: false }
  ),
};
const TreeWithScroll = Template<TreeProps>(Tree).bind({});

TreeWithScroll.argTypes = { ...argTypes };

TreeWithScroll.args = {
  treeStructure: exampleTree,
  isRenderedFlat: true,
  shouldNodeFocusBeInset: true,
  excludeTreeRoot: false,
  style: { height: '20rem', width: '25rem', overflow: 'auto' },
  children: mapTree(
    exampleTreeMap,
    (node) => <ExampleTreeNode key={node.id.toString()} node={node} />,
    { excludeRootNode: false }
  ),
};

export { Example, WithRoot, TreeWithScroll };
