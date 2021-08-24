import React, { Children, forwardRef, FC, RefObject, useRef } from 'react';
import classnames from 'classnames';
import { useButton } from '@react-aria/button';
import FocusRing from '../FocusRing';

import { DEFAULTS, STYLE } from './ButtonCircle.constants';
import { Props } from './ButtonCircle.types';
import './ButtonCircle.style.scss';

/**
 * A circular button designed to consume primarily `<Icon />` children.
 */
const ButtonCircle: FC<Props> = forwardRef(
  (props: Props, providedRef: RefObject<HTMLButtonElement>) => {
    const { children, className, color, disabled, ghost, id, outline, size, style } = props;
    const ref = providedRef || useRef();
    const mutatedProps = {
      ...props,
      isDisbled: props.disabled,
    };

    delete mutatedProps.className;
    delete mutatedProps.disabled;
    delete mutatedProps.id;
    delete mutatedProps.style;

    const { buttonProps } = useButton(mutatedProps, ref);

    const multipleChildren = Children.count(children) > 1;

    return (
      <FocusRing disabled={disabled}>
        <button
          className={classnames(STYLE.wrapper, className)}
          {...buttonProps}
          ref={ref}
          data-color={color || DEFAULTS.COLOR}
          data-ghost={ghost || DEFAULTS.GHOST}
          data-multiple-children={multipleChildren}
          data-outline={outline || DEFAULTS.OUTLINE}
          data-size={size || DEFAULTS.SIZE}
          data-disabled={disabled || DEFAULTS.DISABLED}
          id={id}
          style={style}
        >
          {children}
        </button>
      </FocusRing>
    );
  }
);

ButtonCircle.displayName = 'ButtonCircle';

export default ButtonCircle;
