import React, { forwardRef, FC, RefObject, useRef } from 'react';
import classnames from 'classnames';
import { useButton } from '@react-aria/button';
import FocusRing from '../FocusRing';

import { Props } from './ButtonSimple.types';

/**
 * A simple button component without overhead styling. This is used as an injectable button component for other sibling components.
 */
const ButtonSimple: FC<Props> = forwardRef(
  (props: Props, providedRef: RefObject<HTMLButtonElement>) => {
    const { children, className, isDisabled, id, style } = props;
    const internalRef = useRef();
    const ref = providedRef || internalRef;

    const mutatedProps = {
      ...props,
    };

    delete mutatedProps.className;
    delete mutatedProps.id;
    delete mutatedProps.style;

    const { buttonProps } = useButton(mutatedProps, ref);

    return (
      <FocusRing disabled={isDisabled}>
        <button className={classnames(className)} id={id} ref={ref} style={style} {...buttonProps}>
          {children}
        </button>
      </FocusRing>
    );
  }
);

ButtonSimple.displayName = 'ButtonSimple';

export default ButtonSimple;
