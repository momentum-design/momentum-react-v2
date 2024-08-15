import React, { RefObject, forwardRef } from 'react';
import classnames from 'classnames';

import './Avatar.style.scss';
import type { Props } from './Avatar.types';
import { STYLE, DEFAULTS, AVATAR_ICON_SIZE_MAPPING } from './Avatar.constants';
import Icon from '../Icon';
import ButtonSimple from '../ButtonSimple';
import Loading from '../../legacy/Loading';
import Presence from './Presence';
import Initials from './Initials';
import { getInitials } from './Avatar.utils';
import { getPresenceIconColor } from './Presence.utils';
import { useAvatarImage } from './Avatar.hooks';

const Avatar = (props: Props, ref: RefObject<HTMLButtonElement>) => {
  const {
    className,
    src,
    title,
    initials,
    size = DEFAULTS.SIZE,
    color = DEFAULTS.COLOR,
    presence,
    type = DEFAULTS.TYPE,
    icon,
    iconOnHover,
    isTyping,
    onPress,
    failureBadge,
    mainLabel = DEFAULTS.LABEL,
    presenceLabel = DEFAULTS.LABEL,
    typingLabel = DEFAULTS.LABEL,
    extraLabel = DEFAULTS.LABEL,
    ...rest
  } = props;
  const initialsText = initials ? initials : title ? getInitials(title, type) : undefined;
  const { presenceColor, presenceIcon, isCircularWrapper } = getPresenceIconColor(
    presence,
    failureBadge
  );
  const { imageLoaded, handleOnLoad, handleOnError } = useAvatarImage(src);

  if (src && icon) {
    console.warn(
      'Avatar: You can only use either an image or an icon inside the Avatar but not both.'
    );
  }

  const avatarLabels = [];

  if (mainLabel) {
    avatarLabels.push(mainLabel);
  }

  if (presence && presenceLabel) {
    avatarLabels.push(presenceLabel);
  }

  if (isTyping && typingLabel) {
    avatarLabels.push(typingLabel);
  }

  if (extraLabel) {
    avatarLabels.push(extraLabel);
  }

  const containerAriaLabel = rest['aria-label'] || avatarLabels.join(', ');
  delete rest['aria-label'];

  const content = (
    <div
      className={classnames(STYLE.wrapper, className)}
      data-size={size}
      data-color={color}
      aria-label={onPress ? undefined : containerAriaLabel}
      role={onPress ? undefined : 'img'}
      aria-hidden={onPress ? 'true' : 'false'}
      {...(!onPress && { ...rest })}
    >
      {!imageLoaded && !icon && initialsText && (
        <Initials initials={initialsText} type={type} className={STYLE.wrapperChildren} />
      )}

      {src && (
        <img
          src={src}
          alt=""
          onLoad={handleOnLoad}
          onError={handleOnError}
          className={classnames(STYLE.wrapperChildren, { [STYLE.imageHidden]: !imageLoaded })}
        />
      )}

      {icon && (
        <Icon
          className={classnames(STYLE.wrapperChildren, STYLE.iconWrapper)}
          name={icon}
          scale={AVATAR_ICON_SIZE_MAPPING[size].scale}
          weight={AVATAR_ICON_SIZE_MAPPING[size].weight}
        />
      )}

      {iconOnHover && (
        <div className={classnames(STYLE.wrapperChildren, STYLE.iconOnHoverWrapper)}>
          <Icon
            className={classnames(STYLE.wrapperChildren, STYLE.iconWrapper)}
            name={iconOnHover}
            scale={AVATAR_ICON_SIZE_MAPPING[size].scale}
            weight={AVATAR_ICON_SIZE_MAPPING[size].weight}
          />
        </div>
      )}
      {/* //TODO: Temporary fix for typing animation. This should be re-implemented */}
      {isTyping && (
        <span
          className={classnames(STYLE.wrapperChildren, STYLE.animationWrapper)}
          aria-hidden="true"
        >
          <div style={{ transform: 'scale(0.4)' }}>
            <Loading />
          </div>
        </span>
      )}

      {presenceColor && presenceIcon && (
        <Presence
          presenceColor={presenceColor}
          presenceIcon={presenceIcon}
          isCircularWrapper={isCircularWrapper}
          size={size}
        />
      )}
    </div>
  );

  if (onPress) {
    return (
      <ButtonSimple
        aria-label={containerAriaLabel}
        useNativeKeyDown
        ref={ref}
        className={STYLE.buttonWrapper}
        onPress={onPress}
        {...rest}
      >
        {content}
      </ButtonSimple>
    );
  } else return content;
};

/**
 * Avatar component that can contain an image or initials
 */

const _Avatar = forwardRef(Avatar);

_Avatar.displayName = 'Avatar';

export default _Avatar;
