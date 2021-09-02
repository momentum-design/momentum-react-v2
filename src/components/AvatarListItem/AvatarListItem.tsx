import React, { FC } from 'react';
import classnames from 'classnames';

import { STYLE } from './AvatarListItem.constants';
import { Props } from './AvatarListItem.types';
import './AvatarListItem.style.scss';
import ListItemBase from '../ListItemBase';
import ListItemBaseSection from '../ListItemBaseSection';
import Avatar from '../Avatar';
import Icon from '../Icon';
import ButtonCircle from '../ButtonCircle';
/**
 * Avatar List Item component used in in-meeting experience participants lists.
 */
const AvatarListItem: FC<Props> = (props: Props) => {
  const { className, id, style } = props;

  return (
    <ListItemBase
      size={50}
      shape="isPilled"
      className={classnames(className, STYLE.wrapper)}
      id={id}
      style={style}
    >
      <ListItemBaseSection position="start">
        <Avatar size={32} title={'Cisco'} />
      </ListItemBaseSection>
      <ListItemBaseSection position="middle" className={STYLE.textWrapper}>
        <p>Hello</p>
        <small>Subtitle</small>
      </ListItemBaseSection>
      <ListItemBaseSection position="end" className={STYLE.actionsWrapper}>
        <ButtonCircle ghost>
          <Icon name="more" weight="bold" scale={16} />
        </ButtonCircle>
        <ButtonCircle ghost>
          <Icon name="microphone-muted" weight="bold" scale={16} />
        </ButtonCircle>
      </ListItemBaseSection>
    </ListItemBase>
  );
};

export default AvatarListItem;
