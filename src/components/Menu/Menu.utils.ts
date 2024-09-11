import { PartialNode } from '@react-stately/collections';
import React, { ReactElement } from 'react';
import { SelectionGroupProps } from './Menu.types';

// eslint-disable-next-line @typescript-eslint/ban-types
function SelectionGroup<T extends object>(props: SelectionGroupProps<T>): ReactElement {
  // eslint-disable-line @typescript-eslint/no-unused-vars
  return null;
}

SelectionGroup.__name = 'SelectionGroup';

SelectionGroup.getCollectionNode = function* getCollectionNode<T>(
  props: any
): Generator<PartialNode<T>> {
  const { children, items } = props;
  yield {
    type: 'selectionGroup',
    props,
    hasChildNodes: true,
    *childNodes() {
      if (typeof children === 'function') {
        if (!items) {
          throw new Error('props.children was a function but props.items is missing');
        }

        for (const item of items) {
          yield {
            type: 'item',
            value: item,
            renderer: children,
          };
        }
      } else {
        const items: PartialNode<T>[] = [];
        React.Children.forEach(children, (child) => {
          items.push({
            type: 'item',
            element: child,
          });
        });

        yield* items;
      }
    },
  };
};

// We don't want getCollectionNode to show up in the type definition
// eslint-disable-next-line @typescript-eslint/ban-types
const _SelectionGroup = SelectionGroup as (props: SelectionGroupProps<object>) => JSX.Element;
export { _SelectionGroup as SelectionGroup };
