import React, { FC, useRef } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './List.constants';
import { Props } from './List.types';
import './List.style.scss';
import { ListContext } from './List.utils';
import useOrientationBasedKeyboardNavigation from '../../hooks/useOrientationBasedKeyboardNavigation';

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

  const {keyboardProps, getContext} = useOrientationBasedKeyboardNavigation({listSize, orientation, noLoop, contextProps: {shouldFocusOnPress, shouldItemFocusBeInset}});

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
