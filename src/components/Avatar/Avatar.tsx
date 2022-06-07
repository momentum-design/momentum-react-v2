import classnames from 'classnames';
import React, { useRef, useState, useEffect } from 'react';

import './Avatar.style.scss';
import ButtonSimple from 'components/ButtonSimple';
import Icon from 'components/Icon';
import Loading from 'legacy/Loading';

import {
  STYLE,
  DEFAULTS,
  TYPES,
  MAX_INITIALS_PERSON,
  MAX_INITIALS_SPACE,
  AVATAR_PRESENCE_ICON_SIZE_MAPPING,
  AVATAR_ICON_SIZE_MAPPING,
} from './Avatar.constants';
import { PresenceType, Props } from './Avatar.types';
import { getInitials } from './Avatar.utils';

const Avatar: React.FC<Props> = (props: Props) => {
  const {
    className,
    src,
    alt,
    title,
    initials,
    size = DEFAULTS.SIZE,
    color = DEFAULTS.COLOR,
    presence,
    type = DEFAULTS.TYPE,
    hideDefaultTooltip = DEFAULTS.HIDE_DEFAULT_TOOLTIP,
    icon,
    isTyping,
    onPress,
    failureBadge,
    ...rest
  } = props;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement>();

  if (src && icon) {
    console.warn(
      'Avatar: You can only use either an image or an icon inside the Avatar but not both.'
    );
  }

  useEffect(() => {
    if (imageRef && imageRef.current && imageRef.current.complete) {
      handleOnLoad();
    }
  }, []);

  useEffect(() => {
    setImageLoadFailed(false);
    setImageLoaded(false);
  }, [src]);

  const renderPresence = (presenceType: PresenceType) => {
    let presenceIcon: string;
    let presenceColor: string;

    //TODO: temporary fix until design gives proper design spec for failure badge
    if (failureBadge) {
      presenceIcon = 'warning';
      presenceColor = 'var(--avatar-presence-icon-dnd)';
    } else {
      if (!presenceType) return;
      if (presenceType === PresenceType.Default) return;

      switch (presenceType) {
        case PresenceType.Active:
          presenceIcon = 'unread';
          presenceColor = 'var(--avatar-presence-icon-active)';
          break;
        case PresenceType.Meet:
          presenceIcon = 'camera-presence';
          presenceColor = 'var(--avatar-presence-icon-meeting)';
          break;
        case PresenceType.Schedule:
          presenceIcon = 'meetings-presence';
          presenceColor = 'var(--avatar-presence-icon-schedule)';
          break;
        case PresenceType.DND:
          presenceIcon = 'dnd-presence';
          presenceColor = 'var(--avatar-presence-icon-dnd)';
          break;
        case PresenceType.Presenting:
          presenceIcon = 'share-screen';
          presenceColor = 'var(--avatar-presence-icon-presenting)';
          break;
        case PresenceType.QuietHours:
          presenceIcon = 'quiet-hours-presence';
          presenceColor = 'var(--avatar-presence-icon-quiet-hours)';
          break;
        case PresenceType.Away:
          presenceIcon = 'recents-presence';
          presenceColor = 'var(--avatar-presence-icon-away)';
          break;
        case PresenceType.OOO:
          presenceIcon = 'pto-presence';
          presenceColor = 'var(--avatar-presence-icon-ooo)';
          break;
        default:
          break;
      }
    }

    return (
      <div className={STYLE.presenceIconWrapper}>
        <Icon
          name={presenceIcon}
          weight="filled"
          fillColor={presenceColor}
          strokeColor="none"
          scale={AVATAR_PRESENCE_ICON_SIZE_MAPPING[size]}
        />
      </div>
    );
  };

  const renderInitials = () => {
    if (src) {
      if (!imageLoadFailed && imageLoaded) {
        return null;
      }
    }

    if (icon) {
      return null;
    }

    // Error handling for initials length
    if (initials) {
      type === TYPES.person &&
        initials.length > MAX_INITIALS_PERSON &&
        console.warn(
          `Avatar with type person should not have more than ${MAX_INITIALS_PERSON} initials.`
        );

      type === TYPES.space &&
        initials.length > MAX_INITIALS_SPACE &&
        console.warn(
          `Avatar with type space should not have more than ${MAX_INITIALS_SPACE} initials.`
        );
    }

    return <span>{initials ? initials : title ? getInitials(title, type) : ''}</span>;
  };

  const renderIcon = () => {
    if (icon) {
      return (
        <Icon
          className={STYLE.iconWrapper}
          name={icon}
          scale={AVATAR_ICON_SIZE_MAPPING[size].scale}
          weight={AVATAR_ICON_SIZE_MAPPING[size].weight}
        />
      );
    }
  };

  const renderImage = () => {
    if (src && !imageLoadFailed) {
      return (
        <img
          src={src}
          alt={alt}
          onLoad={handleOnLoad}
          onError={handleOnError}
          ref={imageRef}
          className={!imageLoaded ? STYLE.imageHidden : ''}
        />
      );
    }
    return null;
  };

  const handleOnLoad = () => {
    setImageLoaded(true);
  };

  const handleOnError = () => {
    setImageLoadFailed(true);
  };

  //TODO: Temporary fix for typing animation. This should be re-implemented
  const renderTypingAnimation = () => {
    return (
      <span className={STYLE.animationWrapper}>
        <div style={{ transform: 'scale(0.4)' }}>
          <Loading />
        </div>
      </span>
    );
  };

  const content = (
    <div
      className={classnames(STYLE.wrapper, className)}
      data-size={size}
      data-color={color}
      title={!hideDefaultTooltip ? title : ''}
      {...(!onPress && { ...rest })}
    >
      {/*
        Renders by default with initials or title.
        Doesn't render if src has loaded successfully or icon is provided.
        It also renders if src has failed to load.
      */}
      {isTyping && renderTypingAnimation()}
      {renderInitials()}
      {/* Renders if src is provided. */}
      {renderImage()}
      {/* Renders if icon is provided. */}
      {renderIcon()}
      {/* Renders if presence is provided. */}
      {renderPresence(presence)}
    </div>
  );

  if (onPress) {
    return (
      <ButtonSimple aria-label={title} className={STYLE.buttonWrapper} onPress={onPress} {...rest}>
        {content}
      </ButtonSimple>
    );
  } else return content;
};

/**
 * Avatar component that can contain an image or initials
 */

export default Avatar;
