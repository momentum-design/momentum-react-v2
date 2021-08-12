import React, { FC, RefObject, forwardRef } from 'react';
import classnames from 'classnames';

import './MenuListBox.style.scss';
import { Props } from './MenuListBox.types';
import { DEFAULTS, STYLE } from './MenuListBox.constants';

const MenuListBox = (props: Props, ref: RefObject<HTMLUListElement>) => {
  const { className, children, direction, ...rest } = props;

  // Implementation goes here
  return (
    <ul
      {...rest}
      data-direction={direction}
      ref={ref}
      className={classnames(className, STYLE.wrapper)}
    >
      {children}
    </ul>
  );
};

/**
 * TODO: Add description of component here.
 */

const _MenuListBox = forwardRef(MenuListBox);
_MenuListBox.displayName = 'MenuListBox';

export default _MenuListBox;
