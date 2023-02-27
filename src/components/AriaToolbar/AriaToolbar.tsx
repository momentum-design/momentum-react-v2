import React, { FC, ReactNode, useRef, useState, useEffect } from 'react';
import classnames from 'classnames';

import { STYLE } from './AriaToolbar.constants';
import { Props } from './AriaToolbar.types';
import './AriaToolbar.style.scss';
import { useKeyboard } from '@react-aria/interactions';

/**
 * The AriaToolbar component.
 */
const AriaToolbar: FC<Props> = (props: Props) => {
  const { className, id, style, children, orientation = 'horizontal' } = props;

  const [currentFocus, setCurrentFocus] = useState(0);

  const numChildren = React.Children.count(children);

  const ref = useRef<HTMLDivElement>(null);

  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      switch (e.key) {
        case orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp':
          e.preventDefault();
          setCurrentFocus((numChildren + currentFocus - 1) % numChildren);
          break;

        case orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown':
          e.preventDefault();
          setCurrentFocus((numChildren + currentFocus + 1) % numChildren);
          break;

        default:
          break;
      }
    },
  });

  useEffect(() => {
    (ref.current.children[currentFocus] as HTMLElement).focus();
  }, [currentFocus]);

  return (
    <div ref={ref} className={classnames(className, STYLE.wrapper)} id={id} style={style}>
      {React.Children.map<ReactNode, ReactNode>(children, (child, index) => {
        return React.cloneElement(child as React.ReactElement<any>, {
          tabIndex: index === currentFocus ? 0 : -1,
          ...keyboardProps,
        });
      })}
    </div>
  );
};

export default AriaToolbar;
