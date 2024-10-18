import React, { FC } from 'react';
import classnames from 'classnames';

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
import { Item } from '@react-stately/collections';
import MenuTrigger from '../MenuTrigger';
import Menu from '../Menu';

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
          <Text type="body-primary" tagName="div" data-test="list-item-first-line" data-disabled={isDisabled}>
            {firstLine}
          </Text>
          {isCompact && <DividerDot data-test="compact-mode-divider-dot" />}
          <Text
            style={{ color: secondLineColor }}
            type="body-secondary"
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
        <Text data-test="list-item-first-line" tagName="div" type="body-primary" data-disabled={isDisabled}>
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
          {
            <MenuTrigger
              triggerComponent={
                <ButtonCircle
                  ghost
                  size={isCompact ? 20 : 28}
                  aria-label={menuTriggerLabel}
                  data-testid="menu-trigger-button"
                >
                  <Icon name="more" weight="bold" scale={isCompact ? 16 : 24} />
                </ButtonCircle>
              }
            >
              <Menu selectionMode="single" onAction={onSelectMenuItem}>
                {menuItems.map(({ key, text }) => (
                  <Item key={key}>{text}</Item>
                ))}
              </Menu>
            </MenuTrigger>
          }
        </ListItemBaseSection>
      ) : null}
    </>
  );
};
SpaceRowContent.displayName = 'SpaceRowContent';

export default SpaceRowContent;
