import React, { FC } from 'react';
import classnames from 'classnames';

import ModalContainer from '../ModalContainer';
import Text, { TEXT_CONSTANTS } from '../Text';

import { STYLE } from './Banner.constants';
import { Props } from './Banner.types';
import './Banner.style.scss';

/**
 * The Banner component.
 */
const Banner: FC<Props> = (props: Props) => {
  const {
    actions,
    className,
    description,
    details,
    id,
    image,
    isAlert,
    shape,
    title,
    style,
    ...otherProps
  } = props;

  const mutatedOtherProps = { ...otherProps };

  delete mutatedOtherProps.children;
  delete mutatedOtherProps.isPadded;
  delete mutatedOtherProps.round;

  return (
    <ModalContainer
      className={classnames(className, STYLE.wrapper)}
      data-alert={isAlert}
      id={id}
      round={75}
      data-shape={shape}
      style={style}
      aria-label={title}
      {...mutatedOtherProps}
    >
      {image}
      <Text className={STYLE.title} type={TEXT_CONSTANTS.TYPES.BANNER_PRIMARY} tagName="h2">
        {title}
      </Text>
      <Text className={STYLE.description} type={TEXT_CONSTANTS.TYPES.SUBHEADER_SECONDARY}>
        {description}
      </Text>
      <Text className={STYLE.details} type={TEXT_CONSTANTS.TYPES.SUBHEADER_SECONDARY}>
        {details}
      </Text>
      {actions}
    </ModalContainer>
  );
};

export default Banner;
