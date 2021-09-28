/* eslint-disable @typescript-eslint/ban-types */

import React, { FC, ReactElement } from 'react';
import classnames from 'classnames';

import { STYLE } from './MenuSection.constants';
import { Props } from './MenuSection.types';
import './MenuSection.style.scss';
import MenuItem from '../MenuItem';
import { useMenuSection } from '@react-aria/menu';
import { useSeparator } from '@react-aria/separator';

// TODO: Update JSDOC for this component.
/**
 * The MenuSection component.
 */
const MenuSection = <T extends object>(props: Props<T>): ReactElement => {
  const { className, id, style, item, state, onAction } = props;

  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: item.rendered,
    'aria-label': item['aria-label'],
  });

  const { separatorProps } = useSeparator({
    elementType: 'li',
  });

  // If the section is not the first, add a separator element.
  // The heading is rendered inside an <li> element, which contains
  // a <ul> with the child items.
  return (
    <>
      {item.key !== state.collection.getFirstKey() && (
        <li {...separatorProps} className={STYLE.separator} />
      )}
      <li {...itemProps}>
        {item.rendered && (
          <span {...headingProps} className={STYLE.header}>
            {item.rendered}
          </span>
        )}
        <ul {...groupProps} className={classnames(className, STYLE.wrapper)} id={id} style={style}>
          {[...item.childNodes].map((node) => (
            <MenuItem key={node.key} item={node} state={state} onAction={onAction} />
          ))}
        </ul>
      </li>
    </>
  );
};

export default MenuSection;
