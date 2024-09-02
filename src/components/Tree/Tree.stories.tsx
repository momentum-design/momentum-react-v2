import React, { useEffect, useMemo, useState } from 'react';
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
import ButtonPill from '../ButtonPill';

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

  console.log('BUT this gets rendered before the useEffect in the Tree component... and the new node is not yet in the Tree context', { node });

  console.log(node.id, 'context', { treeContext, details: treeContext.getNodeDetails(node.id) });
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

const DynamicTree = Template(() => {
  const exampleTree = tNode('<root>', true, [tNode('1', false)]);

  const [tree, setTree] = useState(exampleTree);
  const [count, setCount] = useState(99);

  useEffect(() => {
    console.log('tree', tree);
    console.log('converted mapped', convertNestedTree2MappedTree(tree));
  }, [tree]);

  const mappedTree = useMemo(() => convertNestedTree2MappedTree(tree), [tree]);

  return (
    <>
      <ButtonPill
        onPress={() => {
          setTree((prev) => {
            // const newTree =;

            // console.log('is the tree really the same?', prev === newTree);
            return Object.create(tNode('root', true, [...prev.children, tNode(`${count}`, false)]));
          });
          setCount((prev) => prev + 1);
        }}
      >
        Add 1 more node
      </ButtonPill>
      <Tree
        treeStructure={tree}
        isRenderedFlat={true}
        shouldNodeFocusBeInset={true}
        excludeTreeRoot={true}
      >
        {mapTree(
          mappedTree,
          (node) => {
            console.log('node', { node });
            // return <p>{node?.id}</p>;
            return <ExampleTreeNode key={node.id.toString()} node={node} />;
          },
          { excludeRootNode: true }
        )}
      </Tree>
    </>
  );
}).bind({});

export { Example, WithRoot, TreeWithScroll, DynamicTree };
