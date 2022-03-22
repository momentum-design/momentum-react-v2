import classnames from 'classnames';
import React, { FC, cloneElement } from 'react';

import ButtonGroup from 'components/ButtonGroup';
import Card, { CARD_CONSTANTS } from 'components/Card';
import DividerDot from 'components/DividerDot';
import Text, { TEXT_CONSTANTS } from 'components/Text';

import { STYLE, DEFAULTS } from './MeetingContainer.constants';
import { Props } from './MeetingContainer.types';

import './MeetingContainer.style.scss';

/**
 * The MeetingContainer component.
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
    titleType = DEFAULTS.TITLE_TYPE,
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
    !!spaceLink && cloneElement(spaceLink, { disabled: isDisabled, className: STYLE.spaceLink });

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
            <Text type={titleType} data-disabled={isDisabled}>
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
