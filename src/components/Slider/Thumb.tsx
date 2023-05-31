import React, { FC } from 'react';
import { mergeProps, VisuallyHidden } from 'react-aria';
import classnames from 'classnames';

import { STYLE } from './Slider.constants';
import FocusRing from '../FocusRing';
import type { ThumbProps } from './Slider.types';
import { useThumbSideEffects } from './Slider.hooks';

const Thumb: FC<ThumbProps> = (props: ThumbProps) => {
  const { thumbProps, inputProps, inputRef } = useThumbSideEffects(props);

  return (
    <FocusRing within>
      <div {...thumbProps} className={classnames(STYLE.thumb)}>
        <VisuallyHidden>
          <input ref={inputRef} {...mergeProps(inputProps)} aria-label={props.ariaLabel} />
        </VisuallyHidden>
      </div>
    </FocusRing>
  );
};

export default Thumb;
