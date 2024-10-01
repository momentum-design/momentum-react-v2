/* eslint-disable @typescript-eslint/ban-types */

import React, { ReactElement, useCallback } from 'react';

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

  const renderItems = useCallback(() => {
    return Array.from(item.childNodes).map((node) => {
      if (node.props?._isSeparator) {
        const props = { ...node.props };
        delete props._isSeparator;

        return <ContentSeparator {...props} />;
      }
      return <MenuItem key={node.key} item={node} state={state} onAction={onAction} />;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div {...itemProps}>
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
    </div>
  );
};

/**
 * @internal
 * The MenuSection component.
 */

export default MenuSection;
