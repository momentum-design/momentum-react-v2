import React, { RefObject, forwardRef } from 'react';
import classnames from 'classnames';
import ButtonCircle, { ButtonCircleSize } from '../ButtonCircle';
import type { Button } from '@momentum-design/components';

import { DEFAULTS, STYLE } from './ReactionButton.constants';
import { Props } from './ReactionButton.types';
import './ReactionButton.style.scss';

/**
 * Button within the ReactionPicker
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
const ReactionButton = forwardRef((props: Props, ref: RefObject<Button>) => {
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
      variant="tertiary"
      stopPropagation={false}
      {...otherProps}
    >
      {children}
    </ButtonCircle>
  );
});

ReactionButton.displayName = 'ReactionButton';

export default ReactionButton;
