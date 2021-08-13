import React, { forwardRef, useRef, FC, RefObject } from 'react';
import { useButton } from '@react-aria/button';
import { FocusRing } from '@react-aria/focus';

import { DEFAULTS, STYLE } from './ButtonHyperlink.constants';
import { Props } from './ButtonHyperlink.types';
import './ButtonHyperlink.style.scss';
import classnames from 'classnames';

const ButtonHyperlink: FC<Props> = forwardRef(
  (props: Props, providedRef: RefObject<HTMLButtonElement>) => {
    const { className } = props;
    const ref = providedRef || useRef();
    const mutatedProps = {
      ...props,
      isDisabled: props.disabled,
    };

    delete mutatedProps.disabled;
    delete mutatedProps.className;

    const { buttonProps } = useButton(mutatedProps, ref);

    return (
      <FocusRing focusRingClass={STYLE.focusRing}>
        <button
          className={classnames(STYLE.wrapper, className)}
          {...buttonProps}
          ref={ref}
          data-disabled={props.disabled || DEFAULTS.DISABLED}
        >
          {props.children}
        </button>
      </FocusRing>
    );
  }
);

ButtonHyperlink.displayName = 'ButtonHyperlink';

export default ButtonHyperlink;
