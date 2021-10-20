import React, { FC } from 'react';
import classnames from 'classnames';
import ButtonCircle, { ButtonCircleSize } from '../ButtonCircle';

import { DEFAULTS, STYLE } from './AddReactionButton.constants';
import { Props } from './AddReactionButton.types';
import './AddReactionButton.style.scss';
import Icon, { IconScale } from '../Icon';

const AddReactionButton: FC<Props> = (props: Props) => {
  const { className, id, style, ...otherProps } = props;
  delete otherProps.size;
  return (
    <ButtonCircle
      className={classnames(className, STYLE.wrapper)}
      id={id}
      size={DEFAULTS.SIZE as ButtonCircleSize}
      style={style}
      {...otherProps}
    >
      <Icon name="reactions" scale={DEFAULTS.ICON_SIZE as IconScale} />
    </ButtonCircle>
  );
};

export default AddReactionButton;
