import { getNextActiveNode, toggleActiveNode } from './Tree.utils';
import { ActiveTreeNode, TreeRoot } from './Tree.types';
import { createActiveNode, createTreeNode as tNode } from './test.utils';

describe('Tree utils', () => {
  describe('toggleActiveNode', () => {
    it('should toggle isOpen', () => {
      const activeNode: ActiveTreeNode = {
        current: tNode('1', true),
        reverseParentPath: [],
        selectedIndex: 0,
      };

      const activeNode2 = toggleActiveNode(activeNode);
      expect(activeNode2.current.isOpen).toEqual(false);

      const activeNode3 = toggleActiveNode(activeNode2);
      expect(activeNode3.current.isOpen).toEqual(true);
    });
    it('should transform active node without mutation', () => {
      const activeNode: ActiveTreeNode = {
        current: tNode('1', true),
        reverseParentPath: [],
        selectedIndex: 0,
      };

      const activeNode2 = toggleActiveNode(activeNode);

      expect(activeNode).not.toBe(activeNode2);
      expect(activeNode.current).not.toBe(activeNode2.current);
      expect(activeNode.reverseParentPath).toBe(activeNode2.reverseParentPath);
      expect(activeNode.selectedIndex).toBe(activeNode2.selectedIndex);
    });
  });

  describe('setNextFocus', () => {
    // NOTE: root node's id excluded from the path
    // prettier-ignore
    const tree: TreeRoot = tNode('<root>', true, [
      tNode('0'),
      tNode('1', false, [
        tNode('1.1', true, [
          tNode('1.1.1'),
          tNode('1.1.2')]),
        tNode('1.2')]),
      tNode('2', true, [
        tNode('2.1'),
        tNode('2.2',  true,[
          tNode('2.2.1'),
          tNode('2.2.2'),
          tNode('2.2.3')]),
      ]),
      tNode('3'),
      tNode('4', true, [
        tNode('4.1', false, [
          tNode('4.1.1'),
          tNode('4.1.2')
        ]),
        tNode('4.2'),
      ]),
    ]);

    describe('when press arrow left', () => {
      it('closes the node when it was open', () => {
        const activeNode = createActiveNode(tree, ['2', '2.2']);
        const result = getNextActiveNode('ArrowLeft', activeNode);

        expect(result).toEqual(toggleActiveNode(activeNode));
        expect(result.current.isOpen).toEqual(false);
      });

      it('moves up one level when the active node was closed', () => {
        const activeNode = createActiveNode(tree, ['4', '4.1']);
        const result = getNextActiveNode('ArrowLeft', activeNode);

        expect(result).toEqual(createActiveNode(tree, ['4']));
      });

      it('moves up one level when active node is a leaf', () => {
        const activeNode = createActiveNode(tree, ['4', '4.2']);
        const result = getNextActiveNode('ArrowLeft', activeNode);

        expect(result).toEqual(createActiveNode(tree, ['4']));
      });

      it('does nothing when the node is in the root', () => {
        const activeNode = createActiveNode(tree, ['1']);
        const result = getNextActiveNode('ArrowLeft', activeNode);

        expect(result).toEqual(activeNode);
      });
    });

    describe('when press arrow right', () => {
      it('opens active node when it was closed', () => {
        const activeNode = createActiveNode(tree, ['1']);
        const result = getNextActiveNode('ArrowRight', activeNode);

        expect(result).toEqual(toggleActiveNode(activeNode));
        expect(result.current.isOpen).toEqual(true);
      });

      it('activates the first child of the already open node', () => {
        const activeNode = createActiveNode(tree, ['2']);
        const result = getNextActiveNode('ArrowRight', activeNode);

        expect(result).toEqual(createActiveNode(tree, ['2', '2.1']));
      });

      it('does nothing when the active node is a leaf', () => {
        const activeNode = createActiveNode(tree, ['4', '4.2']);
        const result = getNextActiveNode('ArrowRight', activeNode);

        expect(result).toEqual(activeNode);
      });
    });

    describe('when press arrow down', () => {
      it.each`
        from                     | to
        ${['0']}                 | ${['1']}
        ${['1']}                 | ${['2']}
        ${['2']}                 | ${['2', '2.1']}
        ${['2', '2.1']}          | ${['2', '2.2']}
        ${['2', '2.2']}          | ${['2', '2.2', '2.2.1']}
        ${['2', '2.2', '2.2.1']} | ${['2', '2.2', '2.2.2']}
        ${['2', '2.2', '2.2.2']} | ${['2', '2.2', '2.2.3']}
        ${['2', '2.2', '2.2.3']} | ${['3']}
        ${['3']}                 | ${['4']}
        ${['4']}                 | ${['4', '4.1']}
        ${['4', '4.1']}          | ${['4', '4.2']}
      `('active node moves down in the three from $from to $to', ({ from, to }) => {
        const result = getNextActiveNode('ArrowDown', createActiveNode(tree, from));
        expect(result).toEqual(createActiveNode(tree, to));
      });
    });

    describe('when press arrow up', () => {
      it.each`
        from                     | to
        ${['4', '4.2']}          | ${['4', '4.1']}
        ${['4', '4.1']}          | ${['4']}
        ${['4']}                 | ${['3']}
        ${['3']}                 | ${['2', '2.2', '2.2.3']}
        ${['2', '2.2', '2.2.3']} | ${['2', '2.2', '2.2.2']}
        ${['2', '2.2', '2.2.2']} | ${['2', '2.2', '2.2.1']}
        ${['2', '2.2', '2.2.1']} | ${['2', '2.2']}
        ${['2', '2.2']}          | ${['2', '2.1']}
        ${['2', '2.1']}          | ${['2']}
        ${['2']}                 | ${['1']}
        ${['1']}                 | ${['0']}
      `('active node moves up in the three from $from to $to', ({ from, to }) => {
        const result = getNextActiveNode('ArrowUp', createActiveNode(tree, from));
        expect(result).toEqual(createActiveNode(tree, to));
      });
    });
  });
});
