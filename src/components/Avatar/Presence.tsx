import React, { FC } from 'react';
import Icon from '../Icon';

import { AvatarSize } from './Avatar.types';
import { STYLE, AVATAR_PRESENCE_ICON_SIZE_MAPPING } from './Avatar.constants';
import { InferredIconName } from '../Icon/Icon.types';

interface PresenceProps {
  presenceColor: string;
  presenceIcon: InferredIconName;
  isCircularWrapper: boolean;
  size: AvatarSize;
}

/**
 * The Presence component.
 */
const Presence: FC<PresenceProps> = (props: PresenceProps) => {
  const { presenceColor, presenceIcon, isCircularWrapper, size } = props;

  return (
    <div className={STYLE.presenceIconWrapper} data-shape={isCircularWrapper}>
      <Icon
        name={presenceIcon}
        weight={presenceIcon === 'busy-presence' ? 'bold' : 'filled'}
        fillColor={presenceColor}
        strokeColor="none"
        scale={AVATAR_PRESENCE_ICON_SIZE_MAPPING[size]}
      />
    </div>
  );
};

export default Presence;
