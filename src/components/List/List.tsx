import React, { FC, RefObject, useRef, useCallback, useState, useEffect } from 'react';
import classnames from 'classnames';

import { STYLE } from './List.constants';
import { Props } from './List.types';
import './List.style.scss';
import { ListContext } from './List.utils';
import { useKeyboard } from '@react-aria/interactions';

const List: FC<Props> = (props: Props) => {
  const [currentFocus, setCurrentFocus] = useState<number>(0);

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

  const { className, id, style, children, shouldFocusOnPress, listSize, shouldItemFocusBeInset } =
    props;

  const ref = useRef<HTMLUListElement>();

  return (
    <ListContext.Provider value={{ currentFocus, shouldFocusOnPress, shouldItemFocusBeInset }}>
      <ul
        className={classnames(className, STYLE.wrapper)}
        ref={ref}
        style={style}
        id={id}
        {...keyboardProps}
      >
        {children}
      </ul>
    </ListContext.Provider>
  );
};

export default List;
