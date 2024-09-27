import React from 'react';
import { mount } from 'enzyme';
import '@testing-library/jest-dom';
import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tree, { TREE_CONSTANTS, TreeProps } from './index';
import { createTreeNode as tNode } from './test.utils';
import TreeNodeBase from '../TreeNodeBase';
import { convertNestedTree2MappedTree, mapTree } from './Tree.utils';

const getSampleTree = () => {
  // prettier-ignore
  return tNode('root', true, [
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

describe('<Tree />', () => {
  const commonProps = {
    treeStructure: tNode('root', true, [tNode('1'), tNode('2')]),
  };

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<Tree {...commonProps} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<Tree className={className} {...commonProps} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<Tree id={id} {...commonProps} />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<Tree style={style} {...commonProps} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<Tree style={style} {...commonProps} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<Tree style={style} {...commonProps} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have ref with imperative tree api', () => {
      expect.assertions(1);
      const ref = React.createRef<any>();

      render(<Tree ref={ref} {...commonProps} />);

      expect(ref.current).toEqual({
        clearSelection: expect.any(Function),
        toggleSelection: expect.any(Function),
        updateSelection: expect.any(Function),
        setActiveNodeId: expect.any(Function),
        toggleTreeNode: expect.any(Function),
        treeRef: expect.any(Object),
      });
    });

    it('should have its wrapper class', () => {
      expect.assertions(1);

      const container = mount(<Tree {...commonProps} />);
      const element = container.find(Tree).getDOMNode();

      expect(element.classList.contains(TREE_CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';
      const container = mount(<Tree className={className} {...commonProps} />);
      const element = container.find(Tree).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';
      const container = mount(<Tree id={id} {...commonProps} />);
      const element = container.find(Tree).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';
      const container = mount(<Tree style={style} {...commonProps} />);
      const element = container.find(Tree).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided aria-label when aria-label is provided', () => {
      expect.assertions(1);

      const label = 'test';
      const container = mount(<Tree aria-label={label} {...commonProps} />);
      const element = container.find(Tree).getDOMNode();

      expect(element.getAttribute('aria-label')).toBe('test');
    });

    it('should have provided aria-labelledby when aria-labelledby is provided', () => {
      expect.assertions(1);

      const labelBy = 'label-id';
      const container = mount(<Tree aria-labelledby={labelBy} {...commonProps} />);
      const element = container.find(Tree).getDOMNode();

      expect(element.getAttribute('aria-labelledby')).toBe(labelBy);
    });

    it.each`
      selectionMode          | valueOfAriaMultiselectable
      ${'none' as const}     | ${null}
      ${'single' as const}   | ${'false'}
      ${'multiple' as const} | ${'true'}
    `(
      'should have provided style when style is provided',
      ({ selectionMode, valueOfAriaMultiselectable }) => {
        expect.assertions(1);

        const container = mount(<Tree selectionMode={selectionMode} {...commonProps} />);
        const element = container.find(Tree).getDOMNode();

        expect(element.getAttribute('aria-multiselectable')).toBe(valueOfAriaMultiselectable);
      }
    );
  });

  describe('tree navigation', () => {
    it.each(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'])(
      'should do nothing when tree structure is empty and user presses %s',
      async (key) => {
        render(<Tree treeStructure={{}} excludeTreeRoot={false} />);
        const focusedElement = document.activeElement;

        await userEvent.keyboard(`{${key}}`);

        expect(document.activeElement).toBe(focusedElement);
      }
    );

    it('should handle escape being pressed', async () => {
      const keyDownHandler = jest.fn();

      const { getByRole } = render(
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div onKeyDown={keyDownHandler}>
          <Tree treeStructure={getSampleTree()} excludeTreeRoot={false}>
            <TreeNodeBase key="0" nodeId="root">
              {() => 'TreeNodeBase 1'}
            </TreeNodeBase>
          </Tree>
        </div>
      );

      const treeNode = getByRole('treeitem');

      await userEvent.tab();
      expect(treeNode).toHaveFocus();

      await userEvent.keyboard('{Escape}');
      expect(keyDownHandler).toHaveBeenCalled();
    });

    it('should handle up/down arrow keys correctly', async () => {
      expect.assertions(25);
      const user = userEvent.setup();
      const tree = getSampleTree();

      const { getByTestId } = render(
        <Tree treeStructure={tree} excludeTreeRoot={false}>
          {mapTree(
            convertNestedTree2MappedTree(tree),
            (node) => (
              <TreeNodeBase
                key={node.id.toString()}
                nodeId={node.id}
                data-testid={`node-${node.id}`}
              >
                {() => node.id}
              </TreeNodeBase>
            ),
            { excludeRootNode: false }
          )}
        </Tree>
      );

      await user.tab();

      expect(getByTestId('node-root')).toHaveFocus();

      const nodeOrder = [
        'node-1',
        'node-2',
        'node-2.1',
        'node-2.2',
        'node-2.2.1',
        'node-2.2.2',
        'node-2.2.3',
        'node-3',
        'node-4',
        'node-4.1',
        'node-4.2',
        'node-4.2',
      ];
      for (const testid of nodeOrder) {
        await user.keyboard('{ArrowDown}');
        expect(getByTestId(testid)).toHaveFocus();
      }

      const reversNodeOrder = [
        'node-4.1',
        'node-4',
        'node-3',
        'node-2.2.3',
        'node-2.2.2',
        'node-2.2.1',
        'node-2.2',
        'node-2.1',
        'node-2',
        'node-1',
        'node-root',
        'node-root',
      ];

      for (const testid of reversNodeOrder) {
        await user.keyboard('{ArrowUp}');
        expect(getByTestId(testid)).toHaveFocus();
      }
    });

    it('should handle left/right arrow keys correctly', async () => {
      expect.assertions(34);
      const user = userEvent.setup();
      const tree = getSampleTree();
      const setNodeOpen = jest.fn();
      const scrollToNode = jest.fn();
      const onToggleNode = jest.fn();

      const { getByTestId } = render(
        <Tree
          treeStructure={tree}
          excludeTreeRoot={false}
          virtualTreeConnector={{
            setNodeOpen,
            scrollToNode,
          }}
          onToggleNode={onToggleNode}
        >
          {mapTree(
            convertNestedTree2MappedTree(tree),
            (node) => (
              <TreeNodeBase key={node.id.toString()} nodeId={node.id} data-testid={node.id}>
                {() => node.id}
              </TreeNodeBase>
            ),
            { excludeRootNode: false }
          )}
        </Tree>
      );

      await user.tab();

      expect(getByTestId('root')).toHaveFocus();

      const nodeOrder = [
        { nextFocusedNode: '1', toggleNode: false },
        { nextFocusedNode: '1', toggleNode: true }, // opens the node
        { nextFocusedNode: '1.1', toggleNode: false },
        { nextFocusedNode: '1.1.1', toggleNode: false },
      ];
      for (const { nextFocusedNode, toggleNode } of nodeOrder) {
        expect(onToggleNode).not.toBeCalled();
        await user.keyboard('{ArrowRight}');
        expect(getByTestId(nextFocusedNode)).toHaveFocus();

        if (toggleNode) {
          expect(setNodeOpen).toHaveBeenCalledWith(nextFocusedNode, true);
          expect(scrollToNode).not.toHaveBeenNthCalledWith(1, nextFocusedNode);
          expect(onToggleNode).toHaveBeenCalledWith(nextFocusedNode, true);
        } else {
          expect(onToggleNode).not.toBeCalled();
        }

        onToggleNode.mockReset();
      }

      const reversNodeOrder = [
        { nextFocusedNode: '1.1', toggleNode: false }, // moved up
        { nextFocusedNode: '1.1', toggleNode: true }, // close
        { nextFocusedNode: '1', toggleNode: false }, // moved up
        { nextFocusedNode: '1', toggleNode: true }, // close
        { nextFocusedNode: 'root', toggleNode: false }, // moved up
      ];

      for (const { nextFocusedNode, toggleNode } of reversNodeOrder) {
        expect(onToggleNode).not.toBeCalled();
        await user.keyboard('{ArrowLeft}');
        expect(getByTestId(nextFocusedNode)).toHaveFocus();

        if (toggleNode) {
          expect(setNodeOpen).toHaveBeenCalledWith(nextFocusedNode, false);
          expect(scrollToNode).not.toHaveBeenCalledWith(nextFocusedNode);
          expect(onToggleNode).toHaveBeenCalledWith(nextFocusedNode, false);
        } else {
          expect(onToggleNode).not.toBeCalled();
        }

        onToggleNode.mockReset();
      }
    });

    it('should exclude interactable elements with preserved-tabindex form navigation ', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { getByTestId, getByText } = render(
        <Tree treeStructure={{ id: 'root', children: [] }} excludeTreeRoot={false}>
          <TreeNodeBase nodeId="root" data-testid="root">
            {() => (
              <>
                <button tabIndex={-1}>button 1</button>
                <button tabIndex={-1} className="md-nav-preserve-tabindex">
                  button 2
                </button>
                <div className="md-nav-preserve-tabindex">
                  <button tabIndex={-1}>button 3</button>
                </div>
              </>
            )}
          </TreeNodeBase>
        </Tree>
      );

      await user.tab();

      expect(getByTestId('root')).toHaveFocus();
      await user.tab();
      // active root node change the tabindex for button 1...
      expect(getByText('button 1')).toHaveFocus();
      // ...but not for button 2 and 3
      await user.tab();
      expect(document.body).toHaveFocus();
    });
  });

  describe('virtual tree connector', () => {
    const renderTree = async (virtualTreeConnector?: TreeProps['virtualTreeConnector']) => {
      const tree = getSampleTree();
      const result = render(
        <Tree
          treeStructure={tree}
          excludeTreeRoot={false}
          virtualTreeConnector={virtualTreeConnector}
        >
          {mapTree(
            convertNestedTree2MappedTree(tree),
            (node) => (
              <TreeNodeBase key={node.id.toString()} nodeId={node.id} data-testid={node.id}>
                {() => (
                  <>
                    {node.id}
                    <button data-testid={`button-${node.id}`}>btn</button>
                  </>
                )}
              </TreeNodeBase>
            ),
            { excludeRootNode: false }
          )}
        </Tree>
      );

      await userEvent.tab();
      await userEvent.keyboard('{ArrowDown}');

      return result;
    };

    const renderTreeAndRemoveNode = async (virtualTreeConnector) => {
      const result = await renderTree(virtualTreeConnector);
      const { getByTestId, getByText } = result;

      const node = getByTestId('1');
      node.remove();
      await waitFor(() => getByText('1'));
      return result;
    };

    it('should not add temporal node when the focused one removed, but the virtualTreeConnector not set', async () => {
      expect.assertions(3);
      const { getByTestId, queryByText } = await renderTree();

      const node = getByTestId('1');
      expect(node).toHaveFocus();
      expect(node).not.toHaveClass(TREE_CONSTANTS.STYLE.clonedVirtualTreeNode);
      node.remove();

      await waitFor(() => {
        expect(queryByText('1')).toBeNull();
      });
    });

    it('should clone and append the focused node after it removed', async () => {
      expect.assertions(8);
      const { getByTestId, getByText } = await renderTree({
        scrollToNode: jest.fn(),
        setNodeOpen: jest.fn(),
      });

      const node = getByTestId('1');
      expect(node).toHaveFocus();
      expect(node).not.toHaveClass(TREE_CONSTANTS.STYLE.clonedVirtualTreeNode);
      expect(node.dataset.nodeid).toBe('1');
      expect(node.querySelector('button').tabIndex).toBe(0);
      node.remove();

      await waitFor(() => {
        const clonedNode = getByText('1');
        expect(clonedNode).toHaveFocus();
        // get a dedicated clas name
        expect(clonedNode).toHaveClass(TREE_CONSTANTS.STYLE.clonedVirtualTreeNode);
        // nodeid unsetted
        expect(clonedNode.dataset.nodeid).toBe(undefined);
        // interactable elements made un-focusable
        expect(clonedNode.querySelector('button').tabIndex).toBe(-1);
      });
    });

    it('should call scrollToNode when tree not focused and cloned node exists then focus back to the tree', async () => {
      expect.assertions(2);
      const scrollToNode = jest.fn();
      const { getByText } = await renderTreeAndRemoveNode({
        scrollToNode,
        setNodeOpen: jest.fn(),
      });

      document.body.focus();
      await userEvent.tab();

      // Only adding back Node 1 will remove the cloned node
      expect(getByText('1')).not.toBeNull();
      expect(scrollToNode).toHaveBeenNthCalledWith(1, '1');
    });

    it.each`
      key
      ${'ArrowUp'}
      ${'ArrowDown'}
      ${'ArrowLeft'}
      ${'ArrowRight'}
      ${'Tab'}
    `(`should call scrollToNode when cloned node exists and user presses $key`, async ({ key }) => {
      expect.assertions(1);
      const scrollToNode = jest.fn();

      await renderTreeAndRemoveNode({
        scrollToNode,
        setNodeOpen: jest.fn(),
      });

      await userEvent.keyboard(`{${key}}`);

      expect(scrollToNode).toHaveBeenNthCalledWith(1, '1');
    });

    it('should not call scrollToNode when cloned node exists and user press Shift+Tab', async () => {
      expect.assertions(2);
      const scrollToNode = jest.fn();
      const { getByText } = await renderTreeAndRemoveNode({
        scrollToNode,
        setNodeOpen: jest.fn(),
      });

      await userEvent.tab({ shift: true });

      // Only adding back Node 1 will remove the cloned node
      expect(getByText('1')).not.toBeNull();
      expect(scrollToNode).toHaveBeenCalledTimes(0);
    });

    it('should remove the cloned node when the real node added back', async () => {
      expect.assertions(5);
      const scrollToNode = jest.fn();
      const { getByTestId, getAllByText } = await renderTree({
        scrollToNode,
        setNodeOpen: jest.fn(),
      });

      const node = getByTestId('1');
      const nodeParent = node.parentElement;
      // removing the node
      node.remove();
      await waitFor(() => getByTestId('1'));

      // re-append the node
      nodeParent.appendChild(node);

      expect(getAllByText('1').length).toBe(2);
      await waitFor(() => {
        expect(getAllByText('1').length).toBe(1);
      });

      const added = getByTestId('1');
      // The existing node is not the cloned one
      expect(added).not.toHaveClass(TREE_CONSTANTS.STYLE.clonedVirtualTreeNode);
      expect(added).toHaveFocus();
    });

    it.each`
      key             | focusedTestId
      ${'ArrowUp'}    | ${'root'}
      ${'ArrowDown'}  | ${'2'}
      ${'ArrowLeft'}  | ${'root'}
      ${'ArrowRight'} | ${'1'}
      ${'Tab'}        | ${'button-1'}
    `(
      'should re-dispatch $key event on the real node re-mounted and move the focus to $focusedTestId',
      async ({ key, focusedTestId }) => {
        expect.assertions(2);
        const scrollToNode = jest.fn();
        const { getByTestId } = await renderTree({
          scrollToNode,
          setNodeOpen: jest.fn(),
        });

        const node = getByTestId('1');
        const nodeParent = node.parentElement;
        // removing the node
        node.remove();
        await waitFor(() => getByTestId('1'));
        const clonedNode = getByTestId('1');

        expect(clonedNode).toHaveFocus();

        await userEvent.keyboard(`{${key}}`);

        // re-append the node
        nodeParent.appendChild(node.cloneNode(true));

        if (nodeParent.contains(clonedNode)) {
          await waitForElementToBeRemoved(clonedNode);
        }

        //expect(getByTestId('1')).toHaveFocus();

        await waitFor(() => {
          expect(getByTestId(focusedTestId)).toHaveFocus();
        });
      }
    );
  });

  describe('dynamically changing tree', () => {
    const getTreeComponent = (tree, excludeTreeRoot = false) => {
      return (
        <Tree treeStructure={tree} excludeTreeRoot={excludeTreeRoot}>
          {mapTree(
            convertNestedTree2MappedTree(tree),
            (node) =>
              excludeTreeRoot && node.id === 'root' ? null : (
                <TreeNodeBase key={node.id.toString()} nodeId={node.id} data-testid={node.id}>
                  {() => node.id}
                </TreeNodeBase>
              ),
            { excludeRootNode: false }
          )}
        </Tree>
      );
    };

    it('should re-rendered without errors', () => {
      const tree = getSampleTree();
      const { rerender } = render(getTreeComponent(tree));

      expect(() => rerender(getTreeComponent(tNode('root', true, [])))).not.toThrow();
    });

    it('should re-rendered without errors with empty tree', () => {
      const tree = getSampleTree();
      const { rerender } = render(getTreeComponent(tree));

      expect(() => rerender(getTreeComponent({}, true))).not.toThrow();
    });

    it('should activate the first node in the tree after re-rendered with the new tree', async () => {
      const tree = getSampleTree();
      const { rerender, getByTestId } = render(getTreeComponent(tree));

      await userEvent.tab();
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      expect(getByTestId('2.1')).toHaveFocus();

      const newTree = tNode('new-root', true, [tNode('new-1'), tNode('new-2')]);
      rerender(getTreeComponent(newTree));

      expect(getByTestId('new-root')).toHaveFocus();
    });

    it('should remain active the last active node if it does exist in the new tree', async () => {
      const tree = getSampleTree();
      const { rerender, getByTestId } = render(getTreeComponent(tree));

      await userEvent.tab();
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      expect(getByTestId('2.1')).toHaveFocus();

      const newTree = tNode('new-root', true, [tNode('new-1'), tNode('2.1')]);
      rerender(getTreeComponent(newTree));

      expect(getByTestId('2.1')).toHaveFocus();
    });

    it('should activate the closest parent based on the old tree', async () => {
      const tree = getSampleTree();
      const { rerender, getByTestId } = render(getTreeComponent(tree));

      await userEvent.tab();
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      expect(getByTestId('2.2.1')).toHaveFocus();

      const newTree = tNode('new-root', true, [tNode('new-1'), tNode('2')]);
      rerender(getTreeComponent(newTree));

      expect(getByTestId('2')).toHaveFocus();
    });

    it('should move the focus to the parent node when the previous active node exists but hidden in the new tree', async () => {
      const tree = getSampleTree();
      const { rerender, getByTestId } = render(getTreeComponent(tree));

      await userEvent.tab();
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      expect(getByTestId('2.2.1')).toHaveFocus();

      const newTree = tNode('new-root', true, [
        tNode('new-1'),
        tNode('2', true, [tNode('new-2.2', false, [tNode('2.2.1')])]),
      ]);
      rerender(getTreeComponent(newTree));

      expect(getByTestId('2')).toHaveFocus();
    });

    it('should focus on nothing when the previous active node exists but hidden in the new tree but the root excluded', async () => {
      const tree = getSampleTree();
      const { rerender, queryByText, getByTestId } = render(getTreeComponent(tree, true));

      await userEvent.tab();
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      expect(getByTestId('2.1')).toHaveFocus();

      const newTree = tNode('new-root', false, [tNode('new-1'), tNode('2.1')]);
      rerender(getTreeComponent(newTree));

      expect(queryByText('2.1')).not.toBeInTheDocument();
      expect(queryByText('root')).not.toBeInTheDocument();
    });

    it('navigation should work after re-render with the new tree', async () => {
      const tree = getSampleTree();
      const { rerender, getByTestId } = render(getTreeComponent(tree));

      await userEvent.tab();
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      expect(getByTestId('2.1')).toHaveFocus();

      const newTree = tNode('new-root', true, [tNode('new-1'), tNode('new-2')]);

      rerender(getTreeComponent(newTree));

      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');

      expect(getByTestId('new-2')).toHaveFocus();
    });

    it('should keep the open state of the tree between updates', async () => {
      const { rerender, getByTestId } = render(getTreeComponent(getSampleTree()));

      await userEvent.tab();
      await userEvent.keyboard('{ArrowDown}');
      expect(getByTestId('1')).toHaveFocus();
      await userEvent.keyboard('{ArrowRight}');

      rerender(getTreeComponent(getSampleTree()));

      // can move to 1.1 because it was opened before update
      await userEvent.keyboard('{ArrowDown}');
      expect(getByTestId('1.1')).toHaveFocus();
    });

    it('should select the next visible child of the root when excludeTreeRoot true', async () => {
      const { rerender, getByTestId } = render(getTreeComponent(getSampleTree(), true));

      await userEvent.tab();
      await userEvent.keyboard('{ArrowRight}');
      await userEvent.keyboard('{ArrowDown}');
      expect(getByTestId('1.1')).toHaveFocus();

      const nextTree = getSampleTree();
      nextTree.children = nextTree.children.filter(({ id }) => id !== '1');

      rerender(getTreeComponent(nextTree, true));

      // Focus should move to node '2'
      expect(getByTestId('2')).toHaveFocus();
    });

    it('should autofocus after update when the focused element was inside of the tree', async () => {
      const { rerender, getByTestId } = render(getTreeComponent(getSampleTree(), true));

      await userEvent.tab();
      await userEvent.keyboard('{ArrowRight}');
      await userEvent.keyboard('{ArrowDown}');
      expect(getByTestId('1.1')).toHaveFocus();

      const nextTree = getSampleTree();
      nextTree.children = nextTree.children.filter(({ id }) => id !== '1');

      rerender(getTreeComponent(nextTree, true));

      // Focus should move to node '2'
      expect(getByTestId('2')).toHaveFocus();
    });

    it('should not autofocus after update when the focused element was outside of the tree', async () => {
      const renderTreeWithButton = (tree) => (
        <div>
          {getTreeComponent(tree, true)}
          <button>button</button>
        </div>
      );
      const { rerender, getByTestId, getByText } = render(renderTreeWithButton(getSampleTree()));

      await userEvent.tab();
      await userEvent.keyboard('{ArrowRight}');
      await userEvent.keyboard('{ArrowDown}');
      expect(getByTestId('1.1')).toHaveFocus();

      // move focus to the button
      getByText('button').focus();

      const nextTree = getSampleTree();
      nextTree.children = nextTree.children.filter(({ id }) => id !== '1');

      rerender(renderTreeWithButton(nextTree));

      // Focus should remain on the button
      expect(getByText('button')).toHaveFocus();
    });
  });

  describe('selection', () => {
    const getTreeComponent = (tree, { ref, ...props }: Partial<TreeProps> = {}) => {
      return (
        <Tree treeStructure={tree} excludeTreeRoot={false} {...props} ref={ref as any}>
          {mapTree(
            convertNestedTree2MappedTree(tree),
            (node) => (
              <TreeNodeBase key={node.id.toString()} nodeId={node.id} data-testid={node.id}>
                {() => node.id}
              </TreeNodeBase>
            ),
            { excludeRootNode: false }
          )}
        </Tree>
      );
    };

    describe('with keyboard navigation', () => {
      it.each`
        isRequired | selectionMode | selectableNodes | message             | onChangeCalls
        ${false}   | ${'none'}     | ${'any'}        | ${'neve called'}    | ${[]}
        ${false}   | ${'none'}     | ${'leafOnly'}   | ${'never called'}   | ${[]}
        ${false}   | ${'single'}   | ${'any'}        | ${'called 4 times'} | ${[[['2']], [['2.1']], [[]], [['2']]]}
        ${false}   | ${'single'}   | ${'leafOnly'}   | ${'called 2 times'} | ${[[['2.1']], [[]]]}
        ${false}   | ${'multiple'} | ${'any'}        | ${'called 4 times'} | ${[[['2']], [['2', '2.1']], [['2']], [[]]]}
        ${false}   | ${'multiple'} | ${'leafOnly'}   | ${'called 2 times'} | ${[[['2.1']], [[]]]}
        ${true}    | ${'none'}     | ${'any'}        | ${'neve called'}    | ${[]}
        ${true}    | ${'none'}     | ${'leafOnly'}   | ${'never called'}   | ${[]}
        ${true}    | ${'single'}   | ${'any'}        | ${'called 4 times'} | ${[[['2']], [['2.1']], [['2']]]}
        ${true}    | ${'single'}   | ${'leafOnly'}   | ${'called 2 times'} | ${[[['2.1']]]}
        ${true}    | ${'multiple'} | ${'any'}        | ${'called 4 times'} | ${[[['2']], [['2', '2.1']], [['2']]]}
        ${true}    | ${'multiple'} | ${'leafOnly'}   | ${'called 2 times'} | ${[[['2.1']]]}
      `(
        'should $message onChange when Space key pressed, selectionMode is $selectionMode and selectableNodes is $selectableNodes',
        async ({ isRequired, selectionMode, selectableNodes, onChangeCalls }) => {
          const onSelectionChange = jest.fn();
          const tree = getSampleTree();

          render(
            getTreeComponent(tree, {
              isRequired,
              selectionMode,
              selectableNodes,
              onSelectionChange,
            })
          );

          await userEvent.tab();
          await userEvent.keyboard('{ArrowDown}');
          await userEvent.keyboard('{ArrowDown}');
          await userEvent.keyboard('{Space}'); // select 2
          await userEvent.keyboard('{ArrowDown}');
          await userEvent.keyboard('{Space}'); // select 2.1
          await userEvent.keyboard('{Space}'); // de-select 2.1
          await userEvent.keyboard('{ArrowUp}');
          await userEvent.keyboard('{Space}'); // de-select 2

          expect(onSelectionChange.mock.calls).toEqual(onChangeCalls);
        }
      );
    });

    describe('with mouse navigation', () => {
      it.each`
        isRequired | selectionMode | selectableNodes | message             | onChangeCalls
        ${false}   | ${'none'}     | ${'any'}        | ${'neve called'}    | ${[]}
        ${false}   | ${'none'}     | ${'leafOnly'}   | ${'never called'}   | ${[]}
        ${false}   | ${'single'}   | ${'any'}        | ${'called 4 times'} | ${[[['2.1']], [[]], [['2']], [[]]]}
        ${false}   | ${'single'}   | ${'leafOnly'}   | ${'called 2 times'} | ${[[['2.1']], [[]]]}
        ${false}   | ${'multiple'} | ${'any'}        | ${'called 3 times'} | ${[[['2.1']], [[]], [['2']], [[]]]}
        ${false}   | ${'multiple'} | ${'leafOnly'}   | ${'called 2 times'} | ${[[['2.1']], [[]]]}
        ${true}    | ${'none'}     | ${'any'}        | ${'neve called'}    | ${[]}
        ${true}    | ${'none'}     | ${'leafOnly'}   | ${'never called'}   | ${[]}
        ${true}    | ${'single'}   | ${'any'}        | ${'called 2 times'} | ${[[['2.1']], [['2']]]}
        ${true}    | ${'single'}   | ${'leafOnly'}   | ${'called once'}    | ${[[['2.1']]]}
        ${true}    | ${'multiple'} | ${'any'}        | ${'called 3 times'} | ${[[['2.1']], [['2.1', '2']], [['2.1']]]}
        ${true}    | ${'multiple'} | ${'leafOnly'}   | ${'called once'}    | ${[[['2.1']]]}
      `(
        'should $message onChange when Mouse Click pressed, selectionMode is $selectionMode and selectableNodes is $selectableNodes',
        async ({ isRequired, selectionMode, selectableNodes, onChangeCalls }) => {
          const onSelectionChange = jest.fn();
          const tree = getSampleTree();

          const { getByText } = render(
            getTreeComponent(tree, {
              isRequired,
              selectionMode,
              selectableNodes,
              onSelectionChange,
            })
          );

          // Click on the lowest level node first because parent nodes are closing when they are selected;
          await userEvent.click(getByText('2.1'));
          await userEvent.click(getByText('2.1'));
          await userEvent.click(getByText('2'));
          await userEvent.click(getByText('2'));

          expect(onSelectionChange.mock.calls).toEqual(onChangeCalls);
        }
      );
    });

    it('should update selected items based on the selectionMode', async () => {
      jest.spyOn(console, 'warn').mockImplementation(() => {
        /**/
      });
      const tree = getSampleTree();
      const { rerender, getByTestId } = render(
        getTreeComponent(tree, { selectionMode: 'multiple', selectedItems: ['1', '2.2'] })
      );

      expect(getByTestId('1')).toHaveAttribute('aria-selected', 'true');
      expect(getByTestId('2.2')).toHaveAttribute('aria-selected', 'true');

      rerender(getTreeComponent(tree, { selectionMode: 'none', selectedItems: ['2.1', '4'] }));

      expect(getByTestId('1')).not.toHaveAttribute('aria-selected', 'true');
      expect(getByTestId('2.2')).not.toHaveAttribute('aria-selected', 'true');
      // eslint-disable-next-line no-console
      expect(console.warn).toHaveBeenCalled();
    });

    describe('controlled tree selection', () => {
      it('should change selection based on the selectedItems prop', async () => {
        const tree = getSampleTree();
        const { rerender, getByTestId } = render(
          getTreeComponent(tree, { selectionMode: 'multiple', selectedItems: ['1', '2.2'] })
        );

        expect(getByTestId('1')).toHaveAttribute('aria-selected', 'true');
        expect(getByTestId('2.2')).toHaveAttribute('aria-selected', 'true');

        rerender(
          getTreeComponent(tree, { selectionMode: 'multiple', selectedItems: ['2.1', '4'] })
        );

        expect(getByTestId('1')).not.toHaveAttribute('aria-selected', 'true');
        expect(getByTestId('2.2')).not.toHaveAttribute('aria-selected', 'true');

        expect(getByTestId('2.1')).toHaveAttribute('aria-selected', 'true');
        expect(getByTestId('4')).toHaveAttribute('aria-selected', 'true');
      });
    });
  });
});
