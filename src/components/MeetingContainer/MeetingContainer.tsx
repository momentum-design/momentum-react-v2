import React, { FC, cloneElement } from 'react';
import classnames from 'classnames';
import Card, { CARD_CONSTANTS } from '../Card';
import { STYLE, DEFAULTS } from './MeetingContainer.constants';
import { Props } from './MeetingContainer.types';
import './MeetingContainer.style.scss';
import Text, { TEXT_CONSTANTS } from '../Text';
import DividerDot from '../DividerDot';
import ButtonGroup from '../ButtonGroup';
import { action } from '@storybook/addon-actions';

/**
 * The MeetingContainer component.
 *
 * Will render avatar/tags/action buttons if provided.
 *
 * Depends on consumer for schedule info strings/statusColor
 *
 */
const MeetingContainer: FC<Props> = (props: Props) => {
  const {
    className,
    id,
    tags,
    actionButtons,
    meetingTitle,
    avatar,
    children,
    spaceLink,
    scheduleInfoFirst,
    scheduleInfoSecond,
    scheduleInfoFirstColor = DEFAULTS.SCHEDULE_INFO_COLOR,
    scheduleInfoSecondColor = DEFAULTS.SCHEDULE_INFO_COLOR,
    isDisabled,
    statusColor,
    ...otherProps
  } = props;
  const title = meetingTitle || children;
  const changedAvatar = !!avatar && cloneElement(avatar, { size: 32 });
  const showTags = tags?.length > 0;

  const changedActionButtons =
    !!actionButtons && isDisabled
      ? actionButtons.map((actionButton) => cloneElement(actionButton, { disabled: true }))
      : actionButtons;

  const changedTags =
    !!tags && isDisabled
      ? tags.map((tags) => cloneElement(tags, { isDisabled: true, format: 'static' }))
      : tags;

  const changedSpaceLink =
    !!spaceLink && isDisabled ? cloneElement(spaceLink, { disabled: true }) : spaceLink;

  return (
    <Card
      className={classnames(className, STYLE.wrapper)}
      id={id}
      statusColor={statusColor}
      height={CARD_CONSTANTS.HEIGHTS.AUTO}
      isDisabled={isDisabled}
      {...otherProps}
    >
      <div className={STYLE.container}>
        {changedAvatar && (
          <div data-anchor={showTags ? DEFAULTS.ANCHOR : undefined} className={STYLE.avatar}>
            {changedAvatar}
          </div>
        )}
        <div className={STYLE.details}>
          <div>
            <Text type={TEXT_CONSTANTS.TYPES.HEADER_PRIMARY} data-disabled={isDisabled}>
              {title}
            </Text>
            {changedSpaceLink && <DividerDot />}
            {changedSpaceLink}
          </div>
          <div>
            <Text
              type={TEXT_CONSTANTS.TYPES.BODY_SECONDARY}
              data-color={isDisabled ? DEFAULTS.SCHEDULE_INFO_COLOR : scheduleInfoFirstColor}
            >
              {scheduleInfoFirst}
            </Text>
            {scheduleInfoSecond && <DividerDot />}
            <Text
              type={TEXT_CONSTANTS.TYPES.BODY_SECONDARY}
              data-color={isDisabled ? DEFAULTS.SCHEDULE_INFO_COLOR : scheduleInfoSecondColor}
            >
              {scheduleInfoSecond}
            </Text>
          </div>
          {showTags && <div className={STYLE.tags}>{changedTags}</div>}
        </div>

        <div data-anchor={showTags ? DEFAULTS.ANCHOR : undefined} className={STYLE.actions}>
          <ButtonGroup spaced>{changedActionButtons}</ButtonGroup>
        </div>
      </div>
    </Card>
  );
};

export default MeetingContainer;
