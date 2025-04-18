import React, { forwardRef, RefObject } from 'react';
import { Button as MdcButton } from '@momentum-design/components/dist/react';

import { STYLE } from './ButtonDialpad.constants';
import './ButtonDialpad.style.scss';
import classnames from 'classnames';

import type { Button } from '@momentum-design/components';
import type { Props } from './ButtonDialpad.types';

const ButtonDialpad = forwardRef((props: Props, providedRef: RefObject<Button>) => {
  const { className, ...otherProps } = props;

  return (
    <MdcButton
      className={classnames(STYLE.wrapper, className)}
      ref={providedRef}
      // size 40 is maximum size for MdcButton, setting it here and overriding
      // size in scss file to 64px
      size={40}
      variant="tertiary"
      {...otherProps}
    >
      <div className={STYLE.innerWrapper}>
        <div className={STYLE.primaryText}>{props.primaryText}</div>
        <div className={STYLE.secondaryText}>{props.secondaryText}</div>
      </div>
    </MdcButton>
  );
});

ButtonDialpad.displayName = 'ButtonDialpad';

export default ButtonDialpad;
