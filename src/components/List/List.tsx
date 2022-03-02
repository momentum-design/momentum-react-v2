import React, { FC, ReactNode, useEffect, useRef, useState, useCallback } from 'react';
import classnames from 'classnames';

import { STYLE } from './List.constants';
import { Props } from './List.types';
import './List.style.scss';
import { ListContext } from './List.utils';
import { useKeyboard } from '@react-aria/interactions';

const List: FC<Props> = (props: Props) => {
  const [currentFocus, setCurrentFocus] = useState<number>(0);
  const [currentFocusChild, setCurrentFocusChild] = useState<ReactNode>(
    React.Children.toArray(props.children)[currentFocus]
  );

  useEffect(() => {
    const newChildIndex = React.Children.toArray(props.children).indexOf(currentFocusChild);
    setCurrentFocus(newChildIndex);
  }, [props.children]);

  const setContext = useCallback(
    (newFocus) => {
      setCurrentFocus(newFocus);
      setCurrentFocusChild(React.Children.toArray(props.children)[newFocus]);
    },
    [currentFocus, setCurrentFocus]
  );

  const getContext = useCallback(
    () => ({ shouldFocusOnPress, shouldItemFocusBeInset, currentFocus, setContext }),
    [currentFocus, setCurrentFocus]
  );

  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentFocus((listSize + currentFocus - 1) % listSize);
          setCurrentFocusChild((listSize + currentFocus - 1) % listSize);
          break;

        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          setCurrentFocus((listSize + currentFocus + 1) % listSize);
          setCurrentFocusChild((listSize + currentFocus - 1) % listSize);
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
    <ListContext.Provider value={getContext()}>
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
