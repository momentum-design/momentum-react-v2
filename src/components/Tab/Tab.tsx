import classnames from 'classnames';
import React, { FC } from 'react';

import ButtonSimple from 'components/ButtonSimple';
import { PrimitiveConverter } from 'utils/component-conversions';

import { DEFAULTS, STYLE } from './Tab.constants';
import './Tab.style.scss';

import type { Props } from './Tab.types';

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
