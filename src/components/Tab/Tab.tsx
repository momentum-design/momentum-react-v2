import React, { forwardRef, useRef, FC, RefObject } from 'react';
import classnames from 'classnames';
import { useButton } from '@react-aria/button';
import FocusRing from '../FocusRing';

import { DEFAULTS, STYLE } from './Tab.constants';
import { Props } from './Tab.types';
import './Tab.style.scss';
import Text from '../Text';

const Tab: FC<Props> = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const { children, className, id, style, active, disabled, open } = props;
  const ref = providedRef || useRef();
  const mutatedProps = {
    ...props,
    isDisabled: props.disabled,
  };

  delete mutatedProps.className;
  delete mutatedProps.disabled;
  delete mutatedProps.id;
  delete mutatedProps.style;

  const { buttonProps } = useButton(mutatedProps, ref);

  return (
    <FocusRing disabled={disabled}>
      <button
        className={classnames(STYLE.wrapper, className)}
        {...buttonProps}
        data-active={active || DEFAULTS.ACTIVE}
        data-disabled={disabled || DEFAULTS.DISABLED}
        data-open={open || DEFAULTS.OPEN}
        ref={ref}
        id={id}
        style={style}
      >
        {typeof children === 'string' ? <Text type="subheader-secondary">children</Text> : children}
      </button>
    </FocusRing>
  );
});

Tab.displayName = 'Tab';

export default Tab;
