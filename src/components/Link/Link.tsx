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
  const {
    className,
    title,
    hasExternalLinkIcon,
    externalLinkIconProps,
    tooltipContent,
    tooltipType,
    disabled,
    inverted,
    style,
    tabIndex,
    ...otherProps
  } = props;
  const internalRef = useRef();
  const ref = providedRef || internalRef;

  const mutatedProps = {
    ...otherProps,
    title,
    isDisabled: disabled,
    isInverted: inverted,
  };

  // prevent change the window.opener.location to some phishing page
  const isExternalLink = props.target === '_blank';

  const { linkProps } = useLink({ ...mutatedProps, elementType: 'a' }, ref);

  let isShowIcon = false;

  if (hasExternalLinkIcon === undefined && isExternalLink) {
    isShowIcon = true;
  } else if (hasExternalLinkIcon) {
    isShowIcon = true;
  }

  const commonProps = {
    ...linkProps,
    style,
    ref: ref,
    tabIndex,
    title: title,
    rel: isExternalLink ? 'noopener noreferrer' : '',
    className: classnames(STYLE.wrapper, className),
    'data-disabled': disabled || DEFAULTS.DISABLED,
    'data-inverted': inverted || DEFAULTS.INVERTED,
  };

  return (
    <FocusRing disabled={disabled}>
      <>
        {tooltipContent && (
          <Tooltip
            type={tooltipType}
            placement="bottom"
            triggerComponent={
              <a {...commonProps}>
                <div className={STYLE.container}>
                  {props.children}
                  {isShowIcon && (
                    <Icon
                      className={STYLE.icon}
                      scale={16}
                      name="pop-out"
                      {...externalLinkIconProps}
                    />
                  )}
                </div>
              </a>
            }
          >
            {tooltipContent}
          </Tooltip>
        )}
        {!tooltipContent && <a {...commonProps}>{props.children}</a>}
      </>
    </FocusRing>
  );
});

Link.displayName = 'Link';

export default Link;
