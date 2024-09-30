import React from 'react';
import { mount } from 'enzyme';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ListItemBaseSection from '../ListItemBaseSection';
import ButtonPill from '../ButtonPill';
import TreeNodeBase from '.';
import { NODE_ID_ATTRIBUTE_NAME, STYLE } from './TreeNodeBase.constants';
import * as treeUtils from '../Tree/Tree.utils';
import userEvent from '@testing-library/user-event';
import Tree, { TreeContextValue, TreeNode } from '../Tree';
import { createTreeNode as tNode } from '../Tree/test.utils';
import { convertNestedTree2MappedTree, mapTree, TreeContext } from '../Tree/Tree.utils';

const getMockedTreeContext = (activeNodeId: string): TreeContextValue => ({
  activeNodeId,
  selectableNodes: 'any',
  getNodeAriaProps: jest.fn().mockReturnValue({}),
  getNodeDetails: jest.fn().mockReturnValue({ isHidden: false }),
  setActiveNodeId: jest.fn(),
  toggleTreeNode: jest.fn(),
  itemSelection: {
    selectedItems: [],
    selectionMode: 'none',
    isSelected: jest.fn(),
    toggle: jest.fn(),
    update: jest.fn(),
    clear: jest.fn(),
  },
  isFocusWithin: true,
});

const getSampleTree = () => {
  // prettier-ignore
  return tNode('<root>', true, [
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
};

describe('TreeNodeBase', () => {
  let container;
  let useTreeContextSpy;

  describe('snapshot', () => {
    let treeContextMock: TreeContextValue;

    beforeEach(() => {
      treeContextMock = getMockedTreeContext('42');
      useTreeContextSpy = jest
        .spyOn(treeUtils, 'useTreeContext')
        .mockImplementation(() => treeContextMock);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should match snapshot without tree context', () => {
      useTreeContextSpy = useTreeContextSpy = jest
        .spyOn(treeUtils, 'useTreeContext')
        .mockImplementation(() => null);
      expect.assertions(1);

      container = mount(<TreeNodeBase nodeId="42">{() => 'Test'}</TreeNodeBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<TreeNodeBase nodeId="42">{() => 'Test'}</TreeNodeBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(
        <TreeNodeBase nodeId="42" className={className}>
          {() => 'Test'}
        </TreeNodeBase>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(
        <TreeNodeBase nodeId="42" id={id}>
          {() => 'Test'}
        </TreeNodeBase>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      container = mount(
        <TreeNodeBase nodeId="42" style={style}>
          {() => 'Test'}
        </TreeNodeBase>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with lang', () => {
      expect.assertions(1);

      const lang = 'en-US';

      container = mount(
        <TreeNodeBase nodeId="42" lang={lang}>
          {() => 'Test'}
        </TreeNodeBase>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size', () => {
      expect.assertions(1);

      const size = 40;

      container = mount(
        <TreeNodeBase nodeId="42" size={size}>
          {() => 'Test'}
        </TreeNodeBase>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with shape', () => {
      expect.assertions(1);

      const shape = 'isPilled';

      container = mount(
        <TreeNodeBase nodeId="42" shape={shape}>
          {() => 'Test'}
        </TreeNodeBase>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isSelected', () => {
      expect.assertions(1);

      treeContextMock.itemSelection.selectionMode = 'single';
      treeContextMock.itemSelection.isSelected = jest.fn().mockReturnValue(true);

      container = mount(<TreeNodeBase nodeId="42">{() => 'Test'}</TreeNodeBase>);

      expect(container).toMatchSnapshot();
    });

    it('should pass node details to the children render function', () => {
      useTreeContextSpy.mockRestore();
      expect.assertions(1);
      const childrenFn = jest.fn();

      const tree: TreeNode = tNode('root', true, [tNode('1'), tNode('2')]);

      container = mount(
        <Tree treeStructure={tree} isRenderedFlat={true} excludeTreeRoot={false}>
          {mapTree(
            convertNestedTree2MappedTree(tree),
            (node) => (
              <TreeNodeBase key={node.id} nodeId={node.id} data-testid={`node-${node.id}`}>
                {childrenFn}
              </TreeNodeBase>
            ),
            { excludeRootNode: false }
          )}
        </Tree>
      );

      //
      expect(childrenFn.mock.calls).toEqual([
        [
          {
            children: ['1', '2'],
            id: 'root',
            index: 0,
            isHidden: false,
            isLeaf: false,
            isOpen: true,
            level: 0,
          },
        ],
        [
          {
            children: [],
            id: '1',
            index: 0,
            isHidden: false,
            isLeaf: true,
            isOpen: true,
            level: 1,
            parent: 'root',
          },
        ],
        [
          {
            children: [],
            id: '2',
            index: 1,
            isHidden: false,
            isLeaf: true,
            isOpen: true,
            level: 1,
            parent: 'root',
          },
        ],
      ]);
    });

    it('should render grouping element when the tree is flat', () => {
      useTreeContextSpy.mockRestore();
      expect.assertions(3);

      const tree: TreeNode = tNode('root', true, [tNode('1'), tNode('2')]);

      container = mount(
        <Tree treeStructure={tree} isRenderedFlat={true} excludeTreeRoot={false}>
          {mapTree(
            convertNestedTree2MappedTree(tree),
            (node) => (
              <TreeNodeBase key={node.id} nodeId={node.id} data-testid={`node-${node.id}`}>
                {() => node.id}
              </TreeNodeBase>
            ),
            { excludeRootNode: false }
          )}
        </Tree>
      );

      expect(container).toMatchSnapshot();
      expect(container.find('div[role="group"]').length).toBe(1);
      expect(container.find('div[role="group"]').props()).toEqual({
        'aria-owns': 'md-tree-node-1 md-tree-node-2',
        className: 'md-tree-node-base-group',
        'aria-labelledby': 'md-tree-node-root',
        role: 'group',
      });
    });

    it('should not render the content when the node details are not available', () => {
      useTreeContextSpy.mockRestore();
      expect.assertions(2);

      const tree: TreeNode = tNode('root', false, [tNode('1'), tNode('2')]);
      // prettier-ignore
      container = mount(
        <Tree treeStructure={tree} isRenderedFlat={true} excludeTreeRoot={false}>
          {mapTree(
            convertNestedTree2MappedTree(tree),
            (node) => (
              <TreeNodeBase key={node.id} nodeId={`wrong-id-${node.id}`} data-testid={`node-${node.id}`}>
                {() => <div className="node-content">{node.id}</div>}
              </TreeNodeBase>
            ),
            { excludeRootNode: false }
          )}
        </Tree>
      );

      expect(container).toMatchSnapshot();
      // 0 node rendered
      expect(container.find('.node-content').length).toBe(0);
    });

    it('should not render the content of the hidden nodes', () => {
      useTreeContextSpy.mockRestore();
      expect.assertions(2);

      const tree: TreeNode = tNode('root', false, [tNode('1'), tNode('2')]);
      // prettier-ignore
      container = mount(
        <Tree treeStructure={tree} isRenderedFlat={true} excludeTreeRoot={false}>
          {mapTree(
            convertNestedTree2MappedTree(tree),
            (node) => (
              <TreeNodeBase key={node.id} nodeId={node.id} data-testid={`node-${node.id}`}>
                {() => <div className="node-content">{node.id}</div>}
              </TreeNodeBase>
            ),
            { excludeRootNode: false }
          )}
        </Tree>
      );

      expect(container).toMatchSnapshot();
      expect(container.find('.node-content').length).toBe(1);
    });
  });

  describe('attributes', () => {
    let treeContextMock: TreeContextValue;

    beforeEach(() => {
      treeContextMock = getMockedTreeContext('42');
      jest.spyOn(treeUtils, 'useTreeContext').mockImplementation(() => treeContextMock);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should have its wrapper class', () => {
      container = mount(<TreeNodeBase nodeId="42">{() => 'Test'}</TreeNodeBase>);

      const element = container.find(TreeNodeBase).getDOMNode();
      expect(element.classList.contains(STYLE.wrapper));

      expect(container.exists(`[${NODE_ID_ATTRIBUTE_NAME}="42"]`)).toEqual(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(
        <TreeNodeBase nodeId="42" className={className}>
          {() => 'Test'}
        </TreeNodeBase>
      );

      const element = container.find(TreeNodeBase).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(
        <TreeNodeBase nodeId="42" id={id}>
          {() => 'Test'}
        </TreeNodeBase>
      );

      const element = container.find(TreeNodeBase).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      container = mount(
        <TreeNodeBase nodeId="42" style={style}>
          {() => 'Test'}
        </TreeNodeBase>
      );

      const element = container.find(TreeNodeBase).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided data-disabled when isDisabled is provided', () => {
      expect.assertions(1);

      const lang = 'en-US';

      container = mount(
        <TreeNodeBase nodeId="42" lang={lang}>
          {() => 'Test'}
        </TreeNodeBase>
      );

      const element = container.find(TreeNodeBase).getDOMNode();

      expect(element.getAttribute('lang')).toBe('en-US');
    });

    it('should have provided data-padding when isPadded is provided', () => {
      expect.assertions(1);

      const isPadded = true;

      container = mount(
        <TreeNodeBase nodeId="42" isPadded={isPadded}>
          {() => 'Test'}
        </TreeNodeBase>
      );

      const element = container.find(TreeNodeBase).getDOMNode();

      expect(element.getAttribute('data-padded')).toBe('true');
    });

    it('should have provided data-size when size is provided', () => {
      expect.assertions(1);

      const size = 32;

      container = mount(
        <TreeNodeBase nodeId="42" size={size}>
          {() => 'Test'}
        </TreeNodeBase>
      );

      const element = container.find(TreeNodeBase).getDOMNode();

      expect(element.getAttribute('data-size')).toBe(size.toString());
    });

    it('should have provided data-size auto when size auto is provided', () => {
      expect.assertions(1);

      const size = 'auto';

      container = mount(
        <TreeNodeBase nodeId="42" size={size}>
          {() => 'Test'}
        </TreeNodeBase>
      );

      const element = container.find(TreeNodeBase).getDOMNode();

      expect(element.getAttribute('data-size')).toBe(size.toString());
    });

    it('should have provided data-shape when shape is provided', () => {
      expect.assertions(1);

      const shape = 'isPilled';

      container = mount(
        <TreeNodeBase nodeId="42" shape={shape}>
          {() => 'Test'}
        </TreeNodeBase>
      );

      const element = container.find(TreeNodeBase).getDOMNode();

      expect(element.getAttribute('data-shape')).toBe(shape);
    });

    it('should have provided selected class when isSelected is provided', () => {
      expect.assertions(2);

      treeContextMock.itemSelection.selectionMode = 'single';
      treeContextMock.itemSelection.isSelected = jest.fn().mockReturnValue(true);

      container = mount(<TreeNodeBase nodeId="42">{() => 'Test'}</TreeNodeBase>);

      const element = container.find(TreeNodeBase).getDOMNode();

      expect(element.classList.contains('selected')).toBe(true);
      expect(element.getAttribute('aria-selected')).toBe('true');
    });

    it('should have provided active-node class the tree node is active in the tree', () => {
      expect.assertions(1);

      container = mount(
        <TreeContext.Provider value={{ activeNodeId: 42 } as any}>
          <TreeNodeBase nodeId="42">{() => 'Test'}</TreeNodeBase>
        </TreeContext.Provider>
      );

      const element = container.find(TreeNodeBase).getDOMNode();

      expect(element.classList.contains('active-node')).toBe(true);
    });
  });

  describe('actions', () => {
    let treeContextMock: TreeContextValue;

    beforeEach(() => {
      treeContextMock = getMockedTreeContext('42');
      jest.spyOn(treeUtils, 'useTreeContext').mockImplementation(() => treeContextMock);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should handle mouse press events', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(<TreeNodeBase nodeId="42" onPress={mockCallback} />).find(
        TreeNodeBase
      );

      component.props().onPress({
        type: 'press',
        pointerType: 'mouse',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        target: component.getDOMNode(),
        altKey: false,
      });

      expect(mockCallback).toBeCalledTimes(1);
    });
  });

  describe('keydown', () => {
    const renderWithNButtons = (numOfButtons: number) => {
      const tree = getSampleTree();
      // prettier-ignore
      return render(
        <Tree treeStructure={tree}>
          {mapTree(convertNestedTree2MappedTree(tree), (node) => (
            <TreeNodeBase key={node.id} nodeId={node.id} data-testid={`node-${node.id}`}>
              {() =>(<ListItemBaseSection position="end">
                {numOfButtons > 0 ?
                  (<ButtonPill data-testid={`first-button-${node.id}`} color="join" size={24}>Join 1</ButtonPill>) :
                  (<span>Empty</span>)}
                {numOfButtons > 1 ?
                  (<ButtonPill data-testid={`second-button-${node.id}`} color="join" size={24}>Join 2</ButtonPill>) :
                  (<span>Empty</span>)}
              </ListItemBaseSection>)}
            </TreeNodeBase>
          ))}
        </Tree>
      );
    };

    it('should handle tab key', async () => {
      const user = userEvent.setup();

      const { getByTestId } = renderWithNButtons(2);
      await user.tab();
      await user.tab();
      expect(getByTestId('first-button-1')).toHaveFocus();
      await user.tab();
      expect(getByTestId('second-button-1')).toHaveFocus();

      // no loop back
      await user.tab();
      expect(document.body).toHaveFocus();
    });

    it('should handle shift+tab key', async () => {
      const user = userEvent.setup();
      const { getByTestId } = renderWithNButtons(2);

      await user.tab();

      // move focus to the last interactable
      await user.tab();
      await user.tab();
      expect(getByTestId('second-button-1')).toHaveFocus();

      await user.tab({ shift: true });
      expect(getByTestId('first-button-1')).toHaveFocus();

      // no loop back - focus should be on the list item
      await user.tab({ shift: true });
      expect(getByTestId('node-1')).toHaveFocus();

      // Next shift+tab should move focus to the element before the tree
      await user.tab({ shift: true });
      expect(document.body).toHaveFocus();
    });

    it('onPress should work when Enter key is pressed', async () => {
      const mockCallback = jest.fn();
      const mockClick = jest.fn();

      const user = userEvent.setup();

      render(
        <Tree treeStructure={{ id: 'root', children: [] }} excludeTreeRoot={false}>
          <TreeNodeBase data-testid="list-item-1" key="1" nodeId="root" onPress={mockCallback} />
        </Tree>
      );

      const node = await screen.findByTestId('list-item-1');

      node.onclick = mockClick;

      node.focus();

      expect(node).toHaveFocus();

      await user.keyboard('{Enter}');

      expect(mockCallback).toBeCalledTimes(1);
      expect(mockClick).toBeCalledTimes(1);
    });
  });

  it('should not steal focus when context update but the current focus does not changed', () => {
    const Wrapper = ({ value }: { value: TreeContextValue }) => {
      return (
        <TreeContext.Provider value={value}>
          <TreeNodeBase data-testid="tree-node-1" key="1" nodeId="42" />
          <TreeNodeBase data-testid="tree-node-2" key="2" nodeId="43" />
        </TreeContext.Provider>
      );
    };

    const { getByTestId, rerender } = render(<Wrapper value={getMockedTreeContext(undefined)} />);

    expect(getByTestId('tree-node-1')).not.toHaveFocus();

    rerender(<Wrapper value={getMockedTreeContext('42')} />);
    expect(getByTestId('tree-node-1')).not.toHaveFocus();
  });

  it('should handle without error and do not render DOM element when the tree context is null', () => {
    const Wrapper = () => (
      <TreeNodeBase data-testid="tree-node-1" key="1" nodeId="42">
        {() => <button data-testid="node-content">Content</button>}
      </TreeNodeBase>
    );

    const { queryByTestId } = render(<Wrapper />);

    expect(queryByTestId('tree-node-1')).not.toBeInTheDocument();
    expect(queryByTestId('node-content')).not.toBeInTheDocument();
  });
});
