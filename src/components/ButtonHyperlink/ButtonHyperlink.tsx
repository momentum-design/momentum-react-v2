import React, { forwardRef, useRef, RefObject } from 'react';
import { useButton } from '@react-aria/button';
import FocusRing from '../FocusRing';
import { useLink } from '@react-aria/link';

import { DEFAULTS, STYLE } from './ButtonHyperlink.constants';
import { Props } from './ButtonHyperlink.types';
import './ButtonHyperlink.style.scss';
import classnames from 'classnames';

const ButtonHyperlink = forwardRef((props: Props, providedRef: RefObject<HTMLAnchorElement>) => {
  const { className, title, role = 'button' } = props;
  const internalRef = useRef();
  const ref = providedRef || internalRef;

  const mutatedProps = {
    ...props,
    isDisabled: props.disabled,
    isInverted: props.inverted,
  };

  delete mutatedProps.disabled;
  delete mutatedProps.className;

  let aProps;

  if (role === 'link') {
    const { linkProps } = useLink({ ...mutatedProps, elementType: 'a' }, ref);
    aProps = { ...linkProps };
  } else {
    const { buttonProps } = useButton({ ...mutatedProps, elementType: 'a' }, ref);
    aProps = { ...buttonProps };
  }

  return (
    <FocusRing disabled={props.disabled}>
      <a
        className={classnames(STYLE.wrapper, className)}
        {...aProps}
        ref={ref}
        role={role}
        data-disabled={props.disabled || DEFAULTS.DISABLED}
        data-inverted={props.inverted || DEFAULTS.INVERTED}
        title={title}
      >
        {props.children}
      </a>
    </FocusRing>
  );
});

ButtonHyperlink.displayName = 'ButtonHyperlink';

export default ButtonHyperlink;
