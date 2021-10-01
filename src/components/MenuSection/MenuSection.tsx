/* eslint-disable @typescript-eslint/ban-types */

import React, { ReactElement } from 'react';

import { STYLE } from './MenuSection.constants';
import { Props } from './MenuSection.types';
import './MenuSection.style.scss';
import MenuItem from '../MenuItem';
import { useMenuSection } from '@react-aria/menu';
import ContentSeparator from '../ContentSeparator';

const MenuSection = <T extends object>(props: Props<T>): ReactElement => {
  const { item, state, onAction } = props;

  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: item.rendered,
    'aria-label': item['aria-label'],
  });

  return (
    <>
      {item.key !== state.collection.getFirstKey() && <ContentSeparator />}
      <li {...itemProps}>
        {item.rendered && (
          <span {...headingProps} className={STYLE.header}>
            {item.rendered}
          </span>
        )}
        <ul {...groupProps} className={STYLE.wrapper}>
          {Array.from(item.childNodes).map((node) => (
            <MenuItem key={node.key} item={node} state={state} onAction={onAction} />
          ))}
        </ul>
      </li>
    </>
  );
};

/**
 * @internal
 * The MenuSection component.
 */

export default MenuSection;
