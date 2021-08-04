import React, { useRef, useState, useEffect } from 'react';
import classnames from 'classnames';

import './Avatar.style.scss';
import { PresenceType, Props } from './Avatar.types';
import {
  STYLE,
  DEFAULTS,
  TYPES,
  MAX_INITIALS_PERSON,
  MAX_INITIALS_SPACE,
  AVATAR_PRESENCE_ICON_SIZE_MAPPING,
  AVATAR_ICON_SIZE_MAPPING,
} from './Avatar.constants';
import Icon from '../Icon';
import { getInitials } from './Avatar.utils';

const Avatar: React.FC<Props> = (props: Props) => {
  const {
    className,
    src,
    alt,
    title,
    initials,
    size,
    color,
    presence,
    type = DEFAULTS.TYPE,
    icon,
  } = props;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement>();

  useEffect(() => {
    if (imageRef && imageRef.current && imageRef.current.complete) {
      handleOnLoad();
    }
  }, []);

  useEffect(() => {
    setImageLoadFailed(false);
    setImageLoaded(false);
  }, [src]);

  const renderPresence = (presence: PresenceType) => {
    if (!presence) return;
    if (presence === PresenceType.Default) return;
    let icon: string;
    let fill: string;

    switch (presence) {
      case PresenceType.Active:
        icon = 'unread';
        fill = 'var(--avatar-presence-icon-active)';
        break;
      case PresenceType.Meet:
        icon = 'camera-presence';
        fill = 'var(--avatar-presence-icon-meeting)';
        break;
      case PresenceType.Schedule:
        icon = 'meetings-presence';
        fill = 'var(--avatar-presence-icon-schedule)';
        break;
      case PresenceType.DND:
        icon = 'dnd-presence';
        fill = 'var(--avatar-presence-icon-dnd)';
        break;
      case PresenceType.Presenting:
        icon = 'share-screen';
        fill = 'var(--avatar-presence-icon-presenting)';
        break;
      case PresenceType.QuietHours:
        icon = 'quiet-hours-presence';
        fill = 'var(--avatar-presence-icon-quiet-hours)';
        break;
      case PresenceType.Away:
        icon = 'recents-presence';
        fill = 'var(--avatar-presence-icon-away)';
        break;
      case PresenceType.OOO:
        icon = 'pto-presence';
        fill = 'var(--avatar-presence-icon-ooo)';
        break;
      default:
        break;
    }

    return (
      <div className={STYLE.presenceIconWrapper}>
        <Icon
          name={icon}
          weight="filled"
          fillColor={fill}
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

    return (
      <span>
        {initials
          ? initials
          : title
          ? getInitials(title, type)
          : 'Please provide a title/initials.'}
      </span>
    );
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

  return (
    <div className="md-avatar-outer-wrapper">
      <div
        className={classnames(STYLE.wrapper, className)}
        data-size={size || DEFAULTS.SIZE}
        data-color={color || DEFAULTS.COLOR}
      >
        {/* Renders by default with initials or title. Doesn't render if src or icon provided */}
        {renderInitials()}
        {/* Renders if src is provided. */}
        {renderImage()}
        {/* Renders if icon is provided. */}
        {renderIcon()}
        {/* Renders if presence is provided. */}
        {renderPresence(presence)}
      </div>
    </div>
  );
};

/**
 * Avatar component that can contain an image or initials
 */

export default Avatar;
