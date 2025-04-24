import React, { forwardRef } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './Tab.constants';
import { Props } from './Tab.types';
import './Tab.style.scss';
import ButtonSimple from '../ButtonSimple';
import { PrimitiveConverter } from '../../utils/component-conversions';

const Tab = forwardRef<HTMLButtonElement, Props>((props: Props, ref) => {
  const { children, className, active, disabled, shallowDisabled, ...otherProps } = props;

  return (
    <ButtonSimple
      ref={ref}
      className={classnames(STYLE.wrapper, className)}
      {...otherProps}
      data-active={(!disabled && active) || DEFAULTS.ACTIVE}
      data-disabled={disabled || DEFAULTS.DISABLED}
      data-shallow-disabled={shallowDisabled || DEFAULTS.SHALLOW_DISABLED}
      isDisabled={disabled}
    >
      {typeof children === 'string' ? (
        <PrimitiveConverter tagName="span" fontStyle="subheader-secondary">
          {children}
        </PrimitiveConverter>
      ) : (
        children
      )}
    </ButtonSimple>
  );
});

Tab.displayName = 'Tab';

export default Tab;
