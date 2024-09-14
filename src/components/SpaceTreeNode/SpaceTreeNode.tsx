import React, { FC, forwardRef, RefObject, useRef } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './SpaceTreeNode.constants';
import { Props } from './SpaceTreeNode.types';
import './SpaceTreeNode.style.scss';
import SpaceRowContent from '../SpaceRowContent';
import TreeNodeBase from '../TreeNodeBase';

/**
 * The SpaceTreeNode component.
 */
const SpaceTreeNode: FC<Props> = forwardRef(
  (props: Props, providedRef: RefObject<HTMLDivElement>) => {
    const {
      className,
      isDraft,
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
      rightIconTooltip,
      isDisabled = DEFAULTS.DISABLED,
      ...rest
    } = props;

    const internalRef = useRef<HTMLDivElement>();
    const ref = providedRef || internalRef;

    return (
      <TreeNodeBase
        className={classnames(className, STYLE.wrapper)}
        /* @ts-expect-error ref types not matching */
        ref={ref}
        size={isCompact ? 32 : 50}
        shape="isPilled"
        {...rest}
      >
        {() => (
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
        )}
      </TreeNodeBase>
    );
  }
);

SpaceTreeNode.displayName = 'SpaceTreeNode';

export default SpaceTreeNode;
