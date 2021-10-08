import React, { FC, forwardRef, RefObject } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './SpaceListItem.constants';
import { Props } from './SpaceListItem.types';
import './SpaceListItem.style.scss';
import ListItemBase from '../ListItemBase';
import ListItemBaseSection from '../ListItemBaseSection';
import Text from '../Text';
import Icon from '../Icon';

//TODO: support 2-line labels for right section.
/**
 * The SpaceListItem component.
 */
const SpaceListItem: FC<Props> = forwardRef((props: Props, ref: RefObject<HTMLLIElement>) => {
  const {
    className,
    id,
    style,
    avatar,
    firstLine,
    secondLine,
    isNewActivity,
    teamColor = DEFAULTS.TEAM_COLOR,
    isMention,
    isEnterRoom,
    isAlertMuted,
    isError,
    action,
    isSelected,
    isCompact = false,
    ...rest
  } = props;

  const renderText = () => {
    const _secondLineArray: string[] = typeof secondLine === 'string' ? [secondLine] : secondLine;

    if (secondLine && !isCompact) {
      return (
        <>
          <Text type="body-primary">{firstLine}</Text>
          <Text
            style={{ color: `var(--theme-text-team-${teamColor}-normal)` }}
            type="body-secondary"
          >
            {/* //TODO: change with dot divider when available */}
            {_secondLineArray.join(' - ')}
          </Text>
        </>
      );
    } else {
      return <Text type="body-primary">{firstLine}</Text>;
    }
  };

  const renderRightSection = () => {
    const iconProps = {
      weight: 'bold' as const,
      scale: 14 as const,
      strokeColor: 'none',
    };
    if (isMention) {
      return <Icon fillColor={'var(--listitem-tick)'} name="mention" {...iconProps} />;
    } else if (isEnterRoom) {
      return <Icon fillColor={'var(--listitem-tick)'} name="enter-room" {...iconProps} />;
    } else if (isAlertMuted) {
      return <Icon fillColor={'var(--listitem-icon)'} name="alert-muted" {...iconProps} />;
    } else if (isError) {
      return (
        <Icon
          fillColor={'var(--label-error-text)'}
          name="priority-circle"
          {...iconProps}
          weight="filled"
        />
      );
    } else if (isNewActivity) {
      return <Icon name="unread" fillColor={'var(--listitem-tick)'} {...iconProps} />;
    } else if (action) {
      return <>{action}</>;
    }
  };

  return (
    <ListItemBase
      ref={ref}
      size={isCompact ? 32 : 50}
      shape="isPilled"
      className={classnames(className, {
        [STYLE.isNewActivity]: isNewActivity || isMention || isEnterRoom,
      })}
      id={id}
      style={style}
      {...rest}
      isSelected={isSelected}
    >
      <ListItemBaseSection position="start">{avatar}</ListItemBaseSection>
      <ListItemBaseSection position="middle" className={STYLE.textWrapper}>
        <div>{renderText()}</div>
      </ListItemBaseSection>
      <ListItemBaseSection position="end">{renderRightSection()}</ListItemBaseSection>
    </ListItemBase>
  );
});

SpaceListItem.displayName = 'SpaceListItem';

export default SpaceListItem;
