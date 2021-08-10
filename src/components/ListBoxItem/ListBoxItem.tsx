import React, { FC, useContext } from 'react';
import classnames from 'classnames';

import './ListBoxItem.style.scss';
import { Props } from './ListBoxItem.types';
import { DEFAULTS, STYLE } from './ListBoxItem.constants';
import { ListBoxContext } from '../ListBox/ListBox';
import { mergeProps, useOption } from 'react-aria';
import Icon from '../Icon';

const ListBoxItem: FC<Props<unknown>> = <T extends unknown>(props: Props<T>) => {
  const { item } = props;
  // Get props for the option element
  const ref = React.useRef(null);
  const state = useContext(ListBoxContext);

  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.isSelected(item.key);
  const { optionProps } = useOption(
    {
      key: item.key,
      isDisabled,
      isSelected,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
    },
    state,
    ref
  );

  return (
    <li {...mergeProps(optionProps)} ref={ref} className={classnames(STYLE.wrapper)}>
      <div className={STYLE.contentsWrapper}>{item.rendered}</div>
      {isSelected && <Icon className={STYLE.tickIcon} name="check" weight="bold" scale={16} />}
    </li>
  );
};

/**
 * TODO: Add description of component here.
 */

export default ListBoxItem;
