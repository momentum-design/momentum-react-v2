import React, { FC } from 'react';
import classnames from 'classnames';

import MeetingCardContainerStatus from './MeetingCardContainerStatus';

import { DEFAULTS, STYLE } from './MeetingCardContainer.constants';
import { Props } from './MeetingCardContainer.types';
import './MeetingCardContainer.style.scss';

/**
 * The MeetingCardContainer component.
 */
const MeetingCardContainer: FC<Props> = (props: Props) => {
  const {
    children,
    className,
    color = DEFAULTS.COLOR,
    height = DEFAULTS.HEIGHT,
    id,
    outline,
    rounding = DEFAULTS.ROUNDING,
    statusColor,
    statusStriped,
    style,
    ...otherProps
  } = props;

  return (
    <div
      className={classnames(className, STYLE.wrapper)}
      data-color={color}
      data-height={height}
      data-outline={outline}
      data-rounding={rounding}
      id={id}
      style={style}
      {...otherProps}
    >
      <MeetingCardContainerStatus color={statusColor} striped={statusStriped} />
      {children}
    </div>
  );
};

export default MeetingCardContainer;
