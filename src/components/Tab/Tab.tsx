import React, { FC } from 'react';
import classnames from 'classnames';
import FocusRing from '../FocusRing';

import { DEFAULTS, STYLE } from './Tab.constants';
import { Props } from './Tab.types';
import './Tab.style.scss';
import Text from '../Text';
import ButtonSimple from '../ButtonSimple';

const Tab: FC<Props> = (props: Props) => {
  const { children, className, active, disabled, ...otherProps } = props;

  return (
    <FocusRing disabled={disabled}>
      <ButtonSimple
        className={classnames(STYLE.wrapper, className)}
        {...otherProps}
        data-active={active || DEFAULTS.ACTIVE}
        data-disabled={disabled || DEFAULTS.DISABLED}
      >
        {typeof children === 'string' ? (
          <Text type="subheader-secondary">{children}</Text>
        ) : (
          children
        )}
      </ButtonSimple>
    </FocusRing>
  );
};

Tab.displayName = 'Tab';

export default Tab;
