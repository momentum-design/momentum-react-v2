import React, { FC } from 'react';
import classnames from 'classnames';
import { FocusRing as AriaFocusRing } from '@react-aria/focus';

import { STYLE } from './FocusRing.constants';
import { Props } from './FocusRing.types';
import './FocusRing.style.scss';

/**
 * The wrapped `<FocusRing />` from `@react-aria/focus`.
 *
 * @remarks
 * This does not support typical style inheritance via `className`, `id`, and `style`. See [react-aria/focus]{@link https://react-spectrum.adobe.com/react-aria/FocusRing.html}
 */
const FocusRing: FC<Props> = (props: Props) => {
  const mutatedProps = { ...props };
  const focusClass = mutatedProps;
  const focusRingClass = mutatedProps;

  delete mutatedProps.focusClass;
  delete mutatedProps.focusRingClass;

  return (
    <AriaFocusRing
      focusClass={
        props.disabled ? classnames(STYLE.disabled) : classnames(STYLE.wrapper, focusClass)
      }
      focusRingClass={
        props.disabled ? classnames(STYLE.disabled) : classnames(STYLE.wrapper, focusRingClass)
      }
      {...mutatedProps}
    />
  );
};

export default FocusRing;
