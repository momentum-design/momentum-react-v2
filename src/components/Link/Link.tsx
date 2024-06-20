import React, { forwardRef, useRef, RefObject } from 'react';
import FocusRing from '../FocusRing';
import { useLink } from '@react-aria/link';
import { DEFAULTS, STYLE } from './Link.constants';
import { Props } from './Link.types';
import './Link.style.scss';
import classnames from 'classnames';
import Icon from '../Icon';

const Link = forwardRef((props: Props, providedRef: RefObject<HTMLAnchorElement>) => {
  const { className, title, isWithIcon, iconProps, ...restProps } = props;
  const internalRef = useRef();
  const ref = providedRef || internalRef;

  const mutatedProps = {
    ...restProps,
    title,
    isDisabled: props.disabled,
    isInverted: props.inverted,
  };

  delete mutatedProps.disabled;

  const { linkProps } = useLink({ ...mutatedProps, elementType: 'a' }, ref);

  return (
    <FocusRing disabled={props.disabled}>
      <div className={STYLE.container}>
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
        {isWithIcon && <Icon className={STYLE.icon} scale={16} name="pop-out" {...iconProps} />}
      </div>
    </FocusRing>
  );
});

Link.displayName = 'Link';

export default Link;
