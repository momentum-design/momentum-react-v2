/* eslint-disable @typescript-eslint/ban-types */

import React, { ReactElement, useCallback } from 'react';

import { useMenuSection } from '@react-aria/menu';

import MenuItem from 'components/MenuItem';

import { STYLE } from './MenuSection.constants';
import { Props } from './MenuSection.types';
import './MenuSection.style.scss';

const MenuSection = <T extends object>(props: Props<T>): ReactElement => {
  const { item, state, onAction } = props;

  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: item.rendered,
    'aria-label': item['aria-label'],
  });

  const renderItems = useCallback(() => {
    return Array.from(item.childNodes).map((node) => (
      <MenuItem key={node.key} item={node} state={state} onAction={onAction} />
    ));
  }, [state]);

  return (
    <ul {...itemProps}>
      {!React.isValidElement(item.rendered) && item.rendered ? (
        <span className={STYLE.header} {...headingProps}>
          {item.rendered}
        </span>
      ) : (
        item.rendered && React.cloneElement(item.rendered as ReactElement, { ...headingProps })
      )}
      <ul {...groupProps} className={STYLE.wrapper}>
        {renderItems()}
      </ul>
    </ul>
  );
};

/**
 * @internal
 * The MenuSection component.
 */

export default MenuSection;
