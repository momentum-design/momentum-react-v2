import classnames from 'classnames';
import React, { FC } from 'react';

import ButtonCircle, { ButtonCircleSize } from 'components/ButtonCircle';
import Icon, { IconScale } from 'components/Icon';

import { DEFAULTS, STYLE } from './AddReactionButton.constants';
import { Props } from './AddReactionButton.types';

import './AddReactionButton.style.scss';

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
