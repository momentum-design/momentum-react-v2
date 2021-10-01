import React, { FC } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './Tab.constants';
import { Props } from './Tab.types';
import './Tab.style.scss';
import ButtonSimple from '../ButtonSimple';
import { PrimitiveConverter } from '../../utils/component-conversions';

const Tab: FC<Props> = (props: Props) => {
  const { children, className, active, disabled, ...otherProps } = props;

  return (
    <ButtonSimple
      className={classnames(STYLE.wrapper, className)}
      {...otherProps}
      data-active={(!disabled && active) || DEFAULTS.ACTIVE}
      data-disabled={disabled || DEFAULTS.DISABLED}
    >
      {typeof children === 'string' ? (
        <PrimitiveConverter fontStyle="subheader-secondary">{children}</PrimitiveConverter>
      ) : (
        children
      )}
    </ButtonSimple>
  );
};

Tab.displayName = 'Tab';

export default Tab;
