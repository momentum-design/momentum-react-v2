import React from 'react';
import classnames from 'classnames';

import './Avatar.style.scss';
import { PresenceType, Props } from './Avatar.types';
import { STYLE, DEFAULTS } from './Avatar.constants';

const Avatar: React.FC<Props> = (props: Props) => {
  const { className, src, initials, size, color, presence } = props;

  const renderPresence = (presence: PresenceType) => {
    if (presence === PresenceType.Default) return;
    let icon = 'i';

    switch (presence) {
      case PresenceType.Active:
        icon = 'i';
        break;
      case PresenceType.Meet:
        icon = 'i';
        break;
      case PresenceType.Schedule:
        icon = 'i';
        break;
      case PresenceType.DND:
        icon = 'i';
        break;
      case PresenceType.Presenting:
        icon = 'i';
        break;
      case PresenceType.QuietHours:
        icon = 'i';
        break;
      case PresenceType.Away:
        icon = 'i';
        break;
      case PresenceType.OOO:
        icon = 'i';
        break;
      default:
        break;
    }

    return <div className={STYLE.iconWrapper}>{icon}</div>;
  };

  return (
    <div
      className={classnames(STYLE.wrapper, className)}
      data-size={size || DEFAULTS.SIZE}
      data-color={color || DEFAULTS.COLOR}
    >
      {src && <img src={src} alt="Profile" />}
      {initials && <span>{initials}</span>}
      {presence && renderPresence(presence)}
    </div>
  );
};

/**
 * TODO: Add description of component here.
 */

export default Avatar;
