import { InferredIconName } from '../Icon/Icon.types';
import { PresenceType } from './Avatar.types';

type ReturnType = {
  presenceIcon?: InferredIconName;
  presenceColor?: string;
  isCircularWrapper?: boolean;
};
export const getPresenceIconColor = (
  presenceType: PresenceType,
  failureBadge: boolean
): ReturnType => {
  let presenceIcon: InferredIconName;
  let presenceColor: string;
  let isCircularWrapper = true;

  //TODO: temporary fix until design gives proper design spec for failure badge
  if (failureBadge) {
    presenceIcon = 'warning';
    presenceColor = 'var(--mds-color-theme-indicator-attention)';
  } else {
    if (!presenceType || presenceType === PresenceType.Default) {
      return {};
    }

    switch (presenceType) {
      case PresenceType.Active:
        presenceIcon = 'unread';
        presenceColor = 'var(--mds-color-theme-indicator-stable)';
        break;
      case PresenceType.Meet:
        presenceIcon = 'camera-presence';
        presenceColor = 'var(--mds-color-theme-indicator-unstable)';
        isCircularWrapper = false;
        break;
      case PresenceType.Schedule:
        presenceIcon = 'meetings-presence';
        presenceColor = 'var(--mds-color-theme-indicator-unstable)';
        isCircularWrapper = false;
        break;
      case PresenceType.Call:
        presenceIcon = 'handset';
        presenceColor = 'var(--mds-color-theme-indicator-unstable)';
        isCircularWrapper = false;
        break;
      case PresenceType.DND:
        presenceIcon = 'dnd-presence';
        presenceColor = 'var(--mds-color-theme-indicator-attention)';
        break;
      case PresenceType.Presenting:
        presenceIcon = 'share-screen';
        presenceColor = 'var(--mds-color-theme-indicator-attention)';
        isCircularWrapper = false;
        break;
      case PresenceType.QuietHours:
        presenceIcon = 'quiet-hours-presence';
        presenceColor = 'var(--mds-color-theme-indicator-locked)';
        break;
      case PresenceType.Away:
        presenceIcon = 'recents-presence';
        presenceColor = 'var(--mds-color-theme-indicator-locked)';
        break;
      case PresenceType.OOO:
        presenceIcon = 'pto-presence';
        presenceColor = 'var(--mds-color-theme-indicator-locked)';
        break;
      case PresenceType.Busy:
        presenceIcon = 'busy-presence';
        presenceColor = 'var(--mds-color-theme-indicator-unstable)';
        break;
      case PresenceType.OnMobile:
        presenceIcon = 'phone';
        presenceColor = 'var(--mds-color-theme-indicator-locked)';
        isCircularWrapper = false;
        break;
      case PresenceType.OnDevice:
        presenceIcon = 'generic-device-video';
        presenceColor = 'var(--mds-color-theme-indicator-locked)';
        isCircularWrapper = false;
        break;
      case PresenceType.OnHold:
        presenceIcon = 'pause';
        presenceColor = 'var(--mds-color-theme-indicator-locked)';
        isCircularWrapper = false;
        break;
      default:
        break;
    }
  }

  return { presenceColor, presenceIcon, isCircularWrapper };
};
