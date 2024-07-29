import React, { ForwardedRef, forwardRef } from 'react';
import classnames from 'classnames';
import ButtonCircle, { ButtonCircleSize } from '../ButtonCircle';

import { DEFAULTS, STYLE } from './AddReactionButton.constants';
import { Props } from './AddReactionButton.types';
import './AddReactionButton.style.scss';
import Icon, { IconScale } from '../Icon';

const AddReactionButton = forwardRef((props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
  const { className, id, style, ...otherProps } = props;
  delete otherProps.size;
  return (
    <ButtonCircle
      ref={ref}
      className={classnames(className, STYLE.wrapper)}
      id={id}
      size={DEFAULTS.SIZE as ButtonCircleSize}
      style={style}
      {...otherProps}
    >
      <Icon name="reactions" scale={DEFAULTS.ICON_SIZE as IconScale} />
    </ButtonCircle>
  );
});

AddReactionButton.displayName = 'AddReactionButton';

export default AddReactionButton;
