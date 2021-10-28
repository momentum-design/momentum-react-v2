import React, { forwardRef, useRef, FC, RefObject } from 'react';
import classnames from 'classnames';
import { useButton } from '@react-aria/button';
import FocusRing from '../FocusRing';

import { DEFAULTS, STYLE } from './ButtonPill.constants';
import { Props } from './ButtonPill.types';
import './ButtonPill.style.scss';

const ButtonPill: FC<Props> = forwardRef(
  (props: Props, providedRef: RefObject<HTMLButtonElement>) => {
    const { children, className, color, disabled, ghost, id, outline, size, style, title } = props;
    const internalRef = useRef();
    const ref = providedRef || internalRef;

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
          ref={ref}
          data-color={color || DEFAULTS.COLOR}
          data-ghost={ghost || DEFAULTS.GHOST}
          data-outline={outline || DEFAULTS.OUTLINE}
          data-size={size || DEFAULTS.SIZE}
          data-disabled={disabled || DEFAULTS.DISABLED}
          id={id}
          style={style}
          title={title}
        >
          {children}
        </button>
      </FocusRing>
    );
  }
);

ButtonPill.displayName = 'ButtonPill';

export default ButtonPill;
