import React, { FC } from 'react';
import classnames from 'classnames';

import { STYLE } from './MeetingListItem.constants';
import { Props } from './MeetingListItem.types';
import './MeetingListItem.style.scss';
import ListItemBase from '../ListItemBase';
import ListItemBaseSection from '../ListItemBaseSection';

const MeetingListItem: FC<Props> = (props: Props) => {
  const { children, className, color, isDisabled, buttonGroup, image, ...rest } = props;

  return (
    <ListItemBase
      className={`${classnames(className, STYLE.wrapper)}`}
      data-color={color}
      isDisabled={isDisabled}
      size={50}
      {...rest}
    >
      <ListItemBaseSection className="md-meeting-list-item-start-section" position="start">
        <div className="md-meeting-list-item-border" data-color={color} />
        {image}
      </ListItemBaseSection>

      <ListItemBaseSection position="middle">{children}</ListItemBaseSection>

      {buttonGroup && <ListItemBaseSection position="end">{buttonGroup}</ListItemBaseSection>}
    </ListItemBase>
  );
};

export default MeetingListItem;
