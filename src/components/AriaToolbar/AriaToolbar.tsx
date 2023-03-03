import React, { FC, useRef, useState, useEffect } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './AriaToolbar.constants';
import { Props } from './AriaToolbar.types';
import { useKeyboard } from '@react-aria/interactions';
import { map } from 'lodash';

/**
 * The AriaToolbar component. A style-less component implementing the Aria Toolbar pattern
 * see https://www.w3.org/WAI/ARIA/apg/patterns/toolbar
 */
const AriaToolbar: FC<Props> = (props: Props) => {
  const {
    ariaLabel,
    className,
    id,
    style,
    children,
    orientation = DEFAULTS.ORIENTATION,
    onTabPress,
    ariaControls,
  } = props;

  const [currentFocus, setCurrentFocus] = useState(undefined);

  const validChildren = React.Children.toArray(children);
  const numChildren = validChildren.length;

  const buttonRefs = useRef({});

  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      switch (e.key) {
        case orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp':
          e.preventDefault();
          setCurrentFocus((numChildren + (currentFocus || 0) - 1) % numChildren);
          break;

        case orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown':
          e.preventDefault();
          setCurrentFocus((numChildren + (currentFocus || 0) + 1) % numChildren);
          break;

        case 'Tab': {
          if (onTabPress) {
            onTabPress();
          }
          break;
        }

        default:
          break;
      }
    },
  });

  useEffect(() => {
    setTimeout(() => {
      buttonRefs.current[currentFocus]?.focus();
    });
  }, [currentFocus]);

  return (
    <div
      aria-label={ariaLabel}
      aria-controls={ariaControls}
      role="toolbar"
      className={classnames(className, STYLE.wrapper)}
      id={id}
      style={style}
    >
      {map(validChildren, (child, index) => {
        return React.cloneElement(child, {
          tabIndex: index === (currentFocus || 0) ? 0 : -1,
          ref: (e) => {
            buttonRefs.current[index] = e;
            if (child.ref) {
              child.ref(e);
            }
          },
          onFocus: (e) => {
            setCurrentFocus(index);
            if (child.props.onFocus) {
              child.props.onFocus(e);
            }
          },
          onPress: () => {
            setCurrentFocus(index);
            if (child.props.onPress) {
              child.props.onPress();
            }
          },
          ...keyboardProps,
        });
      })}
    </div>
  );
};

export default AriaToolbar;
