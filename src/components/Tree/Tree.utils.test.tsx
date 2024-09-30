import React from 'react';
import {
  convertNestedTree2MappedTree,
  getFistActiveNode,
  getNextActiveNode,
  getTreeRootId,
  isActiveNodeInDOM,
  isEmptyTree,
  mapTree,
  migrateTreeState,
  toggleTreeNodeRecord,
  TreeContext,
  useTreeContext,
} from './Tree.utils';
import {
  TreeNodeRecord,
  TreeIdNodeMap,
  ToggleTreeNode,
  TreeContextValue,
  TreeNodeId,
} from './Tree.types';
import { createTreeNode as tNode } from './test.utils';
import { renderHook } from '@testing-library/react-hooks';

const createSingleLevelTree = () =>
  // prettier-ignore
  convertNestedTree2MappedTree(tNode('<root>', true, [tNode('0'), tNode('1'), tNode('2')]));

// prettier-ignore
const sampleTree = tNode('<root>', true, [
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
]);

const createTree = () => convertNestedTree2MappedTree(sampleTree);

describe('Tree utils', () => {
  describe('useTreeContext', () => {
    it('should return with treeContextValue when the context is available', () => {
      const wrapper = ({ children }: { children: unknown }) => {
        return (
          <TreeContext.Provider value={'treeContext' as unknown as TreeContextValue}>
            {children}
          </TreeContext.Provider>
        );
      };

      const { result, rerender } = renderHook(() => useTreeContext(), {
        wrapper,
        initialProps: {},
      });

      rerender();

      expect(result.current).toBe('treeContext');
    });

    it('should return with null and log error when the tree context is not available', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {
        /**/
      });
      const { result } = renderHook(() => useTreeContext());
      expect(result.current).toEqual(null);
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenNthCalledWith(
        1,
        'useTreeContext hook used without TreeContext!'
      );
    });
  });

  describe('getTreeRootId', () => {
    it('should return with root id for not empty tree', () => {
      const rootId = getTreeRootId(createTree());

      expect(rootId).toEqual('<root>');
    });

    it('should return with undefined when the tree is empty', () => {
      const rootId = getTreeRootId(new Map());

      expect(rootId).toEqual(undefined);
    });

    it('should return with undefined when there is no root in the tree', () => {
      const tree = createTree();
      tree.get('<root>').parent = '1';
      const rootId = getTreeRootId(tree);

      expect(rootId).toEqual(undefined);
    });
  });

  describe('isEmptyTree', () => {
    it('should return true when the tree is empty', () => {
      expect(isEmptyTree(null)).toBe(true);
      expect(isEmptyTree(undefined)).toBe(true);
      expect(isEmptyTree({})).toBe(true);
      expect(isEmptyTree({ children: [] })).toBe(true);
      expect(isEmptyTree(new Map())).toBe(true);
    });

    it('should return false when the tree is not empty', () => {
      expect(isEmptyTree({ id: 'root' })).toBe(false);
      expect(isEmptyTree(new Map([['root', { id: 'root' }]]))).toBe(false);
    });
  });

  describe('getNextActiveNode', () => {
    let tree: TreeIdNodeMap;
    let toggleTreeNode: ToggleTreeNode;
    beforeEach(() => {
      tree = createTree();
      toggleTreeNode = jest.fn();
    });

    it('should returns with the same nodeId when it is not found in the tree', () => {
      jest.spyOn(console, 'warn').mockImplementation(() => {
        /**/
      });
      const result = getNextActiveNode(tree, 'not-found', 'ArrowDown', true, toggleTreeNode);

      expect(toggleTreeNode).not.toHaveBeenCalled();
      expect(result).toEqual('not-found');
      // eslint-disable-next-line no-console
      expect(console.warn).toHaveBeenCalledTimes(1);
    });

    describe('when root excluded', () => {
      describe('and press arrow left', () => {
        it('closes the node when it was open', () => {
          const activeNode = '2.2';
          const result = getNextActiveNode(tree, activeNode, 'ArrowLeft', true, toggleTreeNode);

          expect(toggleTreeNode).toHaveBeenCalledWith(activeNode);
          expect(result).toEqual('2.2');
        });

        it('moves up one level when the active node was closed', () => {
          const activeNode = '4.1';
          const result = getNextActiveNode(tree, activeNode, 'ArrowLeft', true, toggleTreeNode);

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual('4');
        });

        it('moves up one level when active node is a leaf', () => {
          const activeNode = '4.2';
          const result = getNextActiveNode(tree, activeNode, 'ArrowLeft', true, toggleTreeNode);

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual('4');
        });

        it('does nothing when the node is in the root', () => {
          const activeNode = '1';
          const result = getNextActiveNode(tree, activeNode, 'ArrowLeft', true, toggleTreeNode);

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual(activeNode);
        });

        it('should work with single level tree', () => {
          const activeNode = '1';
          const result = getNextActiveNode(
            createSingleLevelTree(),
            activeNode,
            'ArrowLeft',
            true,
            toggleTreeNode
          );

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual(activeNode);
        });
      });

      describe('and press arrow right', () => {
        it('opens active node when it was closed', () => {
          const activeNode = '1';
          const result = getNextActiveNode(tree, activeNode, 'ArrowRight', true, toggleTreeNode);

          expect(toggleTreeNode).toHaveBeenCalledWith(activeNode);
          expect(result).toEqual('1');
        });

        it('activates the first child of the already open node', () => {
          const activeNode = '2';
          const result = getNextActiveNode(tree, activeNode, 'ArrowRight', true, toggleTreeNode);

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual('2.1');
        });

        it('does nothing when the active node is a leaf', () => {
          const activeNode = '4.2';
          const result = getNextActiveNode(tree, activeNode, 'ArrowRight', true, toggleTreeNode);

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual(activeNode);
        });

        it('should work with single level tree', () => {
          const activeNode = '1';
          const result = getNextActiveNode(
            createSingleLevelTree(),
            activeNode,
            'ArrowRight',
            true,
            toggleTreeNode
          );

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual(activeNode);
        });
      });

      describe('and press arrow down', () => {
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
          ${'4.2'}   | ${'4.2'}
        `('active node moves down in the three from $from to $to', ({ from, to }) => {
          const result = getNextActiveNode(tree, from, 'ArrowDown', true, toggleTreeNode);

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual(to);
        });

        it('should work with single level tree', () => {
          const activeNode = '1';
          const result = getNextActiveNode(
            createSingleLevelTree(),
            activeNode,
            'ArrowDown',
            true,
            toggleTreeNode
          );

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual('2');
        });

        it('should return with the last node id before the loop restart when the tree has a loop', () => {
          jest.spyOn(console, 'error').mockImplementation(() => {
            /**/
          });
          const loopTree = createTree();
          loopTree.get('2').parent = '2.2.3';

          expect(getNextActiveNode(loopTree, '2.2.3', 'ArrowDown', true, toggleTreeNode)).toEqual(
            '2.2'
          );
        });
      });

      describe('and press arrow up', () => {
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
          ${'0'}     | ${'0'}
        `('active node moves up in the three from $from to $to', ({ from, to }) => {
          const result = getNextActiveNode(tree, from, 'ArrowUp', true, toggleTreeNode);

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual(to);
        });

        it('should work with single level tree', () => {
          const activeNode = '1';
          const result = getNextActiveNode(
            createSingleLevelTree(),
            activeNode,
            'ArrowUp',
            true,
            toggleTreeNode
          );

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual('0');
        });
      });

      it('should return with the last node id before the loop restart when the tree has a loop', () => {
        jest.spyOn(console, 'error').mockImplementation(() => {
          /**/
        });
        const loopTree = createTree();
        loopTree.get('2.2').children.push('3');

        expect(getNextActiveNode(loopTree, '3', 'ArrowUp', true, toggleTreeNode)).toEqual('3');
        // eslint-disable-next-line no-console
        expect(console.error).toHaveBeenCalledTimes(1);
      });
    });

    describe('when root not excluded', () => {
      describe('and press arrow left', () => {
        it('closes the node when it was open', () => {
          const activeNode = '2.2';
          const result = getNextActiveNode(tree, activeNode, 'ArrowLeft', false, toggleTreeNode);

          expect(toggleTreeNode).toHaveBeenCalledWith(activeNode);
          expect(result).toEqual('2.2');
        });

        it('moves up one level when the active node was closed', () => {
          const activeNode = '4.1';
          const result = getNextActiveNode(tree, activeNode, 'ArrowLeft', false, toggleTreeNode);

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual('4');
        });

        it('moves up one level when active node is a leaf', () => {
          const activeNode = '4.2';
          const result = getNextActiveNode(tree, activeNode, 'ArrowLeft', false, toggleTreeNode);

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual('4');
        });

        it('moves to the root when the child os the root is active', () => {
          const activeNode = '1';
          const result = getNextActiveNode(tree, activeNode, 'ArrowLeft', false, toggleTreeNode);

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual('<root>');
        });

        it('does nothing when the root node is active', () => {
          // Close the root node

          const rootNode = '<root>';
          tree.get(rootNode).isOpen = false;
          const result = getNextActiveNode(tree, rootNode, 'ArrowLeft', false, toggleTreeNode);

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual(rootNode);
        });

        it('should work with single level tree', () => {
          const activeNode = '<root>';
          const tree = createSingleLevelTree();
          tree.get(activeNode).isOpen = false;
          const result = getNextActiveNode(tree, activeNode, 'ArrowLeft', false, toggleTreeNode);

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual(activeNode);
        });
      });

      describe('and press arrow right', () => {
        it('opens active node when it was closed', () => {
          const activeNode = '1';
          const result = getNextActiveNode(tree, activeNode, 'ArrowRight', false, toggleTreeNode);

          expect(toggleTreeNode).toHaveBeenCalledWith(activeNode);
          expect(result).toEqual('1');
        });

        it('activates the first child of the already open node', () => {
          const activeNode = '2';
          const result = getNextActiveNode(tree, activeNode, 'ArrowRight', false, toggleTreeNode);

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual('2.1');
        });

        it('does nothing when the active node is a leaf', () => {
          const activeNode = '4.2';
          const result = getNextActiveNode(tree, activeNode, 'ArrowRight', false, toggleTreeNode);

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual(activeNode);
        });

        it('should work with single level tree', () => {
          const activeNode = '1';
          const result = getNextActiveNode(
            createSingleLevelTree(),
            activeNode,
            'ArrowRight',
            false,
            toggleTreeNode
          );

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual(activeNode);
        });
      });

      describe('and press arrow down', () => {
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
          ${'4.2'}   | ${'4.2'}
        `('active node moves down in the three from $from to $to', ({ from, to }) => {
          const result = getNextActiveNode(tree, from, 'ArrowDown', false, toggleTreeNode);

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual(to);
        });

        it('should work with single level tree', () => {
          const activeNode = '1';
          const result = getNextActiveNode(
            createSingleLevelTree(),
            activeNode,
            'ArrowDown',
            false,
            toggleTreeNode
          );

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual('2');
        });
      });

      describe('and press arrow up', () => {
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
          ${'0'}     | ${'<root>'}
        `('active node moves up in the three from $from to $to', ({ from, to }) => {
          const result = getNextActiveNode(tree, from, 'ArrowUp', false, toggleTreeNode);

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual(to);
        });

        it('should work with single level tree', () => {
          const activeNode = '1';
          const result = getNextActiveNode(
            createSingleLevelTree(),
            activeNode,
            'ArrowUp',
            false,
            toggleTreeNode
          );

          expect(toggleTreeNode).not.toHaveBeenCalled();
          expect(result).toEqual('0');
        });
      });
    });

    describe('when press enter', () => {
      it('should do nothing on leaf nodes', () => {
        const activeNode = '4.2';
        const result = getNextActiveNode(tree, activeNode, 'Enter', true, toggleTreeNode);

        expect(toggleTreeNode).not.toHaveBeenCalled();
        expect(result).toEqual(activeNode);
      });

      it('should do nothing on non-leaf nodes', () => {
        const activeNode = '4';
        const result = getNextActiveNode(tree, activeNode, 'Enter', true, toggleTreeNode);

        expect(toggleTreeNode).not.toHaveBeenCalled();
        expect(result).toEqual(activeNode);
      });
    });
  });

  describe('toggleTreeNodeRecord', () => {
    it('should not do anything when the open/close state does not change', () => {
      const tree = convertNestedTree2MappedTree(sampleTree);

      const newTree = toggleTreeNodeRecord('4', tree, true);

      expect(newTree).toBe(tree);
      for (const [id, node] of tree.entries()) {
        expect(newTree.get(id)).toBe(node);
      }
    });

    it('should not mutate the original data', () => {
      const tree = convertNestedTree2MappedTree(sampleTree);

      const newTree = toggleTreeNodeRecord('4', tree, false);

      expect(newTree).not.toBe(tree);
      for (const [id, node] of tree.entries()) {
        // Update all the sub-tree
        if (['4', '4.1', '4.1.1', '4.1.2', '4.2'].includes(id)) {
          expect(newTree.get(id)).not.toBe(node);
        } else {
          expect(newTree.get(id)).toBe(node);
        }
      }
    });

    it('should change the isOpen and isHidden values', () => {
      const tree = convertNestedTree2MappedTree(sampleTree);

      const newTree = toggleTreeNodeRecord('2.2', tree, false);

      expect(newTree.get('2.2')?.isOpen).toBe(false);
      expect(newTree.get('2.2')?.isHidden).toBe(false);

      expect(newTree.get('2.2.1')?.isHidden).toBe(!tree.get('2.2.1')?.isHidden);
      expect(newTree.get('2.2.1')?.isOpen).toBe(tree.get('2.2.1')?.isOpen);

      expect(newTree.get('2.2.2')?.isHidden).toBe(!tree.get('2.2.2')?.isHidden);
      expect(newTree.get('2.2.2')?.isOpen).toBe(tree.get('2.2.2')?.isOpen);

      expect(newTree.get('2.2.3')?.isHidden).toBe(!tree.get('2.2.3')?.isHidden);
      expect(newTree.get('2.2.3')?.isOpen).toBe(tree.get('2.2.3')?.isOpen);
    });
  });

  describe('convertNestedTree2MappedTree', () => {
    it('should convert empty tree', () => {
      const tree = convertNestedTree2MappedTree(tNode('<root>'));
      expect(tree.size).toBe(1);
      expect(Array.from(tree.entries())).toEqual([
        [
          '<root>',
          {
            children: [],
            id: '<root>',
            index: 0,
            isOpen: true,
            parent: undefined,
            isHidden: false,
            isLeaf: true,
            level: 0,
          },
        ],
      ]);
    });

    it('should convert non-empty tree', () => {
      const tree = convertNestedTree2MappedTree(sampleTree);
      expect(tree.size).toBe(19);

      // prettier-ignore
      const expected: Array<[TreeNodeId, TreeNodeRecord]> = [
        ['<root>', { children: ['0', '1', '2', '3', '4'], id: '<root>', index: 0, isHidden: false, isLeaf: false, isOpen: true, level: 0, parent: undefined },],
        ['0',        { children: [], id: '0', index: 0, isHidden: false, isLeaf: true, isOpen: true, level: 1, parent: '<root>' },],
        ['1',        { children: ['1.1', '1.2'], id: '1', index: 1, isHidden: false, isLeaf: false, isOpen: false, level: 1, parent: '<root>'}, ],
        ['1.1',      { children: ['1.1.1', '1.1.2'], id: '1.1', index: 0, isHidden: true, isLeaf: false, isOpen: true, level: 2, parent: '1', },],
        ['1.1.1',    { children: [], id: '1.1.1', index: 0, isHidden: true, isLeaf: true, isOpen: true, level: 3, parent: '1.1', }, ],
        ['1.1.2',    { children: [], id: '1.1.2', index: 1, isHidden: true, isLeaf: true, isOpen: true, level: 3, parent: '1.1', }, ],
        ['1.2',      { children: [], id: '1.2', index: 1, isHidden: true, isLeaf: true, isOpen: true, level: 2, parent: '1', }, ],
        ['2',        { children: ['2.1', '2.2'], id: '2', index: 2, isHidden: false, isLeaf: false, isOpen: true, level: 1,  parent: '<root>'}, ],
        ['2.1',      { children: [], id: '2.1', index: 0, isHidden: false, isLeaf: true, isOpen: true, level: 2, parent: '2', }, ],
        ['2.2',      { children: ['2.2.1', '2.2.2', '2.2.3'], id: '2.2', index: 1, isHidden: false, isLeaf: false, isOpen: true, level: 2, parent: '2', },],
        ['2.2.1',    { children: [], id: '2.2.1', index: 0, isHidden: false, isLeaf: true, isOpen: true, level: 3, parent: '2.2', }, ],
        ['2.2.2',    { children: [], id: '2.2.2', index: 1, isHidden: false, isLeaf: true, isOpen: true, level: 3, parent: '2.2', }, ],
        ['2.2.3',    { children: [], id: '2.2.3', index: 2, isHidden: false, isLeaf: true, isOpen: true, level: 3, parent: '2.2', }, ],
        ['3',        { children: [], id: '3', index: 3, isHidden: false, isLeaf: true, isOpen: true, level: 1,  parent: '<root>'},],
        ['4',        { children: ['4.1', '4.2'], id: '4', index: 4, isHidden: false, isLeaf: false, isOpen: true, level: 1,  parent: '<root>'}, ],
        ['4.1',      { children: ['4.1.1', '4.1.2'], id: '4.1', index: 0, isHidden: false, isLeaf: false, isOpen: false, level: 2, parent: '4', },],
        ['4.1.1',    { children: [], id: '4.1.1', index: 0, isHidden: true, isLeaf: true, isOpen: true, level: 3, parent: '4.1', }, ],
        ['4.1.2',    { children: [], id: '4.1.2', index: 1, isHidden: true, isLeaf: true, isOpen: true, level: 3, parent: '4.1', }, ],
        ['4.2',      { children: [], id: '4.2', index: 1, isHidden: false, isLeaf: true, isOpen: true, level: 2, parent: '4', },
        ],
      ];

      expected.forEach(([id, expectedNode]) => {
        expect(tree.get(id)).toEqual(expectedNode);
      });
      expect(tree.size).toBe(expected.length);
    });

    it('should skip duplicated tree node id with the whole subtree', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {
        /**/
      });
      const tree = tNode('<root>', true, [tNode('0'), tNode('0', false, [tNode('1')])]);

      expect(convertNestedTree2MappedTree(tree)).toEqual(
        new Map([
          [
            '<root>',
            {
              children: ['0'],
              id: '<root>',
              index: 0,
              isHidden: false,
              isLeaf: false,
              isOpen: true,
              level: 0,
              parent: undefined,
            },
          ],
          [
            '0',
            {
              children: ['1'],
              id: '0',
              index: 1,
              isHidden: false,
              isLeaf: false,
              isOpen: false,
              level: 1,
              parent: '<root>',
            },
          ],
          [
            '1',
            {
              children: [],
              id: '1',
              index: 0,
              isHidden: true,
              isLeaf: true,
              isOpen: true,
              level: 2,
              parent: '0',
            },
          ],
        ])
      );
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });

  describe('mapTree', () => {
    it('should not call the callback on empty tree', () => {
      const tree = new Map();
      const callback = jest.fn();
      mapTree(tree, callback);

      expect(callback).not.toHaveBeenCalled();
    });

    it('should return with empty array when the there is no root node', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {
        /**/
      });
      // Tree with circular reference -> no node with parent === undefined
      const tree: TreeIdNodeMap = new Map([
        ['root', { id: 'root', parent: '1' } as TreeNodeRecord],
      ]);
      const wrongId = 'not-a-root-id';

      const callback = jest.fn();
      expect(mapTree(tree, callback, { rootNodeId: wrongId })).toEqual([]);

      expect(callback).not.toHaveBeenCalled();
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('should not call the callback on the tree root by default', () => {
      const tree = new Map();
      const callback = jest.fn();
      mapTree(tree, callback);

      expect(callback).not.toHaveBeenCalled();
    });

    it('should not call the callback on the tree root when excludeRootNode is true', () => {
      const tree = convertNestedTree2MappedTree(tNode('<root>', true, []));
      const callback = jest.fn();
      mapTree(tree, callback, { excludeRootNode: true });

      expect(callback).not.toHaveBeenCalled();
    });

    it('should call the callback on the tree root when excludeRootNode is false', () => {
      const tree = convertNestedTree2MappedTree(tNode('<root>', true, []));
      const callback = jest.fn();
      mapTree(tree, callback, { excludeRootNode: false });

      expect(callback).toBeCalledWith(tree.get('<root>'), tree);
    });

    it('should travers all the tree nodes in preorder', () => {
      const tree = createTree();
      const result = mapTree(tree, (node) => node.id);

      expect(result).toEqual([
        '0',
        '1',
        '1.1',
        '1.1.1',
        '1.1.2',
        '1.2',
        '2',
        '2.1',
        '2.2',
        '2.2.1',
        '2.2.2',
        '2.2.3',
        '3',
        '4',
        '4.1',
        '4.1.1',
        '4.1.2',
        '4.2',
      ]);
    });

    it('should travers all the tree nodes from the specified root', () => {
      const tree = createTree();
      const result = mapTree(tree, (node) => node.id, { rootNodeId: '4' });

      expect(result).toEqual(['4.1', '4.1.1', '4.1.2', '4.2']);
    });
  });

  describe('isActiveNodeInDOM', () => {
    it('should return true when the active node is in the DOM', () => {
      const ref = { current: document.createElement('div') };
      ref.current.innerHTML = '<div data-nodeid="active-node"></div>';
      document.body.appendChild(ref.current);

      const result = isActiveNodeInDOM(ref, 'active-node');

      expect(result).toBe(true);
      document.body.removeChild(ref.current);
    });

    it('should return false when the active node is not in the DOM', () => {
      const ref = { current: document.createElement('div') };
      ref.current.innerHTML = '<div data-nodeid="not-active-node"></div>';
      document.body.appendChild(ref.current);

      const result = isActiveNodeInDOM(ref, 'active-node');

      expect(result).toBe(false);
      document.body.removeChild(ref.current);
    });
  });

  describe('getFistActiveNode', () => {
    it.each`
      msg                         | tree                                                                                | excludeTreeRoot | expected
      ${'empty tree'}             | ${{}}                                                                               | ${false}        | ${undefined}
      ${'empty tree'}             | ${{}}                                                                               | ${true}         | ${undefined}
      ${'only root tree'}         | ${{ id: 'root', children: [] }}                                                     | ${true}         | ${undefined}
      ${'only root tree'}         | ${{ id: 'root', children: [] }}                                                     | ${false}        | ${'root'}
      ${'only closed root tree'}  | ${{ id: 'root', children: [], isOpenByDefault: false }}                             | ${true}         | ${undefined}
      ${'only closed  root tree'} | ${{ id: 'root', children: [], isOpenByDefault: false }}                             | ${false}        | ${'root'}
      ${'tree with child'}        | ${{ id: 'root', children: [{ id: 'node', children: [] }] }}                         | ${true}         | ${'node'}
      ${'tree with child'}        | ${{ id: 'root', children: [{ id: 'node', children: [] }] }}                         | ${false}        | ${'root'}
      ${'tree with hidden child'} | ${{ id: 'root', isOpenByDefault: false, children: [{ id: 'node', children: [] }] }} | ${false}        | ${'root'}
      ${'tree with hidden child'} | ${{ id: 'root', isOpenByDefault: false, children: [{ id: 'node', children: [] }] }} | ${false}        | ${'root'}
    `(
      'should return $expected when $msg and $excludeTreeRoot',
      ({ tree, excludeTreeRoot, expected }) => {
        const result = getFistActiveNode(convertNestedTree2MappedTree(tree), excludeTreeRoot);
        expect(result).toEqual(expected);
      }
    );
  });

  describe('migrateTreeState', () => {
    it('should handle empty old tree', () => {
      const tree = convertNestedTree2MappedTree(sampleTree);
      migrateTreeState(new Map(), tree);
      expect(tree).toEqual(convertNestedTree2MappedTree(sampleTree));
    });

    it('should handle empty new tree', () => {
      const tree = new Map();
      migrateTreeState(convertNestedTree2MappedTree(sampleTree), tree);
      expect(tree).toEqual(tree);
    });

    it('should migrate isOpen state', () => {
      const oldTree = new Map([['1', { isOpen: true }]]) as TreeIdNodeMap;
      const newTree = convertNestedTree2MappedTree(sampleTree);

      expect(oldTree.get('1').isOpen).not.toEqual(newTree.get('1').isOpen);

      migrateTreeState(oldTree, newTree);

      expect(newTree.get('1').isOpen).toEqual(newTree.get('1').isOpen);
    });

    it('should update isHidden correctly', () => {
      const oldTree = new Map([['1', { isOpen: true }]]) as TreeIdNodeMap;
      const newTree = convertNestedTree2MappedTree(sampleTree);

      expect(newTree.get('1.1').isHidden).toEqual(true);

      migrateTreeState(oldTree, newTree);

      expect(newTree.get('1.1').isHidden).toEqual(false);
    });
  });
});
