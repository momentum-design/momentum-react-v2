/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactElement, useContext } from 'react';

import './ListBoxSection.style.scss';
import { Props } from './ListBoxSection.types';
import { STYLE } from './ListBoxSection.constants';
import { useListBoxSection } from '@react-aria/listbox';
import { ListBoxContext } from '../ListBoxBase/ListBoxBase';
import ListBoxItem from '../ListBoxItem';
import ContentSeparator from '../ContentSeparator';

const ListBoxSection = <T extends object>(props: Props<T>): ReactElement => {
  const { section } = props;

  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  const state = useContext(ListBoxContext);

  return (
    <>
      {section.key !== state.collection.getFirstKey() && <ContentSeparator />}
      <li {...itemProps}>
        {section.rendered && (
          <div {...headingProps} className={STYLE.wrapper}>
            {section.rendered}
          </div>
        )}
        <ul {...groupProps} className={STYLE.subItemsWrapper}>
          {Array.from(section.childNodes).map((node) => (
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
