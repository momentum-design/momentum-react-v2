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
  });

  describe('tree navigation', () => {
    it.each(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'])(
      'should do nothing when tree structure is empty and user presses %s',
      (key) => {
        render(<Tree treeStructure={{}} excludeTreeRoot={false} />);
        const focusedElement = document.activeElement;

        userEvent.keyboard(`{${key}}`);

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
              TreeNodeBase 1
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
                {node.id}
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
      expect.assertions(16);
      const user = userEvent.setup();
      const tree = getSampleTree();
      const setNodeOpen = jest.fn();
      const scrollToNode = jest.fn();

      const { getByTestId } = render(
        <Tree
          treeStructure={tree}
          excludeTreeRoot={false}
          virtualTreeConnector={{
            setNodeOpen,
            scrollToNode,
          }}
        >
          {mapTree(
            convertNestedTree2MappedTree(tree),
            (node) => (
              <TreeNodeBase key={node.id.toString()} nodeId={node.id} data-testid={node.id}>
                {node.id}
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
        await user.keyboard('{ArrowRight}');
        expect(getByTestId(nextFocusedNode)).toHaveFocus();

        if (toggleNode) {
          expect(setNodeOpen).toHaveBeenCalledWith(nextFocusedNode, true);
          expect(scrollToNode).toHaveBeenNthCalledWith(1, nextFocusedNode);
        }
      }

      const reversNodeOrder = [
        { nextFocusedNode: '1.1', toggleNode: false }, // moved up
        { nextFocusedNode: '1.1', toggleNode: true }, // close
        { nextFocusedNode: '1', toggleNode: false }, // moved up
        { nextFocusedNode: '1', toggleNode: true }, // close
        { nextFocusedNode: 'root', toggleNode: false }, // moved up
      ];

      for (const { nextFocusedNode, toggleNode } of reversNodeOrder) {
        await user.keyboard('{ArrowLeft}');
        expect(getByTestId(nextFocusedNode)).toHaveFocus();

        if (toggleNode) {
          expect(setNodeOpen).toHaveBeenCalledWith(nextFocusedNode, false);
          expect(scrollToNode).toHaveBeenCalledWith(nextFocusedNode);
        }
      }
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
                <>
                  {node.id}
                  <button data-testid={`button-${node.id}`}>btn</button>
                </>
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
});
