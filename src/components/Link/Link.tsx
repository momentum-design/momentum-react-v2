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

  const isShowIcon = hasExternalLinkIcon || (hasExternalLinkIcon === undefined && isExternalLink);

  if (isShowIcon && !tooltipContent) {
    console.warn(
      'MRV2: The external link icon is enabled but tooltipContent is not provided for the icon. For accessibility reasons, a tooltip must be provided for external links.'
    );
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

  const content = (
    <a {...commonProps}>
      <div className={STYLE.container}>
        {props.children}
        {isShowIcon && (
          <Icon className={STYLE.icon} scale={16} name="pop-out" {...externalLinkIconProps} />
        )}
      </div>
    </a>
  );

  return (
    <FocusRing disabled={disabled}>
      {tooltipContent ? (
        <Tooltip type="description" placement="bottom" triggerComponent={content}>
          {tooltipContent}
        </Tooltip>
      ) : (
        content
      )}
    </FocusRing>
  );
});

Link.displayName = 'Link';

export default Link;
