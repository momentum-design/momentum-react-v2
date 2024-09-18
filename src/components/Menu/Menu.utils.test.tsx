import React from 'react';
import { SelectionGroup } from './Menu.utils';
import { Item , Section, PartialNode } from '@react-stately/collections';
import {  SelectionMode } from '@react-types/shared';
import { SelectionGroupProps } from './Menu.types';

jest.mock('@react-stately/collections', () => ({
  Section: {
    getCollectionNode: jest.fn(),
  },
}));

const defaultProps = {
  children: [<Item key="one">One</Item>, <Item key="two">Two</Item>],
  'aria-label': 'Menu component',
  selectionMode: 'single' as Exclude<SelectionMode, 'none'>
};

describe('SelectionGroup', () => {
    it('returns null', () => {
        const result = SelectionGroup(defaultProps);
        expect(result).toBeNull();
    });

    it('should have a __name property set to "SelectionGroup"', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(SelectionGroup.__name).toBe('SelectionGroup');
    });

    it('getCollectionNode should yield nodes with selectionGroup prop set to true', () => {
      const mockNodes: PartialNode<unknown>[] = [
        { key: 'one', value: 'One' },
        { key: 'two', value: 'Two' },
      ];
  
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (Section.getCollectionNode as jest.Mock).mockImplementation(function* () {
        for (const node of mockNodes) {
          yield node;
        }
      });
  
      const selectionGroupProps: SelectionGroupProps<unknown> = {...defaultProps};
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const generator = SelectionGroup.getCollectionNode(selectionGroupProps);
  
      const resultNodes: PartialNode<unknown>[] = [];
      for (const node of generator) {
        resultNodes.push(node);
      }
  
      expect(resultNodes).toHaveLength(mockNodes.length);
      resultNodes.forEach((node, index) => {
        expect(node).toEqual({
          ...mockNodes[index],
          props: { ...selectionGroupProps, selectionGroup: true },
        });
      });
    });

  });