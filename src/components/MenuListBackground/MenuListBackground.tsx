import React, { RefObject, forwardRef } from 'react';
import classnames from 'classnames';

import { STYLE } from './MenuListBackground.constants';
import { Props } from './MenuListBackground.types';
import './MenuListBackground.style.scss';

/**
 * Menu List Background used in Menu Lists and Select dropdown
 */
const MenuListBackground = (props: Props, ref: RefObject<HTMLUListElement>) => {
  const { className, children, ...rest } = props;

  return (
    <ul {...rest} ref={ref} className={classnames(className, STYLE.wrapper)}>
      {children}
    </ul>
  );
};

const _MenuListBackground = forwardRef(MenuListBackground);
_MenuListBackground.displayName = 'MenuListBackground';

export default _MenuListBackground;
