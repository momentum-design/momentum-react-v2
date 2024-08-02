import React from 'react';
import { mount } from 'enzyme';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tree, { TREE_CONSTANTS } from './index';
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

  describe('tree focus', () => {
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
      expect.assertions(13);
      const user = userEvent.setup();
      const tree = getSampleTree();
      const setVirtualTreeNodeOpenState = jest.fn();

      const { getByTestId } = render(
        <Tree
          treeStructure={tree}
          excludeTreeRoot={false}
          setVirtualTreeNodeOpenState={setVirtualTreeNodeOpenState}
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
          expect(setVirtualTreeNodeOpenState).toHaveBeenCalledWith(nextFocusedNode, true);
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
          expect(setVirtualTreeNodeOpenState).toHaveBeenCalledWith(nextFocusedNode, false);
        }
      }
    });
  });
});
