import React, { FC, forwardRef, RefObject, useRef } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './SpaceListItem.constants';
import { Props } from './SpaceListItem.types';
import './SpaceListItem.style.scss';
import ListItemBase from '../ListItemBase';
import SpaceRowContent from '../SpaceRowContent';

/**
 * The SpaceListItem component.
 */
const SpaceListItem: FC<Props> = forwardRef(
  (props: Props, providedRef: RefObject<HTMLLIElement>) => {
    const {
      className,
      isDraft,
      id,
      style,
      avatar,
      firstLine,
      secondLine,
      isNewActivity,
      isUnread,
      teamColor,
      isMention,
      isEnterRoom,
      isAlert,
      isAlertMuted,
      isError,
      action,
      isSelected,
      isCompact = false,
      itemIndex,
      rightIconTooltip,
      isDisabled = DEFAULTS.DISABLED,
      ...rest
    } = props;

    const internalRef = useRef();
    const ref = providedRef || internalRef;

    return (
      <ListItemBase
        ref={ref}
        size={isCompact ? 32 : 50}
        shape="isPilled"
        className={classnames(className, STYLE.wrapper)}
        id={id}
        style={style}
        {...rest}
        isDisabled={isDisabled}
        isSelected={isSelected}
        itemIndex={itemIndex}
      >
        <SpaceRowContent
          {...{
            isNewActivity,
            isDraft,
            avatar,
            firstLine,
            secondLine,
            isUnread,
            teamColor,
            isMention,
            isEnterRoom,
            isAlertMuted,
            isAlert,
            isError,
            action,
            isSelected,
            isCompact,
            rightIconTooltip,
            isDisabled,
          }}
        />
      </ListItemBase>
    );
  }
);

SpaceListItem.displayName = 'SpaceListItem';

export default SpaceListItem;
