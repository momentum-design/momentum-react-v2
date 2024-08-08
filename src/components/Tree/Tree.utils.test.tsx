import { convertTreeToFlatTree, getNextActiveNode, toggleActiveNode } from './Tree.utils';
import { FlatTree, ToggleTreeNode } from './Tree.types';
import { createTreeNode as tNode } from './test.utils';

const createSingleLevelTree = () =>
  // prettier-ignore
  convertTreeToFlatTree(tNode('<root>', true, [tNode('0'), tNode('1'), tNode('2')]));

const createTree = () =>
  convertTreeToFlatTree(
    // prettier-ignore
    tNode('<root>', true, [
      tNode('0'),
      tNode('1', false, [
        tNode('1.1',
          true, [
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
    ])
  );

describe('Tree utils', () => {
  describe('toggleActiveNode', () => {
    let tree: FlatTree;
    beforeEach(() => {
      tree = createTree();
    });

    it('should toggle isOpen', () => {
      const activeNode = '1';

      toggleActiveNode(tree, activeNode);
      expect(tree.get(activeNode).isOpen).toEqual(true);

      toggleActiveNode(tree, activeNode);
      expect(tree.get(activeNode).isOpen).toEqual(false);
    });

    it('should work with empty tree', () => {
      const activeNode = '1';
      toggleActiveNode(new Map(), activeNode);
    });

    it('should work with single level tree', () => {
      const activeNode = '1';
      toggleActiveNode(createSingleLevelTree(), activeNode);
    });
  });

  describe('setNextFocus', () => {
    let tree: FlatTree;
    let toggleTreeNode: ToggleTreeNode;
    beforeEach(() => {
      tree = createTree();
      toggleTreeNode = jest.fn();
    });

    describe('when press arrow left', () => {
      it('closes the node when it was open', () => {
        const activeNode = '2.2';
        const result = getNextActiveNode(tree, activeNode, 'ArrowLeft', toggleTreeNode);

        expect(toggleTreeNode).toHaveBeenCalledWith(activeNode);
        expect(result).toEqual('2.2');
      });

      it('moves up one level when the active node was closed', () => {
        const activeNode = '4.1';
        const result = getNextActiveNode(tree, activeNode, 'ArrowLeft', toggleTreeNode);

        expect(toggleTreeNode).not.toHaveBeenCalled();
        expect(result).toEqual('4');
      });

      it('moves up one level when active node is a leaf', () => {
        const activeNode = '4.2';
        const result = getNextActiveNode(tree, activeNode, 'ArrowLeft', toggleTreeNode);

        expect(toggleTreeNode).not.toHaveBeenCalled();
        expect(result).toEqual('4');
      });

      it('does nothing when the node is in the root', () => {
        const activeNode = '1';
        const result = getNextActiveNode(tree, activeNode, 'ArrowLeft', toggleTreeNode);

        expect(toggleTreeNode).not.toHaveBeenCalled();
        expect(result).toEqual(activeNode);
      });

      it('should work with single level tree', () => {
        const activeNode = '1';
        const result = getNextActiveNode(
          createSingleLevelTree(),
          activeNode,
          'ArrowLeft',
          toggleTreeNode
        );

        expect(toggleTreeNode).not.toHaveBeenCalled();
        expect(result).toEqual(activeNode);
      });
    });

    describe('when press arrow right', () => {
      it('opens active node when it was closed', () => {
        const activeNode = '1';
        const result = getNextActiveNode(tree, activeNode, 'ArrowRight', toggleTreeNode);

        expect(toggleTreeNode).toHaveBeenCalledWith(activeNode);
        expect(result).toEqual('1');
      });

      it('activates the first child of the already open node', () => {
        const activeNode = '2';
        const result = getNextActiveNode(tree, activeNode, 'ArrowRight', toggleTreeNode);

        expect(toggleTreeNode).not.toHaveBeenCalled();
        expect(result).toEqual('2.1');
      });

      it('does nothing when the active node is a leaf', () => {
        const activeNode = '4.2';
        const result = getNextActiveNode(tree, activeNode, 'ArrowRight', toggleTreeNode);

        expect(toggleTreeNode).not.toHaveBeenCalled();
        expect(result).toEqual(activeNode);
      });

      it('should work with single level tree', () => {
        const activeNode = '1';
        const result = getNextActiveNode(
          createSingleLevelTree(),
          activeNode,
          'ArrowRight',
          toggleTreeNode
        );

        expect(toggleTreeNode).not.toHaveBeenCalled();
        expect(result).toEqual(activeNode);
      });
    });

    describe('when press arrow down', () => {
      it.each`
        from       | to
        ${'0'}     | ${'1'}
        ${'1'}     | ${'2'}
        ${'2'}     | ${'2.1'}
        ${'2.1'}   | ${'2.2'}
        ${'2.2'}   | ${'2.2.1'}
        ${'2.2.1'} | ${'2.2.2'}
        ${'2.2.2'} | ${'2.2.3'}
        ${'2.2.3'} | ${'3'}
        ${'3'}     | ${'4'}
        ${'4'}     | ${'4.1'}
        ${'4.1'}   | ${'4.2'}
      `('active node moves down in the three from $from to $to', ({ from, to }) => {
        const result = getNextActiveNode(tree, from, 'ArrowDown', toggleTreeNode);

        expect(toggleTreeNode).not.toHaveBeenCalled();
        expect(result).toEqual(to);
      });

      it('should work with single level tree', () => {
        const activeNode = '1';
        const result = getNextActiveNode(
          createSingleLevelTree(),
          activeNode,
          'ArrowDown',
          toggleTreeNode
        );

        expect(toggleTreeNode).not.toHaveBeenCalled();
        expect(result).toEqual('2');
      });
    });

    describe('when press arrow up', () => {
      it.each`
        from       | to
        ${'4.2'}   | ${'4.1'}
        ${'4.1'}   | ${'4'}
        ${'4'}     | ${'3'}
        ${'3'}     | ${'2.2.3'}
        ${'2.2.3'} | ${'2.2.2'}
        ${'2.2.2'} | ${'2.2.1'}
        ${'2.2.1'} | ${'2.2'}
        ${'2.2'}   | ${'2.1'}
        ${'2.1'}   | ${'2'}
        ${'2'}     | ${'1'}
        ${'1'}     | ${'0'}
      `('active node moves up in the three from $from to $to', ({ from, to }) => {
        const result = getNextActiveNode(tree, from, 'ArrowUp', toggleTreeNode);

        expect(toggleTreeNode).not.toHaveBeenCalled();
        expect(result).toEqual(to);
      });

      it('should work with single level tree', () => {
        const activeNode = '1';
        const result = getNextActiveNode(
          createSingleLevelTree(),
          activeNode,
          'ArrowUp',
          toggleTreeNode
        );

        expect(toggleTreeNode).not.toHaveBeenCalled();
        expect(result).toEqual('0');
      });
    });

    describe('when press enter', () => {
      it('should do nothing on leaf nodes', () => {
        const activeNode = '4.2';
        const result = getNextActiveNode(tree, activeNode, 'Enter', toggleTreeNode);

        expect(toggleTreeNode).not.toHaveBeenCalled();
        expect(result).toEqual(activeNode);
      });

      it('should toggle open/close on non-leaf nodes', () => {
        const activeNode = '4';
        const result = getNextActiveNode(tree, activeNode, 'Enter', toggleTreeNode);

        expect(toggleTreeNode).toHaveBeenCalledWith(activeNode);
        expect(result).toEqual(toggleActiveNode(tree, activeNode));
      });
    });
  });
});
