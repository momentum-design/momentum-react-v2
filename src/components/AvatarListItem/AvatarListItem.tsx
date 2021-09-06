import React, { FC } from 'react';
import classnames from 'classnames';

import { STYLE } from './AvatarListItem.constants';
import { Props } from './AvatarListItem.types';
import './AvatarListItem.style.scss';
import ListItemBase from '../ListItemBase';
import ListItemBaseSection from '../ListItemBaseSection';
import Avatar from '../Avatar';
import Text from '../Text';
import Icon from '../Icon';
import ButtonCircle from '../ButtonCircle';
import { useHover } from '@react-aria/interactions';

/**
 * Avatar List Item component used in in-meeting experience participants lists.
 */
const AvatarListItem: FC<Props> = (props: Props) => {
  const {
    className,
    id,
    style,
    isSchedulerAvailable,
    isSchedulerUnavailable,
    isSchedulerUnknown,
    isSchedulerQHours,
    firstLine,
    secondLine,
    isMuted = true,
    displayMoreAction,
    displayMuteAction,
    //TODO: moreActionMenu, Once popover component is implemented, add way to customize the menu
    displayHoverAction,
    onHoverActionCallback,
    onPressMuteAction,
    avatarProps = { title: 'C' },
  } = props;

  const renderSchedulerIcon = () => {
    if (isSchedulerAvailable) {
      return (
        <Icon
          name="scheduler-available"
          scale={16}
          weight="bold"
          fillColor="var(--label-success-text)"
          strokeColor="none"
        />
      );
    } else if (isSchedulerUnavailable) {
      return (
        <Icon
          name="scheduler-unavailable"
          scale={16}
          weight="bold"
          fillColor="var(--label-warning-text)"
          strokeColor="none"
        />
      );
    } else if (isSchedulerUnknown) {
      return (
        <Icon
          name="scheduler-unknown"
          scale={16}
          weight="bold"
          fillColor="var(--label-error-text)"
          strokeColor="none"
        />
      );
    } else if (isSchedulerQHours) {
      return (
        <Icon
          name="scheduler-not-working-hours"
          scale={16}
          weight="bold"
          fillColor="var(--label-secondary-text)"
          strokeColor="none"
        />
      );
    } else {
      return;
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
      style={style}
      {...hoverProps}
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

export default AvatarListItem;
