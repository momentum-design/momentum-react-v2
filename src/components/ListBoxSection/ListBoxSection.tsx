/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactElement, useContext } from 'react';

import './ListBoxSection.style.scss';
import { Props } from './ListBoxSection.types';
import { STYLE } from './ListBoxSection.constants';
import { useListBoxSection } from '@react-aria/listbox';
import { useSeparator } from '@react-aria/separator';
import { ListBoxContext } from '../ListBoxBase/ListBoxBase';
import ListBoxItem from '../ListBoxItem';

const ListBoxSection = <T extends object>(props: Props<T>): ReactElement => {
  const { section } = props;

  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  const { separatorProps } = useSeparator({
    elementType: 'div',
  });

  const state = useContext(ListBoxContext);

  // If the section is not the first, add a separator element.
  // The heading is rendered inside an <li> element, which contains
  // a <ul> with the child items.
  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <div {...separatorProps} className={STYLE.separator} />
      )}
      <li {...itemProps}>
        {section.rendered && (
          <div {...headingProps} className={STYLE.wrapper}>
            {section.rendered}
          </div>
        )}
        <ul {...groupProps} className={STYLE.subItemsWrapper}>
          {[...section.childNodes].map((node) => (
            <ListBoxItem key={node.key} item={node} />
          ))}
        </ul>
      </li>
    </>
  );
};

/**
 * ListBoxSection is used internally to display sectioned items.
 * This component should not be exported as part of the library.
 * @internal
 */

export default ListBoxSection;
