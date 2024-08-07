import React, { FC, useRef, useState, useCallback } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './List.constants';
import { Props } from './List.types';
import './List.style.scss';
import { ListContext, setNextFocus } from './List.utils';
import { useKeyboard } from '@react-aria/interactions';

const List: FC<Props> = (props: Props) => {
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
    ...rest
  } = props;

  const [currentFocus, setCurrentFocus] = useState<number>(0);

  const setContext = useCallback(
    (newFocus) => {
      setCurrentFocus(newFocus);
    },
    [currentFocus, setCurrentFocus, listSize]
  );

  const getContext = useCallback(
    () => ({ listSize, shouldFocusOnPress, shouldItemFocusBeInset, currentFocus, setContext }),
    [currentFocus, setCurrentFocus, listSize]
  );

  const { keyboardProps } = useKeyboard({
    onKeyDown: (evt) => {
      const forwardKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
      const backwardKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';

      switch (evt.key) {
        case 'Escape':
          evt.continuePropagation();
          break;
        case backwardKey:
          evt.preventDefault();
          setNextFocus(true, listSize, currentFocus, noLoop, setCurrentFocus);
          break;

        case forwardKey:
          evt.preventDefault();
          setNextFocus(false, listSize, currentFocus, noLoop, setCurrentFocus);
          break;

        default:
          break;
      }
    },
  });

  const ref = useRef<HTMLUListElement>();

  return (
    <ListContext.Provider value={getContext()}>
      <ul
        className={classnames(className, STYLE.wrapper)}
        ref={ref}
        style={style}
        id={id}
        role={role}
        {...keyboardProps}
        {...rest}
      >
        {children}
      </ul>
    </ListContext.Provider>
  );
};

export default List;
