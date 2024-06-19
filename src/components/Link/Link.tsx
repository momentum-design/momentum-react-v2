import React, { forwardRef, useRef, RefObject } from 'react';
import FocusRing from '../FocusRing';
import { useLink } from '@react-aria/link';
import { DEFAULTS, STYLE } from './Link.constants';
import { Props } from './Link.types';
import './Link.style.scss';
import classnames from 'classnames';

const Link = forwardRef((props: Props, providedRef: RefObject<HTMLAnchorElement>) => {
  const { className, title } = props;
  const internalRef = useRef();
  const ref = providedRef || internalRef;

  const mutatedProps = {
    ...props,
    isDisabled: props.disabled,
    isInverted: props.inverted,
  };

  delete mutatedProps.disabled;
  delete mutatedProps.className;

  const { linkProps } = useLink({ ...mutatedProps, elementType: 'a' }, ref);

  return (
    <FocusRing disabled={props.disabled}>
      <a
        className={classnames(STYLE.wrapper, className)}
        {...linkProps}
        ref={ref}
        data-disabled={props.disabled || DEFAULTS.DISABLED}
        data-inverted={props.inverted || DEFAULTS.INVERTED}
        title={title}
      >
        {props.children}
      </a>
    </FocusRing>
  );
});

Link.displayName = 'Link';

export default Link;
