import classnames from 'classnames';
import React, { FC } from 'react';

import { useHover } from '@react-aria/interactions';

import Avatar from 'components/Avatar';
import ButtonCircle from 'components/ButtonCircle';
import Icon, { IconWeight, IconScale } from 'components/Icon';
import ListItemBase from 'components/ListItemBase';
import ListItemBaseSection from 'components/ListItemBaseSection';
import Text from 'components/Text';

import { DEFAULTS, SCHEDULER_STATES, STYLE } from './AvatarMeetingsListItem.constants';
import { AvatarMeetingsListItemActions, Props } from './AvatarMeetingsListItem.types';

import './AvatarMeetingsListItem.style.scss';

/**
 * Avatar Meetings List Item component used in in-meeting experience participants lists.
 */
const AvatarMeetingsListItem: FC<Props> = (props: Props) => {
  const {
    className,
    id,
    style,
    schedulerState = DEFAULTS.SCHEDULER_STATE,
    firstLine,
    secondLine,
    isMuted = DEFAULTS.IS_MUTED,
    displayActions,
    //TODO: moreActionMenu, Once popover component is implemented, add way to customize the menu
    onHoverActionCallback,
    onPressMuteAction,
    avatarProps = DEFAULTS.AVATAR_PROPS,
  } = props;

  const iconProps = { scale: 16 as IconScale, weight: 'bold' as IconWeight, strokeColor: 'none' };

  let displayHoverAction = false;
  let displayMoreAction = false;
  let displayMuteAction = false;

  if (displayActions && Array.isArray(displayActions)) {
    displayHoverAction = displayActions.includes(AvatarMeetingsListItemActions.closeOnHover);
    displayMoreAction = displayActions.includes(AvatarMeetingsListItemActions.more);
    displayMuteAction = displayActions.includes(AvatarMeetingsListItemActions.mute);
  }

  const renderSchedulerIcon = () => {
    switch (schedulerState) {
      case SCHEDULER_STATES.available:
        return (
          <Icon name="scheduler-available" fillColor="var(--label-success-text)" {...iconProps} />
        );

      case SCHEDULER_STATES.unavailable:
        return (
          <Icon name="scheduler-unavailable" fillColor="var(--label-warning-text)" {...iconProps} />
        );

      case SCHEDULER_STATES.unknown:
        return <Icon name="scheduler-unknown" fillColor="var(--label-error-text)" {...iconProps} />;

      case SCHEDULER_STATES.quietHours:
        return (
          <Icon
            name="scheduler-not-working-hours"
            fillColor="var(--label-secondary-text)"
            {...iconProps}
          />
        );
      case SCHEDULER_STATES.none:
        return null;
    }
  };

  const renderText = () => {
    if (secondLine) {
      return (
        <>
          <Text type="body-primary">{firstLine}</Text>
          <Text type="body-secondary">{secondLine}</Text>
        </>
      );
    } else {
      return <Text type="body-primary">{firstLine}</Text>;
    }
  };

  const { hoverProps, isHovered } = useHover({});

  return (
    <ListItemBase
      size={50}
      shape="isPilled"
      className={classnames(className, STYLE.wrapper)}
      id={id}
      {...hoverProps}
      style={style}
    >
      <ListItemBaseSection position="start">
        <Avatar size={32} {...avatarProps} />
      </ListItemBaseSection>
      <ListItemBaseSection position="middle" className={STYLE.textWrapper}>
        {renderSchedulerIcon()}
        <div>{renderText()}</div>
      </ListItemBaseSection>
      <ListItemBaseSection position="end" className={STYLE.actionsWrapper}>
        {isHovered && displayHoverAction && (
          <ButtonCircle color="cancel" size={28} onPress={onHoverActionCallback}>
            <Icon name="cancel" weight="bold" scale={16} />
          </ButtonCircle>
        )}
        {displayMoreAction && (
          <ButtonCircle ghost size={28}>
            <Icon name="more" weight="bold" scale={16} />
          </ButtonCircle>
        )}
        {displayMuteAction && (
          <ButtonCircle onPress={onPressMuteAction} ghost size={28}>
            <Icon
              name={isMuted ? 'microphone-muted' : 'audio-microphone-on-green-colored'}
              weight="bold"
              scale={16}
              fillColor={isMuted && 'var(--label-error-text)'}
              strokeColor="none"
            />
          </ButtonCircle>
        )}
      </ListItemBaseSection>
    </ListItemBase>
  );
};

export default AvatarMeetingsListItem;
