import React, { FC, useCallback, useState } from 'react';
import classnames from 'classnames';
import { v4 as uuidV4 } from 'uuid';

import { DEFAULTS, STYLE } from './SpaceRowContent.constants';
import { Props } from './SpaceRowContent.types';
import './SpaceRowContent.style.scss';
import ListItemBaseSection from '../ListItemBaseSection';
import Text from '../Text';
import Icon from '../Icon';
import DividerDot from '../DividerDot';
import SecondLineElement from './SecondLineElement';
import { cleanSecondLine } from './SpaceRowContent.utils';
import ButtonCircle from '../ButtonCircle';
import {
  MenuPopover as MdcMenuPopover,
  MenuItem as MdcMenuItem,
} from '@momentum-design/components/dist/react';

//TODO: support 2-line labels for right/position-end section.
/**
 * The SpaceRowContent component.
 */
const SpaceRowContent: FC<Props> = (props: Props) => {
  const {
    isNewActivity,
    isDraft,
    avatar,
    firstLine,
    secondLine,
    isUnread,
    teamColor = DEFAULTS.TEAM_COLOR,
    isMention,
    isEnterRoom,
    isAlert,
    isAlertMuted,
    isError,
    action,
    isSelected,
    isCompact = false,
    rightIconTooltip,
    isDisabled = DEFAULTS.DISABLED,
    menuItems,
    onSelectMenuItem,
    menuTriggerLabel,
  } = props;
  const [menuId] = useState(uuidV4);

  const renderText = () => {
    const secondLineArrayClean = cleanSecondLine(secondLine);

    // All --mds-color-theme-text-team* tokens have a dash before the color --mds-color-theme-text-team-cobalt-* --mds-color-theme-text-team-cyan-* etc
    // except for --mds-color-theme-teamdefault-*
    const teamColorForToken = teamColor === DEFAULTS.TEAM_COLOR ? teamColor : `-${teamColor}`;
    const secondLineColor = isDisabled
      ? 'var(--mds-color-theme-text-primary-disabled)'
      : `var(--mds-color-theme-text-team${teamColorForToken}-normal)`;

    if (secondLineArrayClean.length) {
      return (
        <>
          <Text
            type="body-primary"
            tagName="div"
            data-test="list-item-first-line"
            data-disabled={isDisabled}
          >
            {firstLine}
          </Text>
          {isCompact && <DividerDot data-test="compact-mode-divider-dot" />}
          <Text
            style={{ color: secondLineColor }}
            type="body-secondary"
            tagName="small"
            data-test="list-item-second-line"
            aria-label={secondLineArrayClean.join(', ')}
          >
            {secondLineArrayClean.map((secondLineContent, i) => (
              <SecondLineElement key={`second-line-item-${i}`} showDividerDot={i > 0}>
                {secondLineContent}
              </SecondLineElement>
            ))}
          </Text>
        </>
      );
    } else {
      return (
        <Text
          data-test="list-item-first-line"
          tagName="div"
          type="body-primary"
          data-disabled={isDisabled}
        >
          {firstLine}
        </Text>
      );
    }
  };

  const renderRightSection = () => {
    const iconProps = {
      weight: 'bold' as const,
      scale: 14 as const,
      strokeColor: 'none',
      title: rightIconTooltip,
    };
    if (isMention) {
      return (
        <Icon
          fillColor={
            isDisabled
              ? 'var(--mds-color-theme-text-primary-disabled)'
              : 'var(--mds-color-theme-control-active-normal)'
          }
          name="mention"
          {...iconProps}
        />
      );
    } else if (isEnterRoom) {
      return (
        <Icon
          fillColor={
            isDisabled
              ? 'var(--mds-color-theme-text-primary-disabled)'
              : 'var(--mds-color-theme-control-active-normal)'
          }
          name="enter-room"
          {...iconProps}
        />
      );
    } else if (isAlertMuted) {
      return (
        <Icon
          fillColor={
            isDisabled
              ? 'var(--mds-color-theme-text-primary-disabled)'
              : 'var(--mds-color-theme-text-primary-normal)'
          }
          name="alert-muted"
          {...iconProps}
        />
      );
    } else if (isAlert) {
      return (
        <Icon
          fillColor={
            isDisabled
              ? 'var(--mds-color-theme-text-primary-disabled)'
              : 'var(--mds-color-theme-text-primary-normal)'
          }
          name="alert"
          {...iconProps}
        />
      );
    } else if (!isSelected && isDraft) {
      return (
        <Icon
          fillColor={
            isDisabled
              ? 'var(--mds-color-theme-text-primary-disabled)'
              : 'var(--mds-color-theme-text-primary-normal)'
          }
          name="draft-indicator"
          {...iconProps}
        />
      );
    } else if (isError) {
      return (
        <Icon
          fillColor={
            isDisabled
              ? 'var(--mds-color-theme-text-primary-disabled)'
              : 'var(--mds-color-theme-text-error-normal)'
          }
          name="priority-circle"
          {...iconProps}
          weight="filled"
        />
      );
    } else if (isUnread) {
      return (
        <Icon
          name="unread"
          fillColor={
            isDisabled
              ? 'var(--mds-color-theme-text-primary-disabled)'
              : 'var(--mds-color-theme-control-active-normal)'
          }
          {...iconProps}
        />
      );
    } else if (action) {
      return <>{action}</>;
    } else return null;
  };

  const onMenuAction = useCallback(
    ({ target }) => {
      onSelectMenuItem?.(target.name);
    },
    [onSelectMenuItem]
  );

  return (
    <>
      <ListItemBaseSection position="start">{avatar}</ListItemBaseSection>
      <ListItemBaseSection
        position="middle"
        className={classnames(STYLE.textWrapper, isCompact ? 'text-row' : 'text-column', {
          [STYLE.isNewActivity]: isNewActivity || isMention || isEnterRoom || isUnread,
        })}
      >
        {renderText()}
      </ListItemBaseSection>
      <ListItemBaseSection position="end">{renderRightSection()}</ListItemBaseSection>
      {menuItems?.length ? (
        <ListItemBaseSection position="end" className={STYLE.menuTriggerWrapper}>
          <ButtonCircle
            id={menuId}
            variant="tertiary"
            size={isCompact ? 20 : 28}
            aria-label={menuTriggerLabel}
            data-testid="menu-trigger-button"
            prefixIcon="more-bold"
          />
          <MdcMenuPopover
            onAction={onMenuAction}
            showArrow
            triggerID={menuId}
            placement="bottom-end"
          >
            {menuItems.map(({ key, text }) => (
              <MdcMenuItem key={key} name={key} label={text} />
            ))}
          </MdcMenuPopover>
        </ListItemBaseSection>
      ) : null}
    </>
  );
};
SpaceRowContent.displayName = 'SpaceRowContent';

export default SpaceRowContent;
