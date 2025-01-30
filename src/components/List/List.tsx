import React, { RefObject, useImperativeHandle, useRef, forwardRef, useMemo } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './List.constants';
import { ListRefObject, Props } from './List.types';
import './List.style.scss';
import { ListContext } from './List.utils';
import useOrientationBasedKeyboardNavigation from '../../hooks/useOrientationBasedKeyboardNavigation';
import { mergeProps } from '@react-aria/utils';
import { ListItemBaseIndex } from '../ListItemBase/ListItemBase.types';

const List = forwardRef((props: Props, ref: RefObject<ListRefObject>) => {
  const {
    allItemIndexes,
    className,
    id,
    style,
    children,
    shouldFocusOnPress,
    listSize,
    role,
    shouldItemFocusBeInset,
    noLoop,
    orientation = DEFAULTS.ORIENTATION,
    initialFocus: propInitialFocus = DEFAULTS.INITIAL_FOCUS_NOT_SET,
    ...rest
  } = props;

  let initialFocus = propInitialFocus;

  if (initialFocus === DEFAULTS.INITIAL_FOCUS_NOT_SET) {
    if (allItemIndexes) {
      initialFocus = allItemIndexes[0];
    } else {
      initialFocus = 0;
    }
  }

  const { keyboardProps, getContext, focusWithinProps } = useOrientationBasedKeyboardNavigation({
    listSize,
    allItemIndexes,
    orientation,
    noLoop,
    initialFocus,
    contextProps: { shouldFocusOnPress, shouldItemFocusBeInset },
  });

  const listRef = useRef<HTMLUListElement>();

  // Expose imperative methods
  useImperativeHandle(ref, () => ({
    listRef,
    focusOnIndex: (index: ListItemBaseIndex) => getContext()?.setCurrentFocus(index),
    getCurrentFocusIndex: () => getContext()?.getCurrentFocus(),
  }));

  return (
    <ListContext.Provider value={getContext()}>
      <ul
        className={classnames(className, STYLE.wrapper)}
        ref={listRef}
        style={style}
        id={id}
        role={role}
        {...mergeProps(keyboardProps, focusWithinProps, rest)}
      >
        {children}
      </ul>
    </ListContext.Provider>
  );
});

export default List;
