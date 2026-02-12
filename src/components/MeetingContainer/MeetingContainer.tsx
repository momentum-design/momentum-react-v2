import React, { FC, cloneElement } from 'react';
import classnames from 'classnames';
import Card, { CARD_CONSTANTS } from '../Card';
import { STYLE, DEFAULTS } from './MeetingContainer.constants';
import { Props } from './MeetingContainer.types';
import './MeetingContainer.style.scss';
import Text, { TEXT_CONSTANTS } from '../Text';
import DividerDot from '../DividerDot';
import ButtonGroup from '../ButtonGroup';

/**
 * The MeetingContainer component.
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
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
    classification,
    scheduleInfoFirst,
    scheduleInfoSecond,
    scheduleInfoFirstColor = DEFAULTS.SCHEDULE_INFO_COLOR,
    scheduleInfoSecondColor = DEFAULTS.SCHEDULE_INFO_COLOR,
    isDisabled,
    statusColor,
    titleType = DEFAULTS.TITLE_TYPE,
    titleTagName = DEFAULTS.TITLE_TAG_NAME,
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
    !!tags && isDisabled ? tags.map((tags) => cloneElement(tags, { disabled: true })) : tags;

  const changedSpaceLink =
    !!spaceLink && cloneElement(spaceLink, { disabled: isDisabled, className: STYLE.spaceLink });

  const classificationTag =
    !!classification && cloneElement(classification, { disabled: isDisabled });

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
            <Text tagName={titleTagName} type={titleType} data-disabled={isDisabled}>
              {title}
            </Text>
            {changedSpaceLink && <DividerDot />}
            {changedSpaceLink}
            <div className={STYLE.classification}>{classificationTag}</div>
          </div>
          <div>
            <Text
              type={TEXT_CONSTANTS.TYPES.BODY_SECONDARY}
              tagName="small"
              data-color={isDisabled ? DEFAULTS.SCHEDULE_INFO_COLOR : scheduleInfoFirstColor}
            >
              {scheduleInfoFirst}
            </Text>
            {scheduleInfoSecond && <DividerDot />}
            <Text
              type={TEXT_CONSTANTS.TYPES.BODY_SECONDARY}
              tagName="small"
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
