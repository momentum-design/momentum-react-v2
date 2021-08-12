/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactElement, useContext } from 'react';
import classnames from 'classnames';

import './ListBoxSection.style.scss';
import { Props } from './ListBoxSection.types';
import { DEFAULTS, STYLE } from './ListBoxSection.constants';
import { useListBoxSection, useSeparator } from 'react-aria';
import { ListBoxContext } from '../ListBoxBase/ListBoxBase';

const ListBoxSection = <T extends object>(props: Props<T>): ReactElement => {
  const { className, section } = props;

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
      {section.rendered && (
        <div {...headingProps} className={STYLE.wrapper}>
          {section.rendered}
        </div>
      )}
    </>
  );
};

/**
 * TODO: Add description of component here.
 */

export default ListBoxSection;
