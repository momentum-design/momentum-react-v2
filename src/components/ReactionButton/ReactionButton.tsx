import classnames from 'classnames';
import React, { FC } from 'react';

import ButtonCircle, { ButtonCircleSize } from 'components/ButtonCircle';

import { DEFAULTS, STYLE } from './ReactionButton.constants';
import { Props } from './ReactionButton.types';
import './ReactionButton.style.scss';

/**
 * Button within the ReactionPicker
 */
const ReactionButton: FC<Props> = (props: Props) => {
  const { className, children, id, reacted, style, ...otherProps } = props;
  delete otherProps.size;
  return (
    <ButtonCircle
      className={classnames(className, STYLE.wrapper)}
      data-reacted={reacted || DEFAULTS.REACTED}
      id={id}
      size={DEFAULTS.SIZE as ButtonCircleSize}
      style={style}
      {...otherProps}
    >
      {children}
    </ButtonCircle>
  );
};

ReactionButton.displayName = 'ReactionButton';

export default ReactionButton;
