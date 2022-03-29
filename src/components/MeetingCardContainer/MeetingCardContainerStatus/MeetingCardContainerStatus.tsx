import React, { FC } from 'react';
import classnames from 'classnames';

import { STYLE } from './MeetingCardContainerStatus.constants';
import { Props } from './MeetingCardContainerStatus.types';
import './MeetingCardContainerStatus.style.scss';

/**
 * The MeetingCardContainer component.
 */
const MeetingCardContainer: FC<Props> = (props: Props) => {
  const { className, color, id, striped, style, ...otherProps } = props;

  return (
    <div
      className={classnames(className, STYLE.wrapper)}
      data-color={color}
      data-striped={striped}
      id={id}
      style={style}
      {...otherProps}
    />
  );
};

export default MeetingCardContainer;
