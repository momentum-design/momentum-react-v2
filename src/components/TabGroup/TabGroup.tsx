import React, { FC, Children, cloneElement, isValidElement, useRef } from 'react';
import classNames from 'classnames';

import { DEFAULTS, STYLE } from './TabGroup.constants';
import { Props } from './TabGroup.types';
import { handleOnKeyDown } from './TabGroup.utils';

import './TabGroup.style.scss';

const TabGroup: FC<Props> = (props: Props) => {
  const {
    ariaLabel,
    ariaLabelledby,
    ariaDescribedby,
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

  //Handle onKeyDown events and set default attribute for tab child elements
  const tabsChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child as React.ReactElement<any>, {
        onKeyDown: (event: KeyboardEvent) => {
          handleOnKeyDown(event, containerRef, orientation);
        },
        role: 'tab',
      });
    };
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
      aria-orientation={orientation}
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