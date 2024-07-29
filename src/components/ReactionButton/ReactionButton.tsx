import React, { FC, RefObject, forwardRef } from 'react';
import classnames from 'classnames';
import ButtonCircle, { ButtonCircleSize } from '../ButtonCircle';

import { DEFAULTS, STYLE } from './ReactionButton.constants';
import { Props } from './ReactionButton.types';
import './ReactionButton.style.scss';

/**
 * Button within the ReactionPicker
 */
const ReactionButton = forwardRef((props: Props, ref: RefObject<HTMLButtonElement>) => {
  const { className, children, id, reacted, style, ...otherProps } = props;
  delete otherProps.size;
  return (
    <ButtonCircle
      ref={ref}
      className={classnames(className, STYLE.wrapper)}
      data-reacted={reacted || DEFAULTS.REACTED}
      id={id}
      size={DEFAULTS.SIZE as ButtonCircleSize}
      style={style}
      ghost
      {...otherProps}
    >
      {children}
    </ButtonCircle>
  );
});

ReactionButton.displayName = 'ReactionButton';

export default ReactionButton;
