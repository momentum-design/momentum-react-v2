import React, { useCallback, useMemo, useRef, useState } from 'react';
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
import { TreeNodeRecord, TreeRefObject } from './Tree.types';
import ButtonPill from '../ButtonPill';
import Flex from '../Flex';
import { v4 as uuidV4 } from 'uuid';

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
            <Text>Node {node.id}</Text>
          </div>
          {nodeDetails.isLeaf && (
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
      )}
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
  const exampleTree = tNode('<root>', true, [tNode('0', false)]);

  const [tree, setTree] = useState(exampleTree);
  const [count, setCount] = useState(1);

  const mappedTree = useMemo(() => convertNestedTree2MappedTree(tree), [tree]);

  return (
    <>
      <ButtonPill
        onPress={() => {
          setTree((prev) => {
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
          (node) => (
            <ExampleTreeNode key={node.id.toString()} node={node} />
          ),
          { excludeRootNode: true }
        )}
      </Tree>
    </>
  );
}).bind({});

const SelectableTree = ({
  templateTitle,
  showSelectedItems,
  ...props
}: Partial<TreeProps> & { templateTitle: string; showSelectedItems?: boolean }) => {
  const ref = useRef<TreeRefObject>();
  const [selected, setSelected] = useState('');
  const [id] = useState(uuidV4);

  const onSelectHandler = (ids: Array<string>) => setSelected(ids.join(', '));
  const clearAll = useCallback(() => ref.current.clearSelection(), [ref]);
  const selectAll = useCallback(
    () =>
      ref.current.updateSelection(
        Array.from(exampleTreeMap.values())
          .filter((node) => (props.selectableNodes === 'leafOnly' ? node.isLeaf : true))
          .map((node) => node.id)
      ),
    [ref, exampleTree]
  );

  return (
    <div>
      <h2 id={id}>{templateTitle}</h2>
      <Flex alignItems={'center'} xgap={'0.5rem'}>
        <ButtonPill size={28} ghost outline onPress={clearAll}>
          Clear Selection
        </ButtonPill>
        {props.selectionMode === 'multiple' && (
          <ButtonPill size={28} ghost outline onPress={selectAll}>
            Select All
          </ButtonPill>
        )}
      </Flex>
      {showSelectedItems && <Text>Selected nodes: [{selected}]</Text>}
      <hr />
      <Tree
        ref={ref as any}
        aria-labelledby={id}
        treeStructure={exampleTree}
        isRenderedFlat={true}
        shouldNodeFocusBeInset={true}
        onSelectionChange={onSelectHandler}
        {...props}
      >
        {mapTree(exampleTreeMap, (node) => (
          <ExampleTreeNode key={node.id.toString()} node={node} />
        ))}
      </Tree>
    </div>
  );
};

const NodeSelection = Template(() => {
  return (
    <Flex justifyContent="space-around">
      <SelectableTree
        templateTitle="Single Selection, Leaf nodes only"
        showSelectedItems={true}
        selectionMode="single"
        selectableNodes="leafOnly"
      />

      <SelectableTree
        templateTitle="Single Selection, Any nodes"
        showSelectedItems={true}
        selectionMode="single"
        selectableNodes="any"
      />

      <SelectableTree
        templateTitle="Multi Selection, Leaf nodes only"
        showSelectedItems={true}
        selectionMode="multiple"
        selectableNodes="leafOnly"
      />
    </Flex>
  );
}).bind({});

const ControlledSelection = Template(() => {
  const [selected, setSelected] = useState<Array<string>>([]);

  const onSelect = useCallback(
    (ids: Array<string>) => {
      setSelected(ids);
    },
    [setSelected]
  );

  return (
    <>
      <h2>Sync selection between trees</h2>
      <Text>Selected nodes: [{selected.join(', ')}]</Text>
      <Flex justifyContent="space-around">
        <SelectableTree
          templateTitle="Tree A"
          selectionMode="multiple"
          selectableNodes="leafOnly"
          selectedItems={selected}
          onSelectionChange={onSelect}
        />

        <SelectableTree
          templateTitle="Tree B"
          selectionMode="multiple"
          selectableNodes="leafOnly"
          selectedItems={selected}
          onSelectionChange={onSelect}
        />
      </Flex>
    </>
  );
}).bind({});

export { Example, WithRoot, TreeWithScroll, DynamicTree, NodeSelection, ControlledSelection };
