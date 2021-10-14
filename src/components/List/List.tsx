import React, { FC, RefObject, useRef, useCallback, useState, useEffect } from 'react';
import classnames from 'classnames';

import { STYLE } from './List.constants';
import { Props } from './List.types';
import './List.style.scss';
import { ListContext } from './List.utils';

const useRoveFocus = (ref: RefObject<HTMLUListElement>, size: number) => {
  const [currentFocus, setCurrentFocus] = useState<number>(0);

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          // Up arrow
          e.preventDefault();
          setCurrentFocus(currentFocus === 0 ? size - 1 : currentFocus - 1);
          break;

        case 'ArrowDown':
        case 'ArrowRight':
          // Down arrow
          e.preventDefault();
          setCurrentFocus(currentFocus === size - 1 ? 0 : currentFocus + 1);
          break;

        default:
          break;
      }
    },
    [size, currentFocus, setCurrentFocus]
  );

  useEffect(() => {
    ref.current.addEventListener('keydown', handleKeyDown, false);
    return () => {
      ref.current.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return { currentFocus, setCurrentFocus };
};

const List: FC<Props> = (props: Props) => {
  const { className, id, style, children, shouldFocusOnPres, listSize } = props;

  const ref = useRef<HTMLUListElement>();

  const { currentFocus } = useRoveFocus(ref, listSize);

  return (
    <ListContext.Provider value={{ currentFocus, shouldFocusOnPres }}>
      <ul className={classnames(className, STYLE.wrapper)} ref={ref} style={style} id={id}>
        {children}
      </ul>
    </ListContext.Provider>
  );
};

export default List;
