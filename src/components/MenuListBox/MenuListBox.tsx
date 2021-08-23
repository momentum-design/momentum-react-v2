import React, { RefObject, forwardRef } from 'react';
import classnames from 'classnames';

import './MenuListBox.style.scss';
import { Props } from './MenuListBox.types';
import { STYLE } from './MenuListBox.constants';

//TODO: Implement notch version, Also probably needs renaming
//TODO: Add elevation / shadow when tokens available

const MenuListBox = (props: Props, ref: RefObject<HTMLUListElement>) => {
  const { className, children, ...rest } = props;

  return (
    <ul {...rest} ref={ref} className={classnames(className, STYLE.wrapper)}>
      {children}
    </ul>
  );
};

/**
 * Menu Background for Select and Menu List
 */

const _MenuListBox = forwardRef(MenuListBox);
_MenuListBox.displayName = 'MenuListBox';

export default _MenuListBox;
