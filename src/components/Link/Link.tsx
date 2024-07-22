import React, { forwardRef, useRef, RefObject } from 'react';
import FocusRing from '../FocusRing';
import { useLink } from '@react-aria/link';
import { DEFAULTS, STYLE } from './Link.constants';
import { Props } from './Link.types';
import './Link.style.scss';
import classnames from 'classnames';
import Icon from '../Icon';
import Tooltip from '../Tooltip';

const Link = forwardRef((props: Props, providedRef: RefObject<HTMLAnchorElement>) => {
  const { className, title, hasIcon, iconProps, opensNewTabIndicatorLabel, ...otherProps } = props;
  const internalRef = useRef();
  const ref = providedRef || internalRef;

  const mutatedProps = {
    ...otherProps,
    title,
    isDisabled: props.disabled,
    isInverted: props.inverted,
  };

  delete mutatedProps.disabled;

  const { linkProps } = useLink({ ...mutatedProps, elementType: 'a' }, ref);

  return (
    <FocusRing disabled={props.disabled}>
      <>
        {opensNewTabIndicatorLabel && (
          <Tooltip
            type="description"
            placement='bottom'
            triggerComponent={
              <a
                className={classnames(STYLE.wrapper, className)}
                {...linkProps}
                ref={ref}
                data-disabled={props.disabled || DEFAULTS.DISABLED}
                data-inverted={props.inverted || DEFAULTS.INVERTED}
                title={title}
              >
                <div className={STYLE.container}>
                  {props.children}
                  {hasIcon && (
                    <Icon
                      className={STYLE.icon}
                      scale={16}
                      name="pop-out"
                      {...iconProps}
                    />
                  )}
                </div>
              </a>
            }
          >
            {opensNewTabIndicatorLabel}
          </Tooltip>
        )}
        {!opensNewTabIndicatorLabel && (
          <a
            className={classnames(STYLE.wrapper, className)}
            {...linkProps}
            ref={ref}
            data-disabled={props.disabled || DEFAULTS.DISABLED}
            data-inverted={props.inverted || DEFAULTS.INVERTED}
            title={title}
            tabIndex={0}
          >
            {props.children}
          </a>
        )}
      </>
    </FocusRing>
  );
});

Link.displayName = 'Link';

export default Link;
