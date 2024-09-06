import React, { FC, Children, cloneElement,isValidElement,useRef } from 'react';
import classNames from 'classnames';

import { DEFAULTS, STYLE } from './TabGroup.constants';
import { Props } from './TabGroup.types';
import { handleTabOnKeyDown,handleOnPress } from './TabGroup.utils';

import './TabGroup.style.scss';

const TabGroup: FC<Props> = (props: Props) => {
  const {
    ariaLabel,
    ariaLabelledby,
    ariaDescribedby,
    ariaDetails,
    children,
    className,
    id,
    role,
    style,
    orientation,
    spaced,
    ...rest
  } = props;

  const containerRef = useRef(null);

  //Handle onKeyDown and onPress events for tab child elements
  const tabsChildren =  Children.map(children, (child) => {
    if (isValidElement(child)) {
      const existingOnKeyDown = child.props.onKeyDown;
      const existingOnPress = child.props.onPress;
      return cloneElement(child as React.ReactElement<any>, {
        onKeyDown: (event:KeyboardEvent) => {
          handleTabOnKeyDown(event, containerRef);
          if (existingOnKeyDown) {
            existingOnKeyDown(event);
          }
        },
        onPress: (event:KeyboardEvent) => {
          if (existingOnPress) {
            existingOnPress(event);
          }else{
            handleOnPress(event, containerRef);
          }
        },
        role:'tab',
      });
    }
    return child;
  });

  return (
    <div
      ref={containerRef}
      id={id}
      style={style}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-details={ariaDetails}
      className={classNames(STYLE.wrapper, className)}
      data-orientation={orientation || DEFAULTS.ORIENTATION}
      data-spaced={spaced || DEFAULTS.SPACED}
      role={role || DEFAULTS.ROLE}
      {...rest}
    >
      {tabsChildren}
    </div>
  );
};

export default TabGroup;