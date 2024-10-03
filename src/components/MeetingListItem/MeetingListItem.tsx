import React, { FC, forwardRef, useRef, RefObject } from 'react';
import classnames from 'classnames';

import { STYLE, DEFAULTS } from './MeetingListItem.constants';
import { Props } from './MeetingListItem.types';
import './MeetingListItem.style.scss';
import ListItemBase from '../ListItemBase';
import MeetingRowContent from '../MeetingRowContent';

const MeetingListItem: FC<Props> = forwardRef(
  (props: Props, providedRef: RefObject<HTMLLIElement>) => {
    const {
      children,
      className,
      color = DEFAULTS.color,
      isDisabled,
      buttonGroup,
      image,
      large,
      itemIndex,
      ...rest
    } = props;

    const internalRef = useRef();
    const ref = providedRef || internalRef;

    return (
      <ListItemBase
        isPadded
        ref={ref}
        className={`${classnames(className, STYLE.wrapper)}`}
        data-color={color}
        isDisabled={isDisabled}
        itemIndex={itemIndex}
        size={large ? 70 : 50}
        {...rest}
      >
        <MeetingRowContent
          color={color}
          isDisabled={isDisabled}
          buttonGroup={buttonGroup}
          image={image}
        >
          {children}
        </MeetingRowContent>
      </ListItemBase>
    );
  }
);

MeetingListItem.displayName = 'MeetingListItem';

export default MeetingListItem;
