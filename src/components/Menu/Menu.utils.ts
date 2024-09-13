/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */
import { PartialNode, Section } from '@react-stately/collections';
import { ReactElement } from 'react';
import { SelectionGroupProps } from './Menu.types';

function SelectionGroup(): ReactElement {
  return null;
}

SelectionGroup.__name = 'SelectionGroup';

SelectionGroup.getCollectionNode = function* getCollectionNode<T>(
  props: SelectionGroupProps<T>
): Generator<PartialNode<T>> {
  // @ts-ignore
  const nodeIterator = Section.getCollectionNode(props);
  let nodeIteratorResult = nodeIterator.next();

  while (!nodeIteratorResult.done) {
    yield { ...nodeIteratorResult.value, props: { ...props, selectionGroup: true } };
    nodeIteratorResult = nodeIterator.next();
  }

  /*
  The following _should_ have worked, but for some reason when transpiled it doesn't work nicely
  */
  // for (const node of Section.getCollectionNode(props)) {
  //   yield { ...node, props: { ...props, selectionGroup: true } };
  // }
};

// We don't want getCollectionNode to show up in the type definition
const _SelectionGroup = SelectionGroup as <T>(props: SelectionGroupProps<T>) => JSX.Element;
export { _SelectionGroup as SelectionGroup };
