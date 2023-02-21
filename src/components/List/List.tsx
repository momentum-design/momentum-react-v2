import React, { FC, useRef, useState, useCallback } from 'react';
import classnames from 'classnames';

import { STYLE } from './List.constants';
import { Props } from './List.types';
import './List.style.scss';
import { ListContext } from './List.utils';
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
    onKeyDown: (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentFocus((listSize + currentFocus - 1) % listSize);
          break;

        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          setCurrentFocus((listSize + currentFocus + 1) % listSize);
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
      >
        {children}
      </ul>
    </ListContext.Provider>
  );
};

export default List;
