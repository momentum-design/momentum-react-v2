import React, { FC } from 'react';
import classnames from 'classnames';
import ButtonCircle from '../ButtonCircle';
import { PrimitiveConverter } from '../../utils';

import { DEFAULTS, STYLE } from './ReactionButton.constants';
import { Props } from './ReactionButton.types';
import './ReactionButton.style.scss';

/**
 * Button within the ReactionPicker
 */
const ReactionButton: FC<Props> = (props: Props) => {
  const { children, className, id, reacted, style, ...otherProps } = props;

  return (
    <ButtonCircle
      className={classnames(className, STYLE.wrapper)}
      data-reacted={reacted || DEFAULTS.REACTED}
      id={id}
      size={32}
      style={style}
      {...otherProps}
    >
      <PrimitiveConverter>{children}</PrimitiveConverter>
    </ButtonCircle>
  );
};

export default ReactionButton;
