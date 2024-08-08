import React from 'react';
import Text from '../Text';
import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import argTypes from './Tree.stories.args';
import Documentation from './Tree.stories.docs.mdx';
import { createTreeNode as tNode } from './test.utils';
import Tree, { TreeProps, useTreeContext } from './';
import { convertTreeToFlatTree, mapFlatTree } from './Tree.utils';
import TreeNodeBase from '../TreeNodeBase';
import Icon from '../Icon';

// prettier-ignore
const exampleTree =
  tNode('<root>', true, [
    tNode('0'),
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

const exampleFlatTree = convertTreeToFlatTree(exampleTree);

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

const ExampleTreeNode = ({ id }: { id: string }) => {
  const treeContext = useTreeContext();
  const { level, isOpen, isLeaf } = treeContext.getNodeDetails(id);

  return (
    <div
      style={{ marginLeft: `${level}rem`, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
    >
      {!isLeaf && <Icon name={isOpen ? 'arrow-down' : 'arrow-right'} scale={12} />}
      <Text>Level {id}</Text>
    </div>
  );
};

const Example = Template<TreeProps>(Tree).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  treeStructure: exampleTree,
  isRenderedFlat: true,
  shouldFocusOnPress: true,
  children: mapFlatTree(exampleFlatTree, (node) => {
    return (
      <TreeNodeBase key={node.id} id={node.id}>
        <ExampleTreeNode id={node.id} />
      </TreeNodeBase>
    );
  }),
};

export { Example };
