import React, { FC, useContext } from 'react';
import classnames from 'classnames';

import './ListBoxSection.style.scss';
import { Props } from './ListBoxSection.types';
import { DEFAULTS, STYLE } from './ListBoxSection.constants';
import { useListBoxSection, useSeparator } from 'react-aria';
import { ListBoxContext } from '../ListBox/ListBox';
import ListBoxItem from '../ListBoxItem';

const ListBoxSection: FC<Props<unknown>> = <T extends unknown>(props: Props<T>) => {
  const { className, section } = props;

  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  const { separatorProps } = useSeparator({
    elementType: 'li',
  });

  const state = useContext(ListBoxContext);

  // If the section is not the first, add a separator element.
  // The heading is rendered inside an <li> element, which contains
  // a <ul> with the child items.
  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <li
          {...separatorProps}
          style={{
            borderTop: '1px solid gray',
            margin: '2px 5px',
          }}
        />
      )}
      <li {...itemProps}>
        {section.rendered && (
          <span {...headingProps} className={STYLE.wrapper}>
            {section.rendered}
          </span>
        )}
        <ul
          {...groupProps}
          style={{
            padding: 0,
            listStyle: 'none',
          }}
        >
          {[...section.childNodes].map((node) => (
            <ListBoxItem key={node.key} item={node} />
          ))}
        </ul>
      </li>
    </>
  );
};

/**
 * TODO: Add description of component here.
 */

export default ListBoxSection;
