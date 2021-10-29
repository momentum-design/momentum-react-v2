import React, { Children, forwardRef, RefObject } from 'react';
import classnames from 'classnames';
import ButtonSimple from '../ButtonSimple';

import { DEFAULTS, STYLE } from './ButtonCircle.constants';
import { Props } from './ButtonCircle.types';
import './ButtonCircle.style.scss';

const ButtonCircle = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const { children, className, color, disabled, ghost, id, outline, size, style, title } = props;

  const mutatedProps = {
    ...props,
    isDisabled: disabled,
  };

  delete mutatedProps.className;
  delete mutatedProps.disabled;
  delete mutatedProps.id;
  delete mutatedProps.style;

  const multipleChildren = Children.count(children) > 1;

  return (
    <ButtonSimple
      className={classnames(STYLE.wrapper, className)}
      {...mutatedProps}
      ref={providedRef}
      data-color={color || DEFAULTS.COLOR}
      data-ghost={ghost || DEFAULTS.GHOST}
      data-multiple-children={multipleChildren}
      data-outline={outline || DEFAULTS.OUTLINE}
      data-size={size || DEFAULTS.SIZE}
      data-disabled={disabled || DEFAULTS.DISABLED}
      id={id}
      style={style}
      title={title}
    >
      {children}
    </ButtonSimple>
  );
});

ButtonCircle.displayName = 'ButtonCircle';

export default ButtonCircle;
