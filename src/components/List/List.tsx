import React, { RefObject, useImperativeHandle, useRef, forwardRef } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './List.constants';
import { ListRefObject, Props } from './List.types';
import './List.style.scss';
import { ListContext } from './List.utils';
import useOrientationBasedKeyboardNavigation from '../../hooks/useOrientationBasedKeyboardNavigation';
import { mergeProps } from '@react-aria/utils';

const List = forwardRef((props: Props, ref: RefObject<ListRefObject>) => {
  const {
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
    initialFocus = DEFAULTS.INITIAL_FOCUS,
    ...rest
  } = props;

  const { keyboardProps, getContext, focusWithinProps } = useOrientationBasedKeyboardNavigation({
    listSize,
    orientation,
    noLoop,
    initialFocus,
    contextProps: { shouldFocusOnPress, shouldItemFocusBeInset },
  });

  const listRef = useRef<HTMLUListElement>();

  // Expose imperative methods
  useImperativeHandle(ref, () => ({
    listRef,
    focusOnIndex: (index: number) => getContext()?.setCurrentFocus(index),
    getCurrentFocusIndex: () => getContext()?.currentFocus,
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
