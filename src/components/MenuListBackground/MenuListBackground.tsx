import React, { RefObject, forwardRef } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './MenuListBackground.constants';
import { Props } from './MenuListBackground.types';
import './MenuListBackground.style.scss';
import FocusRing from '../FocusRing';

/**
 * Menu List Background used in Menu Lists and Select dropdown
 * @deprecated, use ModalContainer instead
 */

//TODO: Implement Notch

const MenuListBackground = (props: Props, ref: RefObject<HTMLUListElement>) => {
  const { className, children, color = DEFAULTS.COLOR, ...rest } = props;

  return (
    <FocusRing>
      <ul {...rest} ref={ref} data-color={color} className={classnames(className, STYLE.wrapper)}>
        {children}
      </ul>
    </FocusRing>
  );
};

const _MenuListBackground = forwardRef(MenuListBackground);
_MenuListBackground.displayName = 'MenuListBackground';

export default _MenuListBackground;
